import Vue from 'vue'
import VueRouter from 'vue-router'

const Home=()=>import('../views/home/Home')
const CateGory=()=>import('../views/category/CateGory')
const ShopCart=()=>import('../views/shopcart/ShopCart')
const ProFile=()=>import('../views/profile/ProFile')
const Detail=()=>import('../views/detail/Detail')

//安装插件
Vue.use(VueRouter)

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
  {
    path:'/detail/:iid',
    component:Detail
  }
]


const router = new VueRouter({
  routes,
  mode:'history'
})

export default router