<template>
  <div class="mui-numbox" data-numbox-min='1' :data-numbox-max="maxNum">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1"  ref="numbox" @change="countChanged"/>
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
    methods : {
      //数量框改变的时候
      countChanged(){
        let sum = parseInt(this.$refs.numbox.value);  //加入到购物车中的数量
        this.$emit('getcount',sum);
      },
    },
    props : ['maxNum'],
    //由于父组件传递的库存值是异步操作的，所以需要通过watch监听数据的改变，然后动态地改变mui组件的值
    watch : {
      maxNum : (newVal,oldVal)=>{
        mui('.mui-numbox').numbox().setOption('maxNum',newVal);
      },
    },
  }
</script>

<style lang="less" scoped>
</style>