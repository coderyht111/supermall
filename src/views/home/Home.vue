<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control v-show="isTabFixed" class="fixed" @tabClick="tabClick"
                 :titles="['流行', '新款', '精选']" ref="toptabControl"></tab-control>
    <scroll class="content1" ref="scroll" :probeType='3' @scroll="contentScroll" :pullUpLoad="true" @pullingUp="loadMore">
      <home-swiper :banners='banners' ref="hSwiper"/>
      <recommend-view :recommends='recommends'/>
      <feature-view />
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl"/>
      <goods-list :goods="shouGoods" />
    </scroll>

    <back-top @click.native='backClick' v-show="isShow"/>

    <!-- <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表11</li>
      <li>列表12</li>
      <li>列表13</li>
      <li>列表14</li>
      <li>列表15</li>
      <li>列表16</li>
      <li>列表17</li>
      <li>列表18</li>
      <li>列表19</li>
      <li>列表20</li>
      <li>列表21</li>
      <li>列表22</li>
      <li>列表23</li>
      <li>列表24</li>
      <li>列表25</li>
      <li>列表26</li>
      <li>列表27</li>
      <li>列表28</li>
      <li>列表29</li>
      <li>列表30</li>
      <li>列表31</li>
      <li>列表32</li>
      <li>列表33</li>
      <li>列表34</li>
      <li>列表35</li>
      <li>列表36</li>
      <li>列表37</li>
      <li>列表38</li>
      <li>列表39</li>
      <li>列表40</li>
      <li>列表41</li>
      <li>列表42</li>
      <li>列表43</li>
      <li>列表44</li>
      <li>列表45</li>
      <li>列表46</li>
      <li>列表47</li>
      <li>列表48</li>
      <li>列表49</li>
      <li>列表50</li>
      <li>列表51</li>
      <li>列表52</li>
      <li>列表53</li>
      <li>列表54</li>
      <li>列表55</li>
      <li>列表56</li>
      <li>列表57</li>
      <li>列表58</li>
      <li>列表59</li>
      <li>列表60</li>
      <li>列表61</li>
      <li>列表62</li>
      <li>列表63</li>
      <li>列表64</li>
      <li>列表65</li>
      <li>列表66</li>
      <li>列表67</li>
      <li>列表68</li>
      <li>列表69</li>
      <li>列表70</li>
      <li>列表71</li>
      <li>列表72</li>
      <li>列表73</li>
      <li>列表74</li>
      <li>列表75</li>
      <li>列表76</li>
      <li>列表77</li>
      <li>列表78</li>
      <li>列表79</li>
      <li>列表80</li>
      <li>列表81</li>
      <li>列表82</li>
      <li>列表83</li>
      <li>列表84</li>
      <li>列表85</li>
      <li>列表86</li>
      <li>列表87</li>
      <li>列表88</li>
      <li>列表89</li>
      <li>列表90</li>
      <li>列表91</li>
      <li>列表92</li>
      <li>列表93</li>
      <li>列表94</li>
      <li>列表95</li>
      <li>列表96</li>
      <li>列表97</li>
      <li>列表98</li>
      <li>列表99</li>
      <li>列表100</li>
    </ul> -->
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView' 
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'
import {getHomeMultidata,getHomeGoods} from 'network/home'

export default {
  name:'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return{
      // result:null
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShow:false,
      isTabFixed: false,
      tabOffsetTop: 0,
    }
  },
  computed:{
    shouGoods(){
      return this.goods[this.currentType].list
    }
  },
  created(){

    console.log('创建Home');
    //请求多个数据
    this.getHomeMultidata()

    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    //监听item中图片加载完成
    // this.$bus.$on('itemImgLoad',()=>{
    //   // console.log('-----');
      
    // })
  },
  activated: function () {
      this.$refs.hSwiper.startTimer()
    },
    deactivated: function () {
      this.$refs.hSwiper.stopTimer()
    },
  updated() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      // console.log(this.tabOffsetTop);
    },
  methods:{
    /**
     * 事件监听的方法
     */
    tabClick(index){
      // console.log(index);
      switch(index){
        case 0:this.currentType='pop';break
        case 1:this.currentType='new';break
        case 2:this.currentType='sell';break
      }
      this.$refs.toptabControl.indexActive=index
      this.$refs.tabControl.indexActive=index
    },
    backClick(){
      this.$refs.scroll.scroll.scrollTo(0,0,500)
      
    },
    contentScroll(position){
      // 1.决定tabFixed是否显示
      this.isTabFixed = position.y < -this.tabOffsetTop

      // console.log(position);
      this.isShow = position.y < -1000
      
      
    },
    loadMore(){
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()
    },



    /**
     * 网络请求的方法
     */
    getHomeMultidata(){
       getHomeMultidata().then(res=>{
        // console.log(res);
        // this.result=res
        this.banners=res.data.banner.list;
        this.recommends=res.data.recommend.list;
        // 下次更新DOM时,获取新的tabOffsetTop值(不保险,可以在updated钩子中获取)
          this.$nextTick(() => {
            this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
          })
      })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+ 1
      getHomeGoods(type,page).then(res=>{
        // console.log(res.data.list);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++
      })
    }
  }
}
</script>

<style>
  #home{
    height: 100vh;
    /* position: relative; */
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
 .fixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }
  /* .content1{
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
  } */
  .content1{
    height: calc(100% - 93px);
    overflow: hidden;
  }
</style>