<template>
   <div class="page-content nav-content">
      <van-nav-bar :title="page.meta.title" fixed left-arrow @click-left="goBack" />
      <div v-if="ready">
         <div>
            <h2 class="block-title">必須綁定手機與銀行帳戶</h2>
            <van-cell-group>
               <!-- <van-cell v-if="phoneConfirmed"  title="手機號碼已綁定"
                  title-class="van-field__label main-title text-success"
                  icon="passed"
               />
               <van-cell v-else title="請先綁定手機號碼" value="前往" is-link 
                  title-class="van-field__label main-title text-error"
                  value-class="text-link" icon="location-o"
                  @click="bindPhone"
               /> -->

               <van-cell title="請先綁定手機號碼" value="前往" is-link 
                  title-class="van-field__label main-title text-error"
                  value-class="text-link" 
                  @click="bindPhone"
               />


               <!-- <van-cell v-if="bankOK" title="銀行帳戶已綁定"
                  title-class="van-field__label main-title text-success"
                  icon="passed"
               />
               <van-cell v-else title="請先綁定銀行帳戶" value="前往" is-link 
                  title-class="van-field__label main-title text-error"
                  value-class="text-link"
                  @click="bindBank"
               /> -->

               <van-cell title="請先綁定銀行帳戶" value="前往" is-link 
                  title-class="van-field__label main-title text-error"
                  value-class="text-link"
                  @click="bindBank"
               />
               
            </van-cell-group>
         </div> 
      </div>
      <Loading v-else />  
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { GO_BACK, FETCH_BANK_INFOES, TO_BIND_PHONE_PAGE,
   BANK_INFOES_FETCHED
} from '@/store/actions.type';
import { NavBar, Cell, CellGroup } from 'vant';
Vue.use(NavBar).use(CellGroup).use(Cell);

import Loading from '@/components/Loading';

export default {
   name: 'JoinPartner',
   components: {
      Loading
	},
   data() {
      return {
         name: 'JoinPartner',
         fetching: {
            bankInfoes: false
         },
         
         bankOK: false
      };
   },
   computed: {
      ...mapGetters(['page', 'currentUser', 'phoneConfirmed']),
      ...mapState({
			bankInfoList: state => state.bank.infoList
		}),
      ready() {
         if(this.fetching.bankInfoes) return false;
         return true;
      },
      canJoin() {
         return this.phoneConfirmed && this.bankOK;
      }
   },
   created() {
      Bus.$on(BANK_INFOES_FETCHED, () => {
         this.fetching.bankInfoes = false;
         this.bankOK = this.bankInfoList.length > 0;
         this.onReady();
		});
   },
   mounted() {
      this.$nextTick(() => {
         this.init();
      });
   },
   methods: {
      init() {
         this.fetchBankInfoes();
      },
      fetchBankInfoes() {
         this.fetching.bankInfoes = true;
         this.$store.dispatch(FETCH_BANK_INFOES, this.page);
      },
      onReady() {
         if(this.canJoin) alert('go to skill manage');
      },
      bindPhone() {
         alert('bindPhone');
         this.$store.dispatch(TO_BIND_PHONE_PAGE);
      },
      bindBank() {
         alert('bindBank');
      },
      goBack() {
			this.$store.dispatch(GO_BACK);
      }
   }
}
</script>


<style lang="scss" scoped>


</style>