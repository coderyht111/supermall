<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name:'NavBar'
}
</script>

<style>
  .nav-bar{
    display: flex;
    height: 44px;
    text-align: center;
    line-height: 44px;
    /* background-color: #FF8E96; */
    /* color: #fff; */
    box-shadow: 0 2px 2px rgba(100, 100, 100, .5);
  }

  .left,.right{
    width: 60px;
  }
  .center{
    flex: 1;
  }
</style>