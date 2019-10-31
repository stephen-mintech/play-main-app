<template>
   <div id="app" v-if="ready">
		<Ranking />
		<MFooter v-if="!isPlus" />
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PageManager from 'page-manager';

import Ranking from './components/Ranking';
import MFooter from '@/components/FootTab';

export default {
	name: 'App',
	components: {
		Ranking,
		MFooter
	},
	computed: {
      ...mapGetters(['isPlus'])
	},
	data() {
      return {
         name: 'ranking',
         ready: false
      };
   },
	created() {
      Utils.onPageCreated(this, this.isPlus);
   },
};
</script>

<style lang="scss">
@import "@/assets/scss/base.scss";
</style>
