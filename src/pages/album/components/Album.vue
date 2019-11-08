<template>
	<div class="page-content nav-content">
      <van-nav-bar :title="currentPage.meta.title" fixed left-arrow @click-left="goBack" />
      <div>
         <van-grid :border="false" :column-num="3">
            <van-grid-item v-for="(item, index) in list" :key="index">
               <van-image :src="item.src" />
            </van-grid-item>
         </van-grid>
      </div>
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { NavBar, Grid, GridItem, Image } from 'vant';
Vue.use(NavBar).use(Grid).use(GridItem).use(Image);

import Spacer from '@/components/Spacer';

export default {
   name: 'Album',
   components: {
      Spacer
	},
   data() {
      return {
         list: [{
            src: 'https://img.yzcdn.cn/vant/apple-1.jpg',
         },
         {
            src: 'https://img.yzcdn.cn/vant/apple-2.jpg',
         },
         {
            src: 'https://img.yzcdn.cn/vant/apple-3.jpg',
         },
         {
            src: 'https://img.yzcdn.cn/vant/apple-2.jpg',
         }]
      };
   },
   computed: {
      ...mapState({
         currentPage: state => state.app.currentPage
      }),
   },
   mounted() {
      this.$nextTick(() => {
         this.init();
      });
   },
   methods: {
      init() {
         return require('@/assets/img/coin.png')
      },
      fetchData() {
         let src = `static/images/avatars/${model.Avatar}`;
         return `background-image: url(${src})`;
      },
      explain() {

      },
      goBack() {
			mui.back();
      },
   }
};
</script>

<style scoped>
</style>

