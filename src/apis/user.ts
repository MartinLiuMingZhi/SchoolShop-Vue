// 导入axios实例
import {request} from "@/request/request";

// 定义接口的传参
interface UserLoginData{
    username:string,
    password:string,
}
// 获取用户信息
export function UserLogin(param:UserLoginData) {
   return request({
       url: '/user/login',
       method: 'post',
       data:param
   })
}

interface RegisterData{
    username:string,
    password:string,
    checkPassword:string,
    name:string,
    sex:string,
    email:string,
    phone:string,
}

export function UserRegister(param:RegisterData){
    return request({
        url:'/user/register',
        method:'post',
        data:param
    })
}