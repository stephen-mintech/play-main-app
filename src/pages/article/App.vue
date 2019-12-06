<template>
	<div id="app" v-if="initCompleted">
		<Article />
      <MFooter v-if="!isPlus" />
	</div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import { PAGE_EVENT } from '@/store/actions.type';

import Article from './components/Article';
import MFooter from '@/components/FootTab';

export default {
	name: 'App',
	components: {
      Article,
      MFooter
	},
	data() {
      return {
         name: 'article'
      };
   },
   computed: {
      ...mapGetters(['initCompleted', 'isPlus'])
   },
	created() {
      if(this.isPlus) {
         window.addEventListener(PAGE_EVENT, this.pageEventHandler);
      }else {
         this.init();
      }
   },
   methods: {
		pageEventHandler(e) {
         Utils.pageEventHandler(this, e);
      },
      init(active = true) {
         if(active) Utils.onPageCreated(this);
      }
	}
};
</script>


<style lang="scss">
@import "@/assets/scss/base.scss";
</style>
