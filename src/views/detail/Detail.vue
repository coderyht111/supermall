<template>
  <div id="detail">
    <detail-nav-bar class="dnb" @itemClick='itemClick'/>
      <scroll class="content1" ref="scroll">
        <detail-swiper :top-images='topImages'/>
        <detail-base-info :goods='goods'/>
        <detail-shop-info :shop='shop'/>
        <!-- <detail-goods-info :detail-info='detailInfo' /> -->
        <detail-param-info ref="params" :param-info='paramsInfo'/>
        <detail-comment-info ref="comment" :comment-info='commentInfo'/>
        <goods-list ref="recommend" :goods='recommend'/>
      </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import DetailSwiper from './childComps/DetailSwiper'
import Scroll from 'components/common/scroll/Scroll'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'


export default {
  
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList
  },
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramsInfo:{},
      commentInfo:{},
      recommend:[],
      themeTopYs:[]
    }
  },
  methods:{
    itemClick(index){
      // console.log(index);
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],500)
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

      //获取参数信息
      this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //获取评论信息
      if(data.rate.cRate!==0){
        this.commentInfo=data.rate.list[0]
      }

      this.$nextTick(()=>{
        this.themeTopYs=[]
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-46)
        console.log(this.themeTopYs);
      })
    })
    //请求推荐数据
    getRecommend().then(res=>{
      // console.log(res);
      this.recommend=res.data.list
    })
    
    
  },
  mounted(){
    
  },
  updated(){
    
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