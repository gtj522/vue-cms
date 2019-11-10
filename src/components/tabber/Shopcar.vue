<template>
  <div class="shop-car">
    <div class="goods-list">
      <!--商品列表区域-->

      <div class="mui-card" v-for="(item, i) in goodsList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getSelected[item.id]"
            @change="selectedChange(item.id,$store.getters.getSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :count="$store.getters.getGoodsCount[item.id]" :goodId="item.id"></numbox>
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!--结算区域-->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计(不含运费)</p>
              <p>已勾选商品 <span class="num">{{ $store.getters.getGoodsTotalPrice.count }}</span> 件，总价 <span class="price">￥{{ $store.getters.getGoodsTotalPrice.amount }}</span> 元</p>
            </div>
            <mt-button type="danger" >去结算</mt-button>
          </div>
        </div>
      </div>
    </div>


    <p>{{ $store.getters.getSelected }}</p>
  </div>
</template>


<script>
  import numbox from '../subcomponents/shopcar-numbox.vue';

  export default {
    data() {
      return {
        goodsList: [], //商品列表
      };
    },
    created() {
      this.getGoodsList();
    },
    methods: {
      //获取购物车列表
      getGoodsList() {
        let ids = [];

        this.$store.state.car.forEach(item => {
          ids.push(parseInt(item.id));
        });

        //如果购物车没有商品 return
        if (ids.length <= 0) return;

        this.$http.get('api/goods/getshopcarlist/' + ids).then(res => {
          if (res.body.status === 0) {
            this.goodsList = res.body.message;
          }
        });
      },
      //删除购物车列表
      remove(id,index){
        this.goodsList.splice(index,1);
        this.$store.commit('removeGoodsInfo',id);
      },
      //是否勾选
      selectedChange(id,flag){
        this.$store.commit('updateGoodSelected',{id,flag});
      }
    },
    components: {
      numbox,
    }
  }
</script>

<style lang="less" scoped>
  .shop-car {
    overflow: hidden;
    background-color: #eee;

    .goods-list {
      .mui-card-content-inner {
        align-items: center;
        display: flex;

        img {
          width: 60px;
          height: 60px;
        }

        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          h1 {
            margin-bottom: 5px;
            font-size: 13px;
          }

          p {
            margin: 10px 0 5px 0;
          }

          .price {
            color: red;
            font-weight: 400;
          }
        }
      }
      .jiesuan{
        display: flex;
        justify-content: space-between;
        .left{
          .num,.price{
            color: red;
            font-weight: 400;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>