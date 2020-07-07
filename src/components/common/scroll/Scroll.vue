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
  data(){
    return {
      scroll:null
    }
  },
  mounted(){
    this.scroll=new BScroll(this.$refs.wrapper,{
      click:true,
      pullUpLoad:true
    })

    this.scroll.on('pullingUp',()=>{
      console.log('上拉加载成功');
    })
  }
}
</script>

<style>

</style>