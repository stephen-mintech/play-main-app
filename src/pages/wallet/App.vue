<template>
   <div id="app" v-if="ready">
      <Wallet />
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import Wallet from './components/Wallet';

export default {
	name: 'App',
	components: {
		Wallet
	},
	data() {
      return {
         name: 'wallet',
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

<style lang="scss" >
@import "@/assets/scss/var";
@import "@/assets/scss/common";
@import "@/assets/scss/base.scss";
html,
body {
  background: #dddddd;
  height: 100%;
}

#app,
.page-content {
  background: #dddddd;
  min-height: 100%;
}
</style>