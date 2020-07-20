<template>
  <div id="detail">
    <detail-nav-bar class="dnb" />
      <scroll class="content1" ref="scroll">
        <detail-swiper :top-images='topImages'/>
        <detail-base-info :goods='goods'/>
        <detail-shop-info :shop='shop'/>
        <!-- <detail-goods-info :detail-info='detailInfo' /> -->
      </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import {getDetail,Goods,Shop} from 'network/detail'
import DetailSwiper from './childComps/DetailSwiper'
import Scroll from 'components/common/scroll/Scroll'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'


export default {
  
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo
  },
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{}
    }
  },
  // methods:{
  //   imageLoad(){
  //     this.$refs.scroll.refresh()
  //   }
  // },
  created(){
    //保存传入的iid
    this.iid=this.$route.params.iid
    //根据iid请求详情数据
    getDetail(this.iid).then(res=>{
      // console.log(res);
      const data=res.result;
      this.topImages =data.itemInfo.topImages
      //获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //创建店铺信息
      this.shop=new Shop(data.shopInfo)

      //保存商品的详情数据
      this.detailInfo=data.detailInfo
    })
    
    
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 1000;
    height: 100vh;
    background-color: #fff;
  }
  .dnb{
    position: relative;
    z-index: 1000;
    background-color: #fff;
  }
  .content1{
    height: calc(100%-44px);
  }
</style>