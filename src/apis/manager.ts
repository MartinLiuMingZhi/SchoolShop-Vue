// 导入axios实例
import {request} from "@/request/request";

// 定义接口的传参
interface LoginData{
    username:string,
    password:string,
}
// 获取用户信息
export function Login(param:LoginData) {
   return request({
       url: '/manager/login',
       method: 'post',
       data:param
   })
}

interface RegisterData{
    username:string,
    password:string,
    checkPassword:string,
}

export function Register(param:RegisterData){
    return request({
        url:'/manager/register',
        method:'post',
        data:param
    })
}

interface Page {
    page: number
    pageSize: number
}
export function GetManagerPage(param:Page){
    return request({
        url:'/manager/page',
        method:'get',
        data:param
    })
}

export function Logout(){
    return request({
        url:'/manager/logout',
        method:'post'
    })
}
interface Manager{
    id:number
    username:string
    password:string
    state:number
    avatar:string
    role:string
}
export function Update(param:Manager){
    return request({
        url:'/manager/update',
        method:'put',
        data:param
    })
}

interface Password{
    password:string,
    newPassword:string,
    confirmPassword:string
}

export function UpdatePassword(param:Password){
    return request({
        url:'/manager/changePassword',
        method:'put',
        data:param
    })
}

interface resetPassword{
    username:string,
    phone:string
}

export function ResetPassword(param:resetPassword){
    return request({
        url:'manager/forgetPassword',
        method:'put',
        data:param
    })
}