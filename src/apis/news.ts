// 导入axios实例
import {request} from "@/request/request";

export function deleteBatch(param: string){
    return request({
        url:'/news/delete/batch',
        method:'delete',
        data:param
    })

}

export function deleteById(param:number){
    return request({
        url:'/news/delete/'+param,
        method:'delete',
        data:param
    })
}

interface form{
    id:number
    title:string,
    description:string,
    content:string
}

export function saveData(param:form){
    return request({
        url: param.id ?'/news/update' : '/news/add',
        method: param.id ?'put':'post',
        data:param
    })
}

interface Page{
    page:number
    pageSize:number
    title:string
}

export function selectByPage(param:Page){
    return request({
        url:'/news/selectByPage',
        method:'get',
        data:param
    })
}