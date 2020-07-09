<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Scroll',
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      scroll:null
    }
  },
  mounted(){
    this.scroll=new BScroll(this.$refs.wrapper,{
      probeType:this.probeType,
      click:true,
      pullUpLoad:this.pullUpLoad
    })

    this.scroll.on('scroll',(position)=>{
      // console.log(position);
      this.$emit('scroll',position)      
    })

    this.scroll.scrollTo(0,0)

    this.scroll.on('pullingUp',()=>{
      // console.log('上拉加载成功');
      this.$emit('pullingUp')

      setTimeout(() => {
        this.scroll.finishPullUp()
      }, 2000);
    })
  }
}
</script>

<style>

</style>