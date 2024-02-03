import axios from './config'
//添加新闻信息
export function addNews(data){
    return axios({
        url: '/news',
        method: "post",
        data
    })
}
//获取新闻信息
export function getNews(params){
    return axios({
        url: '/news',
        method: "get",
        params
    })
}
//根据id获取新闻信息
export function getNewsId(newsId){
    return axios({
        url: `/news/${newsId}`,
        method: "get",
    })
}

//删除新闻信息
export function delNews(params){
    return axios({
        url: '/news',
        method: "delete",
        params
    })
}
//编辑新闻信息
export function editNews(data){
    return axios({
        url: '/news',
        method: "put",
        data
    })
}
