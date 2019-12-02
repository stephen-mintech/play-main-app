<template>
   <div class="page-content nav-content">
      <van-nav-bar :title="currentPage.meta.title" fixed left-arrow @click-left="goBack" />
      <div>
         <h2 class="block-title">必須綁定手機與銀行帳戶</h2>
         <van-cell-group>
            <van-cell title="請先綁定手機號碼" value="前往" is-link 
               title-class="van-field__label main-title text-error"
               value-class="text-link"
               @click="bindPhone"
            />
            <van-cell title="請先綁定銀行帳戶" value="前往" is-link 
               title-class="van-field__label main-title text-error"
               value-class="text-link"
            />
         </van-cell-group>
      </div>   
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { GO_BACK, TO_BIND_PHONE_PAGE } from '@/store/actions.type';
import { NavBar, Cell, CellGroup } from 'vant';

Vue.use(NavBar).use(CellGroup).use(Cell);

export default {
   name: 'JoinPartner',
   data() {
      return {
         name: 'JoinPartner'
      };
   },
   computed: {
      ...mapGetters(['currentPage'])
   },
   methods: {
      init() {
         
      },
      bindPhone() {
         this.$store.dispatch(TO_BIND_PHONE_PAGE);
      },
      goBack() {
			this.$store.dispatch(GO_BACK);
      }
   }
}
</script>


<style lang="scss" scoped>


</style>