import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Login from '@/views/login'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import ProDetail from '@/views/prodetail'
import Pay from '@/views/pay'
import MyOrder from '@/views/myorder'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/category', component: Category },
      { path: '/cart', component: Cart },
      { path: '/user', component: User }
    ]
  },
  { path: '/login', component: Login },
  { path: '/search', component: Search },
  { path: '/searchlist', component: SearchList },
  // 动态路由传惨
  { path: '/prodetail/:id', component: ProDetail },
  { path: '/pay', component: Pay },
  { path: '/myorder', component: MyOrder }
]

const router = new VueRouter({
  routes
})

// 设置需要权限才能进入的页面路由
const authUrl = ['/pay', '/myorder']

// 设置全局前置守卫
// 访问的路由在解析前都会经过全局前置守卫
router.beforeEach((to, from, next) => {
  // to: 即将要进入的目标 路由对象
  // from: 当前导航正要离开的路由
  // next() 不中断 直接放行 next(xxx) 中断当前导航，重置到指定路由

  if (!authUrl.includes(to.path)) {
    // 不在权限页面中，直接放行
    next()
    return
  }
  // 获取token token不存在则返回到登录页
  // const token = store.state.user.userInfo.token
  const token = store.getters.userToken
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
