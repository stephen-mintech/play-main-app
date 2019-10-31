<template>
   <div id="app" v-if="ready">
      <Settings />
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import Settings from './components/Settings';
import MFooter from '@/components/FootTab';

export default {
	name: 'App',
	components: {
		Settings,
		MFooter
	},
	data() {
      return {
         name: 'settings',
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
