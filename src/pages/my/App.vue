<template>
   <div id="app" v-if="ready">
      <My />
      <MFooter v-if="!isPlus" />
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { PLUS_READY, PRE_LOAD } from '@/store/actions.type';
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
         name: 'my'
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
      Bus.$on(PLUS_READY, () => {
			this.$store.dispatch(PRE_LOAD);
		});
   }
   
};
</script>

<style lang="scss">
@import "@/assets/scss/base.scss";
</style>
