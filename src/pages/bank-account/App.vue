<template>
   <div id="app" v-if="ready">
      <BankAccount />
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import BankAccount from './components/BankAccount';

export default {
	name: 'App',
	components: {
		BankAccount
	},
	data() {
      return {
         name: 'bank-account',
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
