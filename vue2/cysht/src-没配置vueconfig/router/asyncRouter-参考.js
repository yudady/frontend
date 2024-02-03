export default [
    {
        // 管理后台的主页面 首页
        path: '/',
        name: 'layout',
        meta:{
            title:'首页',
            icon:'el-icon-s-home',
            level:1,
            role:['admin','teacher']
        },
        component: () => import('../views/layout'),
        redirect:'/dashboard',
        children:[
          {
            path:'dashboard',
            component:()=> import('../views/dashboard')
          }
        ]
      },
      {
        // 学生管理
          path:'/studentadmin',
          name:'studentadmin',
          /* 路由组件依然是layout */
          meta:{
            title:'学生管理',
            icon:'el-icon-menu',
            role:['admin','teacher']
        },
          component:()=> import('../views/layout'),
          children:[
            {
              meta:{
                title:'班级管理',
                icon:'el-icon-menu',
            },
              path:'classadmin',
              component:()=> import("../views/studentAdmin/classAdmin.vue")
            },
            {
              meta:{
                title:'学员信息',
                icon:'el-icon-s-custom',
            },
              path:'stuinfo',
              name:'stuinfo',
              component:()=> import("../views/studentAdmin/stuinfo.vue")
            },
            {
              hidden:true,
              meta:{
                title:'编辑学员信息',
                icon:'el-icon-menu',
            },
              path:'editstudent',
              name:'editstudent',
              component:()=> import("../views/studentAdmin/editStudent.vue")
            },
          ]
      },
      {
          // 图表管理
          path:'/echarts',
          name:'echarts',
          meta:{
            title:'图表管理',
            icon:'el-icon-menu',
            role:['admin','teacher']
        },
          /* 路由组件依然是layout */
          component:()=> import('../views/layout'),
          children:[
            {
              meta:{
                title:'饼图',
                icon:'el-icon-picture-outline-round',
            },
              path:'bar',
              component:()=> import("../views/echarts/bar.vue")
            },
            {
              meta:{
                title:'柱状图',
                icon:'el-icon-s-data',
            },
              path:'pie',
              component:()=> import("../views/echarts/pie.vue")
            },
          ]
      },
      {
        // 车辆管理
        path:'/cart',
        name:'cart',
        meta:{
            title:'车辆管理',
            icon:'el-icon-menu',
            level:1,
            role:['admin','xz']
        },
        /* 路由组件依然是layout */
        component:()=> import('../views/layout'),
        children:[
          {
            path:'index',
              component:()=> import("../views/cartAdmin/index.vue")
          }
        ]
      },
      {
        // 公告管理
        path:'/notice',
        name:'notice',
        meta:{
            title:'公告管理',
            icon:'el-icon-s-opportunity',
            level:1,
            role:['admin','teacher']//超级管理员和行政
        },
        /* 路由组件依然是layout */
        component:()=> import('../views/layout'),
        children:[
          {
            path:'index',
              component:()=> import("../views/notice/index.vue")
          }
        ]
      },
      {
        // 图片上传
        path:'/upload',
        name:'upload',
        meta:{
            title:'图片上传',
            icon:'el-icon-menu',
            level:1,
            role:['admin','xz']
        },
        /* 路由组件依然是layout */
        component:()=> import('../views/layout'),
        children:[
          {
            path:'index',
              component:()=> import("../views/upload/index.vue")
          }
        ]
      },
]