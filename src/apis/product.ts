// 导入axios实例
import {request} from '@/request/request'

// 定义接口的传参
interface ProductPage {
    page: number
    pageSize: number
}

// 获取用户信息
export function GetProductPage(param: ProductPage) {
    return request({
        url: '/product/page',
        method: 'get',
        data: param,
    })
}

export function GetTotal(){
    return request({
        url:'/product/count',
        method:'get',
    })
}
