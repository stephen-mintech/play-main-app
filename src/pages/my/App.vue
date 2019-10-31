<template>
   <div id="app" v-if="ready">
      <My />
      <MFooter v-if="!isPlus" />
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import My from './components/My';
import MFooter from '@/components/FootTab';

export default {
	name: 'App',
	components: {
		My,
		MFooter
	},
	data() {
      return {
         name: 'my',
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
