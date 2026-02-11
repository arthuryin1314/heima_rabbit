import request from '@/utils/request'
export function getBannerAPI (params={
  distributionSite: '1'
}){
  return request({
    url:'home/banner',
    params
  })
}
export const findNewAPI = () => {
  return request({
    url:'/home/new'
  })
}
export const findHotAPI = () => {
  return request({
    url:'/home/hot'
  })
}
export const getGoodsAPI = () => {
  return request({
    url: '/home/goods'
  })
}
