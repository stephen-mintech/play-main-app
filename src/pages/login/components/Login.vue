<template>
<div class="page-container bg-color-main">
   <MaskLoading :loading="loading" />
	<div class="bdbg login-content">
      <Spacer />
      <van-image width="100" style="margin-left: auto; margin-right: auto; display: block;"
         :src="require('@/assets/img/logo.png')"
      />
      <p style="text-align:center;line-height:10vh">
         <span style="padding-right:10px">仙人掌公園</span>     
         遇見懂您的傾聽師!
      </p>
      <a href="#">
         <van-image v-for="(item, index) in loginOptions" :key="index"
            width="85%" class="login-item" :src="item.image"
            @click.prevent="login(item)"
         />
      </a>
      <p style="padding-top: 20px;text-align:center;color:gray;font-size:10px">
         登入則表示同意仙人掌公園的
         <a href="#" class="text-blue">
            服務條款(EULA)
         </a>
      </p>
            
   </div>
</div>   
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { OAUTH_LOGIN, LOGIN, GO_TO_PAGE } from '@/store/actions.type';

import { Cell, CellGroup, Image, Toast } from 'vant';
Vue.use(Cell).use(CellGroup).use(Image).use(Toast);

import MaskLoading from '@/components/MaskLoading';
import Spacer from '@/components/Spacer';

export default {
   name: 'Login',
   components: {
      MaskLoading,
      Spacer
   },
   data() {
      return {

         loginOptions: [{
            id: 'fb', image: require('@/assets/img/fb_logo.png')
         },{
            id: 'google', image: require('@/assets/img/g_logo.png')
         },{
            id: 'line', image: require('@/assets/img/LINE.png')
         }]
         
      };
   },
   computed: {
      ...mapGetters(['loading'])
   },
   methods: {
      login(item) {
         let model = {
            key: '112041503553332005309',
            from: 'Google',
            uuid: ''
         };
         this.$store
         .dispatch(OAUTH_LOGIN, model)
         .then(status => {
            if(status) this.onLoginSuccess();
            else Toast.fail('登入失敗');
         }).catch(error => {
            console.log(error);
            Toast.fail('登入失敗');
         })
      },
      onLoginSuccess() {
         console.log('onLoginSuccess');
         this.$store.dispatch(GO_TO_PAGE,  { name: 'index' });
      }
   }
};
</script>

<style scoped>
.login-content {
   left : 50%;
   width : 90%;
   height : 80%;
   margin : 10% auto;
   border-radius : 0.5em;
   overflow-y : auto;
}

.login-item {
   margin-left : auto;
   margin-right : auto;
   display : block;
   padding-bottom: 20px
}


</style>

