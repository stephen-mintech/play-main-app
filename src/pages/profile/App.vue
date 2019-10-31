<template>
   <div id="app" v-if="ready">
      <Profile />
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import Profile from './components/Profile';

export default {
	name: 'App',
	components: {
		Profile
	},
	data() {
      return {
         name: 'Profile',
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
