import Vue from 'vue'
import Vuerouter from 'vue-router'

const Home=()=>import('../views/home/Home')
const CateGory=()=>import('../views/category/CateGory')
const ShopCart=()=>import('../views/shopcart/ShopCart')
const ProFile=()=>import('../views/profile/Profile')

//安装插件
Vue.use(Vuerouter)

//创建路由对象
const routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:CateGory
  },
  {
    path:'/shopcart',
    component:ShopCart
  },
  {
    path:'/profile',
    component:ProFile
  },
]
const router=new Vuerouter({
  routes,
  mode:'history'
})

//导出router
export default router