<template>
   <div id="app" v-if="ready">
		<Notices />
		<MFooter v-if="!isPlus" />
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PageManager from 'page-manager';

import Notices from './components/Notices';
import MFooter from '@/components/FootTab';

export default {
	name: 'App',
	components: {
		Notices,
		MFooter
	},
	computed: {
      ...mapGetters(['isPlus'])
	},
	data() {
      return {
         name: 'notices',
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
