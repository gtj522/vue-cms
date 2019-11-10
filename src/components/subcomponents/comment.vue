<template>
  <div class="cmt">
    <h3>发表评论</h3>

    <textarea placeholder="请输入要评论的内容(最多120字)" maxlength="120" v-model="msg">

    </textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.id">
        <div class="cmt-title">
          第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ new Date() | dateFormat('YYYY-MM-DD HH:mm:ss') }}
        </div>
        <div class="cmt-body">
          {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
        </div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {

        pageIndex: 1,  //页数
        comments: [],
        msg: '', //评论的内容
      };
    },
    created() {
      this.getComments();
    },
    methods: {
      //获取评论数据
      getComments() {
        this.$http.get('http://localhost:8080/src/data/comments.json').then(res => {
          if (res.body.status === 0) {
            this.comments = this.comments.concat(res.body.message);
          } else {
            Toast('获取评论失败');
          }
        });
      },
      //加载更多评论
      getMore() {
        this.pageIndex++;
        this.getComments();
      },
      //发表评论
      postComment() {

        if (this.msg.trim().length === 0) {
          return Toast('发表评论不能为空');
        }

        this.$http.post(
          'api/postcomment/' + this.$route.params.id,
          {content: this.msg.trim()},
        )
          .then(res => {
            if (res.body.status === 0) {

              let cmt = {
                user_name: '匿名用户',
                add_time: new Date(),
                content: this.msg.trim(),
              };
              this.comments.unshift(cmt);
              this.msg = '';
            }
          })

      },
    },
    props: ['id'],//接受父组件的值需要定义
  }

</script>

<style lang="less" scoped>
  .cmt {
    h3 {
      font-size: 18px;
    }

    textarea {
      font-size: 14px;
      height: 85px;
      margin: 0;
    }

    .cmt-list {
      margin: 5px 0;

      .cmt-item {
        font-size: 13px;

        .cmt-title {
          line-height: 30px;
          background-color: #ccc;
        }

        .cmt-body {
          line-height: 35px;
          text-indent: 2em;
        }
      }
    }
  }
</style>