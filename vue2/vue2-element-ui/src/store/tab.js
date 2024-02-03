import Cookie from 'js-cookie'
//import router from '../router'
export default {
    state: {
        isCollapse:false,
        tabsList:[
            {
                path:'/',
                name:'home',
                lable:'首页',
                icon:'home'
            }
        ],
        currentMune:null,
        menu:[]
    },
    mutations: {
        collapseMune(state){
            state.isCollapse=!state.isCollapse
        },
        selectMune(state,val){
            if(val.name!=='home'){
                state.currentMune=val
                const result=state.tabsList.findIndex(item=>item.name===val.name)
                if(result===-1){
                    state.tabsList.push(val)
                }
            }else{
                state.currentMune=null
            }
        },
        closeTag(state,val){
            const result=state.tabsList.findIndex(item=>item.name===val.name)
            state.tabsList.splice(result,1)
        },
        setMenu(state,val){
            state.menu=val
            Cookie.set('menu',JSON.stringify(val))
        },
        clearMenu(state){
            state.menu=[]
            Cookie.remove('menu')
        },
        addMenu(state,router){
            if(!Cookie.get('menu')){
                return
            }
            //console.log(Cookie.get('menu'))
            const menu=JSON.parse(Cookie.get('menu'))
            state.menu=menu
            const menuArray=[]
            menu.forEach(item=>{
                if(item.children){
                    item.children=item.children.map(item=>{
                        item.component=()=>import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component=()=>import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            //路由的动态添加
            menuArray.forEach(item=>{
                router.addRoute('Main',item)
            })
        }
    }
}