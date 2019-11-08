<template>
   <div id="app" v-if="ready">
		<Ranking />
		<MFooter v-if="!isPlus" />
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { PLUS_READY, GO_TO_PAGE } from '@/store/actions.type';
import Ranking from './components/Ranking';
import MFooter from '@/components/FootTab';

export default {
	name: 'App',
	components: {
		Ranking,
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
         name: 'ranking'
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
