//固定的存在 所有角色都可以访问的路由
export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login')
      },
]