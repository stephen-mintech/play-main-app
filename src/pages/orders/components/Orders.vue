<template>
   <div class="page-content nav-content">
      <van-nav-bar :title="currentPage.meta.title" fixed left-arrow @click-left="goBack" />
      <van-tabs @click="onTabClick">
         <van-tab title="我的下單">

         </van-tab>
         <van-tab title="接單列表">
            
         </van-tab>
      </van-tabs>
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { GO_BACK } from '@/store/actions.type';
import { NavBar, Tab, Tabs } from 'vant';

Vue.use(NavBar).use(Tab).use(Tabs);

export default {
   name: 'Orders',
   data() {
      return {
         name: 'Orders'
      };
   },
   computed: {
      ...mapGetters(['currentPage'])
   },
   methods: {
      init() {
         
      },
      onTabClick() {
         console.log('onTabClick');
      },
      goBack() {
			this.$store.dispatch(GO_BACK);
      }
   }
}
</script>


<style lang="scss" scoped>
.van-tabs.van-tabs--line {
    padding-top : 3px;
}

</style>