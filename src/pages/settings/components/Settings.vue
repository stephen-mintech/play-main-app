<template>
	<div class="page-content nav-content">
      <van-nav-bar :title="currentPage.meta.title" fixed left-arrow @click-left="goBack" />
      <div>
         <Spacer />
         <h2 class="block-title">上線狀態</h2>
         <van-cell-group>
            <van-cell title="下線" title-class="van-field__label main-title" style="align-items: center;">
               <van-switch v-model="model.offline" />
            </van-cell>
         </van-cell-group>

         <Spacer />
         <h2 class="block-title">上線狀態</h2>
         <van-cell-group>
            <van-cell title="隱身榜單" title-class="van-field__label main-title" style="align-items: center;">
               <van-switch v-model="model.hide" />
            </van-cell>
         </van-cell-group>

         <Spacer />
         <h2 class="block-title">主題樣式</h2>
         <van-cell-group>
            <van-cell title-class="van-field__label main-title" >
               <van-radio-group v-model="radio">
                  <van-radio name="1" class="main-title">桃紅版面</van-radio>
                  <Spacer />
                  <van-radio name="2" class="main-title">天藍版面</van-radio>
               </van-radio-group>
            </van-cell>
         </van-cell-group>

         <Spacer />
         <h2 class="block-title">系統</h2>
         <van-cell-group>
            <van-cell title="清除快取" title-class="van-field__label main-title" is-link>
               23.16MB
            </van-cell>
            <van-cell title="版本號" title-class="van-field__label main-title">
               851
            </van-cell>
         </van-cell-group>
      </div>
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { NavBar, Cell, CellGroup, Switch, RadioGroup, Radio } from 'vant';
Vue.use(NavBar).use(CellGroup).use(Cell).use(Switch).use(RadioGroup).use(Radio);

import Spacer from '@/components/Spacer';

export default {
   name: 'Settings',
   components: {
		Spacer
	},
   data() {
      return {
         model: {
            offline: false,
            hide: false,
            theme: 1
         },
         radio: '1'
      };
   },
   computed: {
      ...mapState({
         currentPage: state => state.app.currentPage
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
         
      },
      goBack() {
			mui.back();
      },
   }
};
</script>

