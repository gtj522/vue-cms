<template>
  <div>
    <!--谁使用轮播图组件，谁就传数据过来-->
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" alt="" :class="{'full': isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  export default {
    props : ['lunbotuList','isfull']
  }
</script>

<style lang="less" scoped>
  .mint-swipe {
    height: 300px;
    .mint-swipe-item {
      text-align: center;
      img {
        /*width: 100%;*/
        height: 100%;
      }
    }
  }
  .full{
    width: 100%;
  }
</style>