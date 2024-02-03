import axios from './config'

//用户登录
// 第一种写法
// export const login = data => axios.post("/login", data)

// 第二种写法
export function login(data){
    return axios({
        url: '/login',
        method: "post",
        data
    })
}

//获取首页数据
export function homeData(){
    return axios({
        url: '/homeData',
        method: "get",
    })
}
// 添加班级
export function addClass(data){
    return axios({
        url: '/classinfo',
        method: "post",
        data
    })
}
// 获取班级信息
export function getClassList(params){
    return axios({
        url: '/classinfo',
        method: "get",
        params
    })
}
//编辑班级信息
export function editClass(data){
    return axios({
        url: '/classinfo',
        method: "put",
        data
    })
}
//删除班级信息
export function delClass(data){
    return axios({
        url: '/classinfo',
        method: "delete",
        data
    })
}

//添加学员信息
export function addStudent(data){
    return axios({
        url: '/stuinfo',
        method: "post",
        data
    })
}
//获取学员信息
export function getstudent(params){
    return axios({
        url: '/stuinfo',
        method: "get",
        params
    })
}
//删除学生信息
export function delstudent(params){
    return axios({
        url: '/stuinfo',
        method: "delete",
        params
    })
}
//编辑学生信息
export function editstudent(data){
    return axios({
        url: '/stuinfo',
        method: "put",
        data
    })
}
