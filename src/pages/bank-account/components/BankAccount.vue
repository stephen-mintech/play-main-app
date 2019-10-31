<template>
	<div class="page-content nav-content">
      <van-nav-bar :title="currentPage.meta.title" fixed left-arrow @click-left="goBack" />
      <div>
         <div class="text-right margin-10">
            <van-button plain round type="primary">新增</van-button>
         </div>
         <van-panel title="綁定銀行帳戶列表">
            <BackAccountItem v-for="(item, index) in list" :key="index" 
               :model="item" 
            />
         </van-panel>
         
      </div>
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { NavBar, Button, Panel } from 'vant';
Vue.use(NavBar).use(Button).use(Panel);

import BackAccountItem from '@/components/bank-account/Item';

export default {
   name: 'BankAccount',
   components: {
		BackAccountItem
	},
   data() {
      return {
         list: [{
            isDefault:true,
         },
         {
            isDefault:false,
         }]
      };
   },
   computed: {
      ...mapState({
         currentPage: state => state.app.currentPage
      }),
   },
   mounted() {
      this.$nextTick(() => {
         this.init();
      });
   },
   methods: {
      init() {
         
      },
      fetchData() {
         
      },
      goBack() {
			mui.back();
      },
   }
};
</script>

