<template>
	<div id="app" v-if="ready">
		<Home />
      <MFooter v-if="!isPlus" />
	</div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import { PAGE_EVENT, ACTIVE_WEBVIEW } from '@/store/actions.type';
import { isPlus } from '@/utils';

import Home from './components/Home';
import MFooter from '@/components/FootTab';

export default {
	name: 'App',
	components: {
      Home,
      MFooter
	},
	data() {
      return {
         name: 'home',
         isPlus: isPlus(),
         active: false
      };
   },
   computed: {
      ...mapGetters(['initComplete']),
      ready() {
         return this.active && this.initComplete;
      }
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
      init() {
         this.active = true;
         Utils.onPageCreated(this);
      }
	}
};
</script>


<style lang="scss">
@import "@/assets/scss/base.scss";
</style>
