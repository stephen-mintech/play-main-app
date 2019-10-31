<template>
	<div class="page-content" style="height:686px">
      <div class="hdbg" style="height: 20%;position: relative;">
         <Spacer :height="20" />
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
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { Row, Col } from 'vant';
Vue.use(Row).use(Col);

import Spacer from '@/components/Spacer'; 

export default {
   name: 'Wallet',
   components: {
      Spacer
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

