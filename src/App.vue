<template>
  <div id="app">
    <div class="daily">
      <div class="daily-menu">
        <div class="daily-menu-item" :class="{on:type ==='recommend'}" @click="handleToRecommend">每日推荐</div>
        <div class="daily-menu-item" :class="{on:type ==='daily'}" @click="showThemes=!showThemes">主题日报</div>
        <ul v-show="showThemes">
          <li v-for="(item, index) in themes" :key="index">
            <a :class="{on:item.dailyId === themeId && type === 'daily'}" 
              @click="handleToTheme(item.dailyId)">
              {{item.name}} </a>
          </li>
        </ul>
      </div>
      <div class="daily-list" ref="listWrap">
        <!-- 每日推荐 -->
        <template v-if="type === 'recommend'">
          <div v-for="(list, index) in recommendList" :key="index">
            <div class="daily-date">
              {{ list.date }}
            </div>
            <Item v-for="(item, index) in list.stories" 
                  :key="index" 
                  :itemData="item"
                  @click.native="handleClick(item.id)"></Item>
          </div>
        </template>


        <!-- 主题日报 -->
        <template v-if="type === 'daily'">
          <Item v-for="(item, index) in dailyList" 
                :key="index" 
                :itemData="item" 
                @click.native="handleClick(item.id)">
          </Item>
        </template>

      </div>
      <!-- 文章内容 -->
      <daily-article :id="articleId"></daily-article>
    </div>
  </div>
</template>

<script>
  // import $ from './libs/util';
  // import ajax from './libs/ajax';
  import times from './libs/times';
  import Item from './components/item.vue';
  import dailyArticle from './components/daily-article.vue';

  export default {
    name: 'App',
    data() {
      return {
        themes: [], //主题日报子类列表
        showThemes: false, //是否展示子类
        type: 'recommend', //每日推荐或者主题日报
        dailyList: [], //主题日报子类内容列表
        themeId: 0, //主题日报当前Id
        recommendList: [], //每日推荐内容列表
        dailyTime: times.getTodayTime(), //获取今日时间戳
        isLoading: false,
        articleId: 0
      }
    },
    methods: {
      getThemes() {
        /* $.ajax.get('themes')
          .then(res => {
            console.log('1');
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          }); */
        this.$axios.get('themes')
          .then(res => {
            // console.log(res);
            this.themes = res.data.dailyList;
            // console.log(this.themes);
          })
          .catch(error => {
            console.log(error);
          });
        /* ajax.get('themes')
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          }); */
      },
      handleToTheme(id) {
        //主题日报
        // console.log(id);
        let dailyId = id;
        this.type = 'daily';
        this.themeId = dailyId;
        this.dailyList = [];
        this.$axios.get('stories?' + dailyId).then(res => {
          // console.log(res);
          this.dailyList = res.data.stories.filter(item => item.type !== 1);
          console.log(this.dailyList);
        })
      },
      handleToRecommend() {
        //每日推荐
        this.type = 'recommend';
        this.recommendList = [];
        this.dailyTime = times.getTodayTime();
        this.getRrcommendList();
      },
      getRrcommendList() {
        //推荐列表
        this.isLoading = true; //加载时设置为true，加载完成后设置为false
        const prevDay = times.prevDay(this.dailyTime + 864000000);
        // console.log(prevDay);
        this.$axios.get('news/before?' + prevDay).then(res => {
          // console.log(res);
          this.recommendList.push(res.data);
          // console.log(this.recommendList);
          this.isLoading = false;
        })
      },
      handleClick(id) {
        console.log('点击事件触发！！！');
        console.log(id);
        
        this.articleId = id;
      }
    },
    mounted() {
      this.getRrcommendList();
      this.getThemes();
      //获取中栏DOM

      const $listWrap = this.$refs.listWrap;
      //监听中栏的滚动事件
      $listWrap.addEventListener('scroll', () => {
        //在主题日报或者正在加载推荐列表时停止操作
        if (this.type === 'daily' || this.isLoading) return;
        //已经滚动的距离加上页面的高度 == 整个内容区域的高度时，视为滚到到底部了
        if ($listWrap.scrollTop + document.body.clientHeight >= $listWrap.scrollHeight) {
          //时间相对减少一天
          this.dailyTime -= 86400000;
          this.getRrcommendList();
        }
      });
    },
    components: {
      Item,
      dailyArticle,
    },
  }

</script>

<style>

</style>
