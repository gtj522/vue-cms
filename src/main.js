//入口文件
console.log('ok');
//1.vue
import Vue from 'vue';
//2.app组件
import app from './App.vue';
/*
//3.按需导入mint-ui组件
import { Header,Swipe, SwipeItem,Button,Lazyload } from 'mint-ui';
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name,Button);
Vue.component('Lazyload',Lazyload); //巨坑 Lazyload.name报错  原因:由于Lazyload需要用到字体图标，应该全部导入
*/
//3.mint-ui
import MintUI from 'mint-ui';
Vue.use(MintUI);
import 'mint-ui/lib/style.css';
//4.mui(处理了底部)
import './lib/mui/css/mui.min.css';
//5.字体图标扩展
import './lib/mui/css/icons-extra.css'
//6.vue-router路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//7.载入自己的路由模块
import router from './router.js';
//8.vue-resource(ajax)
import VueResource from 'vue-resource';
Vue.use(VueResource);
//9.安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);
//10. vuex 数据共享
import Vuex from 'vuex';
Vue.use(Vuex);

//本地存储商品数据
let cars = JSON.parse(localStorage.getItem('car')) || [];
let store = new Vuex.Store({
  state: { //this.$store.state.***
    car: cars,// { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
  },
  //处理数据
  mutations: { //this.$store.commit('方法名称','唯一参数')
    //点击加入购物车把商品数据加入到car数组中
    addToCar(state, goodsInfo) {
      let flag = false;
      //1.假设购物车中已经有数据了
      state.car.some(item => {
        if (item.id === goodsInfo.id) {
          item.count += parseInt(goodsInfo.count);
          flag = true;
          return true;
        }
      });
      //2.如果没有数据
      if (!flag){
        state.car.push(goodsInfo);
      }
      localStorage.setItem('car',JSON.stringify(state.car));//保存到本地
    },
    //修改商品数量
    upDateGoodsInfo(state,goodsInfo){
      state.car.some(item=>{
        if (parseInt(item.id) === parseInt(goodsInfo.id)){
          item.count = parseInt(goodsInfo.count);
          return true;
        }
      });
      localStorage.setItem('car',JSON.stringify(state.car));//保存到本地
    },
    //删除商品
    removeGoodsInfo(state,id){
      state.car.some((item,i)=>{
        if (parseInt(item.id) === parseInt(id));
        state.car.splice(i,1);
        return true;
      });
      localStorage.setItem('car',JSON.stringify(state.car));//保存到本地
    },
    //设置商品勾选
    updateGoodSelected(state,{id,flag}){
      state.car.some(item=>{
        if (item.id == id){
          item.selected = flag;
          return true;
        }
      });
      localStorage.setItem('car',JSON.stringify(state.car));//保存到本地
    },



  },
  getters: { //this.$store.getters.***
    //获取商品总数
    getAllCount(state){
      let count = 0;
      state.car.forEach(item=>{
        count += item.count;
      });
      return count;
    },
    //获取购物车中每个商品数
    getGoodsCount(state){
      let goodsCount = {};
      state.car.forEach(item=>{
        goodsCount[item.id] = item.count;
      });
      return goodsCount;  //{ 87 : 3, 88: 4, 89 : 1 }
    },
    //获取商品选中状态
    getSelected(state){
      let goodSelect = {};
      state.car.forEach(item=>{
        goodSelect[item.id] = item.selected;
      });
      return goodSelect;  //{ 87 : true, 88: true, 89 : true }
    },
    //获取商品勾选后的价格总和
    getGoodsTotalPrice(state){
      let allPrice = {
        count : 0,    //总商品数
        amount : 0,   //总价
      };
      state.car.forEach(item=>{
        if (item.selected){
          allPrice.count += item.count;
          allPrice.amount += item.count * item.price;
        }
      });
      return allPrice;
    },
  },
});


Vue.http.options.root = 'http://www.liulongbin.top:3005/';//全局配置接口根路径
Vue.http.options.emulateJSON = true;

//9.moment 时间格式化插件
import moment from 'moment';
//定义全局的过滤器
Vue.filter('dateFormat', function (dateStr, pattern) {

  return moment(dateStr).format(pattern);

});


let vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store
});


