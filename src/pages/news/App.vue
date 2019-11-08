<template>
   <div id="app" v-if="ready">
      <News />
      <MFooter v-if="!isPlus" />
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { PLUS_READY, GO_TO_PAGE } from '@/store/actions.type';
import News from './components/News';
import MFooter from '@/components/FootTab';

export default {
	name: 'App',
	components: {
		News,
		MFooter
	},
	data() {
      return {
         name: 'news'
      };
   },
   computed: {
      ...mapGetters(['isPlus', 'initComplete', 'plusReady']),
      ready() {
         if(this.isPlus) return this.plusReady;
         return this.initComplete;
      }
   },
	created() {
      Utils.onPageCreated(this);
      
   },
   methods: {
      
   }
   
};
</script>

<style lang="scss">
@import "@/assets/scss/base.scss";
</style>
