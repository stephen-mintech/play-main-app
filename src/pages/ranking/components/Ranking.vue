<template>
	<div class="page-content">
		Ranking
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PageManager from 'page-manager';
import { GO_TO_PAGE } from '@/store/actions.type';

export default {
   name: 'Ranking',
   components: {
		
	},
   data() {
      return {
         
      };
   },
   computed: {
      
   },
   created() {
      
   },
   mounted() {
      this.$nextTick(() => {
         this.init();
      });
   },
   methods: {
      init() {
         
      }
   }
};
</script>
