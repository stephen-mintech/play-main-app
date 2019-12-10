<template>
	<div class="page-content nav-content">
      <van-nav-bar :title="page.meta.title" fixed left-arrow @click-left="goBack" />
      <div>
         <div class="text-right margin-10">
            <van-button plain round type="primary" @click="add">
               新增
            </van-button>
         </div>
         <van-panel title="綁定銀行帳戶列表">
            <BackAccountItem v-for="(item, index) in list" :key="index" 
               :model="item" 
            />
         </van-panel>
         
      </div>
      
      <van-overlay :show="editting">
         <div class="overlay-content-wrapper">
            <BackAccountEdit :model="model"
               @cancel="cancelEdit"
            />
         </div>
      </van-overlay>
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { FETCH_BANK_INFOES, BANK_INFOES_FETCHED, GO_BACK } from '@/store/actions.type';

import { NavBar, Button, Panel, Overlay } from 'vant';
Vue.use(NavBar).use(Button).use(Panel).use(Overlay);

import BackAccountItem from '@/components/bank-account/Item';
import BackAccountEdit from '@/components/bank-account/Edit';

export default {
   name: 'BankAccount',
   components: {
      BackAccountItem,
      BackAccountEdit
	},
   data() {
      return {
         editting: false,
         model: {
            Branch: '',
            Name: '',
            Number: '',
            VCode: ''
         },
         list: [{
            isDefault:true,
         },
         {
            isDefault:false,
         }]
      };
   },
   computed: {
      ...mapGetters(['page', 'currentUser', 'phoneConfirmed']),
   },
   created() {
      Bus.$on(BANK_INFOES_FETCHED, () => {
			console.log(BANK_INFOES_FETCHED, 'bus');
		});
   },
   mounted() {
      this.$nextTick(() => {
         this.init();
      });
   },
   methods: {
      init() {
         
         this.fetchData();
      },
      fetchData() {
         this.$store.dispatch(FETCH_BANK_INFOES, this.page);
      },
      add() {
         this.editting = true;
      },
      cancelEdit() {
         this.editting = false;
      },
      goBack() {
			this.$store.dispatch(GO_BACK);
      },
   }
};
</script>


