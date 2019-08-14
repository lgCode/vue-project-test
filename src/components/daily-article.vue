<template>
  <div class="daily-article">
    <div class="daily-article-title"> {{data.title}} </div>
    <div class="daily-article-content" v-html="data.body"></div>

    <div class="daily-comments" v-show="comments.length">
      <span>评论({{ comments.length }}) </span>
      <div class="daily-comment" v-for="(comment, index) in comments" :key="index">
        <div class="daily-comment-avatar">
          <img :src="comment.avatar" alt="头像">
        </div>
        <div class="daily-comment-content">
          <div class="daily-comment-name">{{ comment.author }}</div>
          <div class="daily-comment-time" v-time="comment.time"></div>
          <div class="daily-comment-text">{{ comment.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Time from '../directives/time';
  export default {
    name: 'dailyArticle',
    directives: {
      Time
    },
    props: {
      id: {
        type: Number,
        default: 0,
      }
    },
    data() {
      return {
        data: {},
        comments: [],
        articleId:0
      }
    },
    methods: {
      getArticle() {
        //获取文章内容
        this.$axios.get('news?' + this.id)
          .then(res => {
            // console.log(res.data);
            this.data = res.data;
            window.scrollTo(0, 0);
            this.getComments();
          })
          .catch(error => {
            console.log(error);
          })
      },
      getComments() {
        //获取评论
        this.comments = [];
        this.$axios.get('comments?' + this.id)
          .then(res => {
            // console.log(res);
            this.comments = res.data.comments;
            console.log(this.comments);
          })
          .catch(error => {
            console.log(error);
          })
      }
    },
    watch: {
      id(val) {
        //如果id没有值，则不显示
        if (val){
          this.articleId = val;
          this.getArticle();
        } 
      }
    }
  }

</script>

<style scoped>

</style>
