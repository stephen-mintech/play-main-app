<template>
	<div class="page-content" style="height:686px">
      <div class="hdbg" style="height: 30%;position: relative;">
         <TopButton icon="fa fa-angle-left" position="left" id="back"
            @selected="goBack"
         />
         <TopButton icon="ion-ios-help-outline" position="right"
            @selected="explain"
         />
         
         <Spacer :height="40" />
         
         <van-row type="flex" justify="center" style="color: white;text-align: center;height: 80%;">
            <van-col span="6" >
               <div :style="`background-image: url(${require('@/assets/img/coin.png')});`" class="coin-container">
               </div>
               <div>
                  擁有仙人掌幣
                  <br>
                  <span>0</span>幣
               </div>
            </van-col>
            <van-col span="6" style="flex: 0 0 10%;margin-left:10px">
               <div class="trans-icon-container">
                  <i class="fa fa-2x fa-repeat"></i>
               </div>
            </van-col>
            <van-col span="6">
               <div :style="`background-image: url(${require('@/assets/img/diamond.png')});`" class="coin-container">               
               </div>
               <div>
                  擁有紅利
                  <br>
                  <span>0</span>點
                  <br>
               </div>
            </van-col>
         </van-row>
      </div>
      <div>
         <Spacer :height="20" />
         <van-cell-group>
            <van-cell :center="true" title="預估仙人掌幣收益" title-class="main-title" 
               label="本月預估仙人掌幣收益" value="0幣" value-class="text-deepskyblue text-main"
               size="large" 
            >
               <img slot="icon" style="width: 40px;margin-right:10px" :src="require('@/assets/img/diamond.png')" />
               
            </van-cell>
         </van-cell-group>
         <Spacer :height="20" />
         <van-cell-group>
            <van-cell :center="true" title="收禮輕單" title-class="main-title" is-link
               size="large" 
            >
               <img slot="icon" style="width: 40px;margin-right:10px" :src="require('@/assets/img/giftlist.png')" />
               
            </van-cell>
            <van-cell :center="true" title="我的體驗券" title-class="main-title" is-link
               size="large" 
            >
               <img slot="icon" style="width: 40px;margin-right:10px" :src="require('@/assets/img/ticket.png')" />
               <span class="badge">1</span>
            </van-cell>
            
         </van-cell-group>
         <Spacer :height="20" />
         <van-cell-group>
            <van-cell :center="true" title="儲值" title-class="main-title" is-link
               size="large" 
            >
               <img slot="icon" style="width: 40px;margin-right:10px" :src="require('@/assets/img/treasure.png')" />
               
            </van-cell>
            <van-cell :center="true" title="提款" title-class="main-title" is-link
               size="large" 
            >
               <img slot="icon" style="width: 40px;margin-right:10px" :src="require('@/assets/img/gold2.png')" />               
            </van-cell>
            
         </van-cell-group>
      </div>
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { Row, Col, CellGroup, Cell } from 'vant';
Vue.use(Row).use(Col).use(CellGroup).use(Cell);

import Spacer from '@/components/Spacer';
import TopButton from '@/components/TopButton';

export default {
   name: 'Wallet',
   components: {
      Spacer,
      TopButton
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
         return require('@/assets/img/coin.png')
      },
      fetchData() {
         let src = `static/images/avatars/${model.Avatar}`;
         return `background-image: url(${src})`;
      },
      explain() {

      },
      goBack() {
			mui.back();
      },
   }
};
</script>

<style scoped>
.trans-icon-container {
   position : relative;
   top : 50%;
   transform : translateY(-50%);
   color : limegreen;
   background-color : rgba(255, 255, 255, 0.4);
   padding : 3px 5px;
   border : 2px solid rgba(255, 255, 255, 0.6);
   border-radius : 10px;
}

.coin-container {
   width: 100%;
   height: 50%;
   background-repeat: no-repeat;
   background-size: auto 100%;
   background-position: center center;
}
</style>

