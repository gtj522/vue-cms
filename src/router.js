import VueRouter from 'vue-router';

//数据接口 http://www.liulongbin.top:3005/api/getnewslist

//TODO: tabber
//1.home组件
import Home from './components/tabber/home.vue';
//2.member组件
import Member from './components/tabber/Member.vue';
//3.Shopcar组件
import Shopcar from './components/tabber/Shopcar.vue';
//4.Search组件
import Search from './components/tabber/Search.vue';

//TODO: news
import NewsList from './components/news/NewsList.vue';
import NewsInfo from './components/news/NewsInfo.vue';

//TODO: photo
import PhotoList from './components/photos/Photolist.vue';
import PhotoInfo from './components/photos/PhotoInfo.vue';

//TODO: goods
import GoodsList from './components/goods/GoodsList.vue';
import GoodsInfo from './components/goods/GoodsInfo.vue';
import GoodsDesc from './components/goods/GoodsDesc.vue';
import GoodsComment from './components/goods/GoodsComment.vue';

let router = new VueRouter({
  routes : [
    {path : '/',redirect : '/home'},
    {path : '/home',component : Home},
    {path : '/member',component : Member},
    {path : '/shopcar',component : Shopcar},
    {path : '/search',component : Search},
    {path : '/home/newslist',component : NewsList},
    {path : '/home/newsinfo/:id',component : NewsInfo},
    {path : '/home/photolist',component : PhotoList},
    {path : '/home/PhotoInfo/:id',component : PhotoInfo},
    {path : '/home/goodslist',component : GoodsList},
    {path : '/home/goodslist/:id',component : GoodsInfo},
    //使用编程时导航
    {path : '/home/goodsdesc/:id',component : GoodsDesc,name : 'goodsdesc'},
    {path : '/home/goodscomment:id',component : GoodsComment,name : 'goodscomment'},
  ],
  linkActiveClass : 'mui-active',
});

export default router;