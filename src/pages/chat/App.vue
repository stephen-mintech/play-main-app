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
         name: 'chat',
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
