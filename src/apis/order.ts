import {request} from "@/request/request";

interface page{
    start:number
    pageSize:number
}

export function getAll(){
    return request({
        url:'/getAll',
        method:'get'
    })
}

export function getByUser(){
    return request({
        url:'getByUser',
        method:'get'
    })
}

export function getPage(param:page){
    return request({
        url:'getByPage',
        method:'get'
    })
}

export function getPageByUser(param:page){
    return request({
        url:'getPageByUser',
        method:'get'
    })
}