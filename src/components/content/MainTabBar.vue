<template>
  <tab-bar>
      <tab-bar-item path='/home'>
        <img slot="item-icon" src="~assets/img/tabbar/home.png"  alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home1.png"  alt="">
        <div class="t" slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path='/category'>
        <img slot="item-icon" src="~assets/img/tabbar/category.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/category (1).png"  alt="">
        <div class="t" slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path='/shopcart'>
        <img slot="item-icon" src="~assets/img/tabbar/shop-cart-2.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/shop-cart-2 (1).png"  alt="">
        <div class="t" style="padding-left:5px;" slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path='/profile'>
        <img slot="item-icon" src="~assets/img/tabbar/profile.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile (1).png"  alt="">
        <div class="t" slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>

import TabBar from '../../components/common/tabbar/src/components/tabbar/TabBar'
import TabBarItem from '../../components/common/tabbar/src/components/tabbar/TabBarItem'

export default {
  name:'MainTabBar',
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style>
  
</style>