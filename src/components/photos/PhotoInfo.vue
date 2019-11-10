<template>
  <div class="PhotoInfo">

    <h3>{{ photoInfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间 {{ new Date() | dateFormat('YYYY-MM-DD HH:mm:ss') }}</span>
      <span>点击: {{ photoInfo.click }}次</span>
    </p>

    <hr>

    <!--图片缩略图区域-->
    <div class="thumbs">
      <vue-preview :slides="list" ></vue-preview>
    </div>

    <div class="content" v-html="photoInfo.content">

    </div>

    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
  //导入评论组件
  import cmt from '../subcomponents/comment.vue';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        photoInfo: [],
        list: [],
      };
    },
    created() {
      this.getPhotoInfo();
      this.getThumbs();
    },
    methods: {
      getPhotoInfo() {
        this.$http.get('api/getimageInfo/' + this.id).then(res => {
          if (res.body.status === 0) {
            this.photoInfo = res.body.message[0];
          }
        })
      },
      getThumbs() {
        this.$http.get('api/getthumimages/' + this.id).then(res => {
          if (res.body.status === 0) {
            res.body.message.forEach((item, i) => {
              item.w = 600;
              item.h = 400;
              item.msrc = item.src
            });
            this.list = res.body.message;
          }
        });
      },
    },
    components: {
      'cmt-box': cmt,
    }

  }
</script>

<style lang="less" scoped>
  .PhotoInfo {
    padding: 3px;
    h3 {
      color: #26a2ff;
      font-size: 15px;
      text-align: center;
      margin: 15px 0;
    }
    .subtitle {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
    }
    .content {
      font-size: 13px;
      line-height: 30px;
    }
  }

</style>