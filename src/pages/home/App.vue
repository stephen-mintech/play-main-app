<template>
	<div id="app" v-if="ready">
		<Home />
      <MFooter v-if="!isPlus" />
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import Home from './components/Home';
import MFooter from '@/components/FootTab';

export default {
	name: 'App',
	components: {
      Home,
      MFooter
	},
	computed: {
      ...mapGetters(['isPlus'])
   },
	data() {
      return {
         name: 'home',
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
