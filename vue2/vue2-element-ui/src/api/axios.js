import axios from 'axios'
import config from '../config'

//判断是生产环境还是开发环境
const baseUrl = process.env.NODE_ENV ==='development'?config.baseUrl.dev:config.baseUrl.pro

class HttpRequest{
    constructor(baseUrl){
        this.baseUrl=baseUrl
    }
    getInsideConfig(){
        const config={
            baseUrl:this.baseUrl,
            header:{}
        }
        return config
    }
    interceptors(instance){
        //添加请求拦截器
        instance.interceptors.request.use(function(config){
            //在发送请求前做些什么
            return config
        },function(error){
            //对请求错误做些什么
            return Promise.reject(error)
        })
        //添加响应拦截器
        instance.interceptors.response.use(function(response){
            console.log(response,'response')
            //对响应数据做些什么
            return response
        },function(error){
            console.log(error,'error')
            //对请求错误做些什么
            return Promise.reject(error)
        })
    }
    request(options){
        const instance=axios.create()
        options={...this.getInsideConfig(),...options}
        this.interceptors(instance)
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)