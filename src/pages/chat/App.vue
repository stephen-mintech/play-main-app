<template>
   <div id="app">
		<Chat />
		<MFooter v-if="!isPlus" />
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { INIT } from '@/store/actions.type';

import Chat from './components/Chat';
import MFooter from '@/components/FootTab';

export default {
	name: 'App',
	components: {
		Chat,
		MFooter
	},
	computed: {
      ...mapGetters(['isPlus'])
	},
	data() {
      return {
         name: 'chat'
      };
   },
	created() {
      this.$store.dispatch(INIT);

      PageManager.plusReady(() => {
         if(this.isPlus) {
            let subPages = getSubPages(this.name);
            log(subPages, 'subPages');
            PageManager.preLoad(subPages);
         }
      })
   },
};
</script>

<style lang="scss">
@import "@/assets/scss/base.scss";
</style>
