<template>
   <div id="app" v-if="ready">
      <News />
      <MFooter v-if="!isPlus" />
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

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
         name: 'news',
         ready: false
      };
   },
   computed: {
		...mapGetters(['isPlus'])
   },
	created() {
      Utils.onPageCreated(this, this.isPlus);
      
   },
   methods: {
      
   }
   
};
</script>

<style lang="scss">
@import "@/assets/scss/base.scss";
</style>
