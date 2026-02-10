import request from '@/utils/request'
export function getBannerAPI (){
  return request({
    url:'home/banner'
  })
}