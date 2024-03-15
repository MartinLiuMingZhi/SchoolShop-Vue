import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    meta:{name:'登录'},
    component: () => import('../views/login/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta:{name:'注册'},
    component: () => import('../views/login/RegisterView.vue')
  },
  {
    path:'/manager',
    name:'manager',
    redirect:'/home',
    component:() => import('../views/shoolshop-manage/ManagerView.vue'),
    children: [
        //子路由
      {
        path:'/home',
        name:'home',
        meta:{name:'系统首页'},
        component:() => import('@/views/shoolshop-manage/manager/HomeView.vue'),
      },
      {
        path:'/employee',
        name:'employee',
        meta:{name:'员工信息'},
        component:() => import('@/views/shoolshop-manage/manager/EmployeeView.vue')
      },
      {
        path:'/user',
        name:'user',
        meta:{name:'用户信息'},
        component:() => import('@/views/shoolshop-manage/manager/UserView.vue')
      },
      {
        path:'/product',
        name:'product',
        meta:{name:'商品信息'},
        component:() => import('@/views/shoolshop-manage/manager/ProductView.vue')
      },
      {
        path:'/order',
        name:'order',
        meta:{name: '订单管理'},
        component:() => import('@/views/shoolshop-manage/manager/OrderView.vue')
      },
      {
        path:'/person',
        name:'person',
        meta:{name:'个人信息'},
        component:() => import('@/views/shoolshop-manage/manager/PersonView.vue')
      },
      {
        path:'/password',
        name:'password',
        meta:{name:'修改密码'},
        component:() => import('@/views/shoolshop-manage/manager/PasswordView.vue')
      },
      {
        path:'/news',
        name:'news',
        meta:{name:'新闻详情'},
        component:() => import('@/views/shoolshop-manage/manager/NewsView.vue')
      },
      {
        path:'/notice',
        name:'notice',
        meta:{name:'系统公告'},
        component:() => import('@/views/shoolshop-manage/manager/NoticeView.vue')
      }
    ]
  },
  {
    path:'/marketplace',
    name:'marketplace',
    meta:{name:'购物商城'},
    component:() => import('@/views/front/MarketPlace.vue')
  },
  {
    path:'/:pathMatch(.*)*',
    name:'NotFound',
    meta:{name:'无法访问'},
    component:() => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
