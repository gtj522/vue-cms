<template>
  <div class="app-container">

    <!--首页头部-->
    <mt-header fixed title="黑马vue项目">
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>


    <!--首页中间,变化组件-->
    <transition>
    <router-view></router-view>
    </transition>


    <!--首页底部-->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-gtj " to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-gtj" to="/member">
        <span class="mui-icon mui-icon-email"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-gtj" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{ $store.getters.getAllCount || 0}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-gtj" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>

  </div>
</template>

<script>
export default {
  data(){
    return {
      flag : false,
    }
  },
  methods : {
    goBack(){
      this.$router.go(-1);
    }
  },
  created(){
    this.flag = this.$route.path !== '/home';
  },
  watch : {
    '$route.path' : function (newVal,oldVal) {
      this.flag = newVal !== '/home';
    },
  },
}
</script>

<style lang="less" scoped>
  .mint-header{
    z-index: 99;
  }
  .app-container {
    overflow-x: hidden;
    padding: 40px 0 50px 0;


    .mui-bar-tab .mui-tab-item-gtj
    {
      display: table-cell;
      overflow: hidden;

      width: 1%;
      height: 50px;

      text-align: center;
      vertical-align: middle;
      white-space: nowrap;
      text-overflow: ellipsis;

      color: #929292;
    }
    .mui-bar-tab .mui-tab-item-gtj.mui-active
    {
      color: #007aff;
    }
    .mui-bar-tab .mui-tab-item-gtj .mui-icon
    {
      top: 3px;

      width: 24px;
      height: 24px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .mui-bar-tab .mui-tab-item-gtj .mui-icon ~ .mui-tab-label
    {
      font-size: 11px;

      display: block;
      overflow: hidden;

      text-overflow: ellipsis;
    }
    .mui-bar-tab .mui-tab-item-gtj .mui-icon:active
    {
      background: none;
    }


  }

  .v-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to{
    position: absolute;
    opacity: 0;
    transform: translateX(-100%);
  }
  .v-enter-active,.v-leave-active{
    transition: all .5s ease;
  }
</style>