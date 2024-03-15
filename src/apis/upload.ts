// 导入axios实例
import {request} from "@/request/request";
import {UploadFile} from "element-plus";
export function Upload(image: UploadFile){
    return request({
        url:'/upload',
        method:'post',
        data: image,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

