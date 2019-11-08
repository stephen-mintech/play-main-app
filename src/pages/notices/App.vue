<template>
   <div id="app" v-if="ready">
		<Notices />
		<MFooter v-if="!isPlus" />
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { PLUS_READY, GO_TO_PAGE } from '@/store/actions.type';
import Notices from './components/Notices';
import MFooter from '@/components/FootTab';

export default {
	name: 'App',
	components: {
		Notices,
		MFooter
	},
	computed: {
      ...mapGetters(['isPlus', 'initComplete', 'plusReady']),
      ready() {
         if(this.isPlus) return this.plusReady;
         return this.initComplete;
      }
   },
	data() {
      return {
         name: 'notices'
      };
   },
	created() {
      Utils.onPageCreated(this);
   },
};
</script>

<style lang="scss">
@import "@/assets/scss/base.scss";
</style>
