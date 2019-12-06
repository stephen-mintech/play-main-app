<template>
	<div class="page-content">
      <div class="news-add-container">
         <NewsAdd />
      </div>
      
      <van-tabs v-model="active" @change="onTabChanged">
         <van-tab name="latest" title="最新">
            <NewsItem v-for="(item,index) in newsList" :model="item" :key="index"
               @selected="onSelected"
            />
         </van-tab>
         <van-tab name="focus" title="關注">
            <NewsItem v-for="(item,index) in focusNewsList" :model="item" :key="index"
               @selected="onSelected"
            />
         </van-tab>
         <van-tab name="my" title="我的">
            <NewsItem v-for="(item,index) in myNewsList" :model="item" :key="index"
               @selected="onSelected"
            />
         </van-tab>
      </van-tabs>
      <!-- <div>
         <ul class="list" v-if="newsList.length">
            <ArticleItem v-for="(item,index) in newsList" :model="item" :key="index"
               @selected="onSelected"
            />
         </ul>
      </div> -->
      <!-- <div :id="newsRefreshId" class="mui-content mui-scroll-wrapper">
         <div :class="{ 'mui-scroll': true, 'broswer-content': !isPlus }" id="homeScroller" ref="scrollContent">
            <ul class="list" v-if="newsList.length">
               <ArticleItem v-for="(item,index) in newsList" :model="item" :key="index"
                  @selected="onSelected"
               />
            </ul>
         </div>
      </div> -->
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { FETCH_NEWS, GET_NEWS } from '@/store/actions.type';
import mui from 'mui';

import NewsAdd from '@/components/news/Add';
import NewsItem from '@/components/news/Item';
import { NavBar, Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);

// import { PULL_REFRESH_UI } from '@/config';
// import { buildQuery, getElementId, log } from '@/utils';

// import { NavBar } from 'vant';
// Vue.use(NavBar);

export default {
   name: 'News',
   components: {
      NewsAdd,
      NewsItem
	},
   data() {
      return {
         active: 0,
         focusNewsList: [],
         myNewsList: [],
      };
   },
   computed: {
      ...mapState({
			newsList: state => state.news.list
      }),
   },
   created() {
      
   },
   mounted() {
      this.$nextTick(() => {
         this.init();
      });
   },
   methods: {
      init() {
         // mui.init({
         //    pullRefresh: {
         //       container: this.newsRefreshElementId,
         //       down: { ... PULL_REFRESH_UI,
         //          callback: this.pullDownRefresh
         //       }
         //    }
         // });
         this.fetchData();
      },
      fetchData() {
         this.$store.dispatch(FETCH_NEWS, this.params)
			.then(() => {
				console.log(this.newsList);
			})
			.catch(error => {
				console.error('has-error:',error);
         })
         .finally(() => {
            //mui(this.newsRefreshElementId).pullRefresh().endPulldownToRefresh();
         })
      },
      onTabChanged(name) {
         if(this.focusNewsList.length) return;

         for(let i = this.newsList.length - 1; i >= 0; i--){
            let item = { ...this.newsList[i] };
            if((i % 2) === 0) this.myNewsList.push(item);
            else this.focusNewsList.push(item);
         }
      },
      pullDownRefresh() {
         this.fetchData();
      },
      update() {
         console.log('update');
         this.fetchData();
      },
      onSelected(item) {
         let view = 'article';
         // 两种传参方式用于非plus/plus环境
         PageManager.invoke(view, 'event_update', { id: item._id });
         
         setTimeout(() => {
            let url = buildQuery(`${view}.html`, { id: item._id });
            PageManager.openWindow(url);
         }, 150)
      }
   }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/var';

.news-add-container {
   padding-top : 5px;
   width : 100%;
   position : absolute;
   left : 0px;
   height : 40px;
   z-index: 5;
}

.van-tabs.van-tabs--line {
   padding-top: $padding-nav;
}
</style>

