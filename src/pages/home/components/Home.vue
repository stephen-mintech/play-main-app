<template>
   <div class="page-content">
      <HomeMenu style="margin:2px;padding-top:1px" :menu_items="homeMenuItems" @selected="onMenuSelected" />
      <Loading v-if="loading" />
      <div v-else>
         <HomeSlideList v-for="(item, index) in categories" :key="index"
            :category="item" :partners="item.partners"
            @more="onCategorySelected"
         />
      </div>
      
	</div>
   
   
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { FETCH_PARTNERS, GET_CATEGORY, OPEN_CHILD_PAGE, BBIM_ACTION, CLOSE_SOCKET } from '@/store/actions.type';


import Loading from '@/components/Loading';
import HomeMenu from '@/components/home/Menu';
import HomeSlideList from '@/components/home/SlideList';

export default {
   name: 'Home',
   components: {
      HomeMenu,
      HomeSlideList,
      Loading
	},
   data() {
      return {
         name: 'home',
         categories: [],
         newsRefreshId: 'news-pull-refresh',
         news: []
         
      };
   },
   computed: {
      ...mapState({
         partnersList: state => state.partners.list
      }),
      ...mapGetters(['page', 'isPlus', 'homeMenuItems', 'loading', 'subPages']),
      newsRefreshElementId() {
         return getElementId(this.newsRefreshId);
      }
   },
   beforeMount() {
      console.log('beforeMount');
      // this.categories.forEach(item => {
      //    for(let i=0; i<20; i++){
      //       item.partners.push({
      //          Name: '阿鵝',
      //          Age: 20,
      //          Gender: 'G',
      //          Rate: 4.5,
      //          Online: true,
      //          Photo: '8.jpg',
      //          Color: '',
      //          OrderTimes: 78,
      //          Fee: 100,
      //          Unit: '1小時',
      //          Title: '聊天大師'
      //       });
      //    }
      // });
   },
   mounted() {
      console.log('mounted');
      this.$nextTick(() => {
         this.init();
      });
   },
   methods: {
      init() {
         
         // this.$store.dispatch(BBIM_ACTION, this.page, 'getBankInfo', '', (res) => {
         //    console.log('res', res);
         // });

         //this.$store.dispatch(BBIM_ACTION, this.page, 'getBankInfo', '', null);

         this.fetchData();
      },
      fetchData() {
         this.categories = this.homeMenuItems.slice(0);

         this.$store.dispatch(FETCH_PARTNERS)
			.then(() => {
				this.loadPartners();
			})
			.catch(error => {
				console.error(error);
         })
         .finally(() => {
            //mui(this.newsRefreshElementId).pullRefresh().endPulldownToRefresh();
         })
      },
      loadPartners() {
         this.categories.forEach(category => {
            let partners = this.partnersList.filter(partner => partner.CategoryIds.includes(category.id));
            category.partners = partners;
         })
      },
      onMenuSelected(item) {
         this.onCategorySelected(item);         
      },
      onCategorySelected(category) {
         this.$store.dispatch(CLOSE_SOCKET);//for test
         //this.$store.dispatch(OPEN_CHILD_PAGE, { name: 'demo' }, { id: 3});
      }
   }
};
</script>
