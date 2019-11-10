<template>
  <div>

    <ul class="mui-table-view">

      <li class="mui-table-view-cell mui-media" v-for="item in newsList[0]" :key="item.id">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class='mui-ellipsis'>
              <span>发表时间:{{ new Date() | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
              <span>点击:{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>

    </ul>

  </div>
</template>

<script>

  import Toast from 'mint-ui';

export default {
  data(){
    return {
      newsList : [],
    };
  },
  created(){
    this.getNewsList();
  },
  methods : {
    getNewsList(){

      this.$http.get('api/getnewslist').then(res => {
        if (res.body.status === 0){
          this.newsList.push(res.body.message);
        }else{
          Toast('获取新闻列表失败');
        }

      });

    }
  },



}


</script>

<style lang="less" scoped>

  .mui-media-body{
    h1{
      font-size: 13px;
    }
    .mui-ellipsis{
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #226aff;
    }
  }



</style>