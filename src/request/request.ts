import axios, {AxiosRequestConfig} from 'axios'

export function request(config:AxiosRequestConfig){

    //axios实例
    const instance = axios.create({
        baseURL:"http://47.120.37.156:8080",
        timeout:5000,
    })
    //47.120.37.156

    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        // config.headers['Content-Type'] = 'application/json;charset=utf-8';
        // 设置请求的 withCredentials 为 true
        config.withCredentials = true;
        // 在发送请求之前做些什么
        return config;
    }, function (error) {
        // 对请求错误做些什么
        console.error('request error:'+error)
        return Promise.reject(error);
    });

// 添加响应拦截器
    axios.interceptors.response.use(function (response) {
        // 检查响应头中是否有 Set-Cookie，并手动保存 Cookie
        const setCookie = response.headers['set-cookie'];
        if (setCookie) {
            setCookie.forEach(cookie => {
                document.cookie = cookie;
            });
        }
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response;
    }, function (error) {
        console.error('response error:', error);
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error);
    });
    //发送一个真正的请求
    return instance(config)
}

