<template>
	<div class="page-content">
      Chat
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PageManager from 'page-manager';
import mui from 'mui';
import { log } from '@/utils';

import ChatItem from '@/components/chat/Item';
import { NavBar, Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);

export default {
   name: 'Chat',
   components: {
		NewsItem
	},
   data() {
      return {
         
      };
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
         
         this.fetchData();
      },
      fetchData() {
         
      }
   }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/var';
.van-tabs.van-tabs--line {
   padding-top: $padding-main;
}
</style>

