<template>
  <div class="good-info">
    <!--购物车小球动画-->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="isBall" ref="ball"></div>
    </transition>

    <!--商品轮播图-->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunBoTu" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <!--商品购买-->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsInfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">市场价：
            <del>￥{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;销售价：<span
              class="now_price">￥{{ goodsInfo.sell_price }}</span></p>
          <p>购买数量:
            <numberBox @getcount="getSelectedCount" :maxNum="goodsInfo.stock_quantity"></numberBox>
            <!--主要两点：1.购买数量 2.最大库存-->
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addShop">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!--商品参数-->
    <div class="mui-card">
      <div class="mui-card-header mui-card-media">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsInfo.goods_no }}</p>
          <p>库存情况：{{ goodsInfo.stock_quantity }}</p>
          <p>上架时间：{{ goodsInfo.add_time | dateFormat('YYYY-MM-DD HH:mm:ss')}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  //轮播图组件
  import swiper from '../subcomponents/swiper.vue';
  //numberBox 购买数量组件
  import numberBox from '../subcomponents/goodinfo-numberBox.vue';


  export default {
    data() {
      return {
        id: this.$route.params.id,
        lunBoTu: [],    //轮播图
        goodsInfo: [],  //商品详情
        isBall: false,  //小球显示
        selectedCount: 1,  //购买数量
      };
    },
    created() {
      this.getLunBoTu();
      this.getGoodsInfo();
    },
    methods: {
      getLunBoTu() {
        this.$http.get('api/getthumimages/' + this.id).then(res => {
          if (res.body.status === 0) {
            res.body.message.forEach((item, i) => {
              item.img = item.src;
            });
            this.lunBoTu = res.body.message;
          }
        });
      },
      getGoodsInfo() {
        this.$http.get('api/goods/getinfo/' + this.id).then(res => {
          if (res.body.status === 0) {
            this.goodsInfo = res.body.message[0];
          }
        });
      },
      //使用编程时导航跳转图文介绍
      goDesc(id) {
        this.$router.push({name: 'goodsdesc', params: {id}});
      },
      //使用编程时导航跳转评论
      goComment(id) {
        this.$router.push({name: 'goodscomment', params: {id}});
      },
      //添加到购物车
      addShop() {
        this.isBall = !this.isBall;
        // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
        //这个数据最终保存到store中
        let goodsInfo = {
          id: this.id,
          count: this.selectedCount,
          price: this.goodsInfo.sell_price,
          selected : true,
        };
        this.$store.commit("addToCar",goodsInfo); //调用mutations中的方法，加载数据
      },
      beforeEnter(el) {
        el.style.transform = 'translate(0,0)';
      },
      //小球动画
      enter(el, done) {
        //解决小球随着不同分辨率，位移的改变
        let ballPosition = this.$refs.ball.getBoundingClientRect();
        let badge = document.getElementById('badge').getBoundingClientRect();

        let xDist = badge.left - ballPosition.left;
        let yDist = badge.top - ballPosition.top;

        el.offsetWidth;
        el.style.transform = `translate(${xDist}px,${yDist}px)`;
        el.style.transition = 'all .5s cubic-bezier(.4,-0.3,1,.68)';
        done();
      },
      afterEnter(el) {
        this.isBall = !this.isBall;
      },
      //选择的数量，涉及到父组件通过方法调用向子组件传值
      getSelectedCount(count) {
        this.selectedCount = count;

      },

    },
    components: {
      swiper,
      numberBox,
    }
  }
</script>

<style lang="less" scoped>
  .good-info {
    overflow: hidden;
    background-color: #eee;

    .now_price {
      color: red;
      font-size: 16px;
    }

    .mui-card-footer {
      display: block;

      button {
        margin: 15px 0;
      }
    }

    .ball {
      position: absolute;
      left: 140px;
      top: 490px;
      width: 15px;
      height: 15px;
      background-color: red;
      border-radius: 50%;
      z-index: 99;
    }
  }
</style>