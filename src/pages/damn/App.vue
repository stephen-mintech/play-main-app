<template>
	<div id="app" v-if="ready">
		<Damn />
      <MFooter v-if="!isPlus" />
	</div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import { PAGE_EVENT, ACTIVE_WEBVIEW } from '@/store/actions.type';
import { isPlus } from '@/utils';

import Damn from './components/Damn';
import MFooter from '@/components/FootTab';

export default {
	name: 'App',
	components: {
      Damn,
      MFooter
	},
	data() {
      return {
         name: 'damn',
         isPlus: isPlus(),
         active: false
      };
   },
   computed: {
      ...mapGetters(['initCompleted']),
      ready() {
         return this.active && this.initCompleted;
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
