<template>
  <div class="newsInfo">
    <h3 class="title">{{ newsInfo.title }}</h3>
    <p class="sub-title">
      <span>发表时间 {{ new Date() | dateFormat('YYYY-MM-DD HH:mm:ss') }}</span>
      <span>点击:{{ newsInfo.click }}次</span>
    </p>

    <div class="content" v-html="newsInfo.content">
    </div>

    <comment-box :id="this.id">

    </comment-box>

  </div>
</template>

<script>

  import {Toast} from 'mint-ui';
  import comment from '../subcomponents/comment.vue'; //评论子组件

  export default {
    data() {
      return {
        id: this.$route.params.id,
        newsInfo: {},
      }
    },
    created() {
      this.getNewsListInfo();
    },
    methods: {
      getNewsListInfo() {
        this.$http.get('api/getnew/' +this.id ).then(res => {
          if (res.body.status === 0) {
              this.newsInfo = res.body.message[0];
          } else {
            Toast("获取新闻失败！");
          }
        });
      }
    },
    components : {
      'comment-box' : comment
    },
  }
</script>

<style lang="less" scoped>
  .newsInfo {
    padding: 0 4px;

    .title {
      margin: 15px 0;
      font-size: 16px;
      text-align: center;
      color: red;
    }

    .sub-title {
      font-size: 13px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
    .content{
      text-indent:2em;
      font-size: 14px;
      line-height: 26px;
      color: #666;
    }
  }

</style>