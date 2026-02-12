import reqquest from "@/utils/request";

export function login(data){
    return reqquest({
        url:'/login',
        method:'post',
        data
    })
}