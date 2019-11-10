<template>
  <div class="mui-numbox" data-numbox-min='1' data-numbox-max="10" style="height:25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="count"  ref="numbox" @change="countChanged" readonly />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
  import mui from '../../lib/mui/js/mui.min.js';
  export default {
    mounted() {
      //初始化数字选择框组件
      mui('.mui-numbox').numbox();

    },
    props : ['count','goodId'],  //count:每个商品数 goodId:商品id
    methods : {
      //数量值改变的时候,同步数据到购物车中
      countChanged(){
        this.$store.commit("upDateGoodsInfo",{
          id : this.goodId,
          count : this.$refs.numbox.value,
        });
      },
    },

  }
</script>

<style lang="less" scoped>
</style>