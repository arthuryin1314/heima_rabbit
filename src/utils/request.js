import axios from 'axios'
import { ElMessage } from 'element-plus'
import { userStore } from '@/stores/user'
const useUserStore = userStore
// 创建axios实例
const request = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

const user = useUserStore()

// axios请求拦截器
request.interceptors.request.use(config => {
  // 1. 从pinia获取token数据
  // 2. 按照后端的要求拼接token数据
  const token = user.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
request.interceptors.response.use(res => res.data, // 响应失败：修复 400 状态码判断逻辑
  e => {
    // 1. 先判断是否有服务端响应（避免网络错误时报错）
    if (e.response) {
      const { status, data } = e.response;
      // 2. 判断 400 状态码
      if (status === 400) {
        // 优先取后端返回的错误信息，无则用默认提示
        const errMsg = data?.message || '请求参数错误，请检查输入';
        ElMessage.error(errMsg);
      }
    }
    // 3. 仍需抛出错误，让接口调用处能 catch 到
    return Promise.reject(e);
  })


export default request