<template>
	<div class="content nav-content">
      <div style="padding-top:10px; margin: 1px">
         <PartnersItem v-for="(item,index) in partnersList" :model="item" :key="index"
            :width="'50%'" @selected="onSelected"
         />
      </div>
      
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { FETCH_PARTNERS, GET_PARTNER } from '@/store/actions.type';
import PageManager from 'page-manager';
import mui from 'mui';
import { log } from '@/utils';

import PartnersItem from '@/components/partners/Item';

// import { PULL_REFRESH_UI } from '@/config';
// import { buildQuery, getElementId, log } from '@/utils';

// import { NavBar } from 'vant';
// Vue.use(NavBar);

export default {
   name: 'News',
   components: {
		PartnersItem
	},
   data() {
      return {
         containerStyle: {
            'width' : '45vw',
            'padding-left' : '2%',
            'display' : 'inline-block',
            'padding-bottom' : '10px',
            'position' : 'relative'
         }
      };
   },
   computed: {
      ...mapState({
         category: state => state.categories.category,
			partnersList: state => state.partners.list
      }),
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
         // mui.init({
         //    pullRefresh: {
         //       container: this.partnersRefreshElementId,
         //       down: { ... PULL_REFRESH_UI,
         //          callback: this.pullDownRefresh
         //       }
         //    }
         // });
         this.fetchData();
      },
      fetchData() {
         console.log('fetchData');
         this.$store.dispatch(FETCH_PARTNERS, { category:this.category.id })
			.then(() => {
				console.log(this.partnersList);
			})
			.catch(error => {
				console.error('has-error:',error);
         })
         .finally(() => {
            //mui(this.partnersRefreshElementId).pullRefresh().endPulldownToRefresh();
         })
      },
      onSelected(item) {
         
      },
      pullDownRefresh() {
         this.fetchData();
      },
      update() {
         console.log('update');
         this.fetchData();
      },
      onSelected(item) {
         
      }
   }
};
</script>


<style lang="scss" scoped>
@import "@/assets/scss/var";
@import "@/assets/scss/common";
.content {
  padding: 0 $padding-main 40px;
  font-size: 14px;
  color: $color-gray;
  line-height: 22px;
}

.nav-content {
  padding-top: 44px !important;
}

.title {
  font-size: 20px;
  color: #000;
  margin: 10px 0;
  line-height: 24px;
}
</style>

<style scoped>

.list-container::-webkit-scrollbar { 
  display: none;
}
.more {
   float : right;
   color :#576B95;
}

</style>

