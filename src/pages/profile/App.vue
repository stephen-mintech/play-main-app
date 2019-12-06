<template>
	<div id="app" v-if="initCompleted">
		<Profile />
      <MFooter v-if="!isPlus" />
	</div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import { PAGE_EVENT } from '@/store/actions.type';

import Profile from './components/Profile';
import MFooter from '@/components/FootTab';

export default {
	name: 'App',
	components: {
      Profile,
      MFooter
	},
	data() {
      return {
         name: 'profile'
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
