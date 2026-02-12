import { defineStore } from "pinia";
import { ref } from "vue";
import { login } from '@/api/login';
export const userStore = defineStore('user',()=>{
    const userInfo = ref({})
    async function getUserInfo(form){
        const res = await login(form)
        userInfo.value = res.result
    }
    return {
        userInfo,
        getUserInfo
    }
},
{
    persist: true
})