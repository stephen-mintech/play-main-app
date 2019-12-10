import { IS_PLUS } from '@/config';
import Jwt from '@/common/jwt';
import { PLUS_READY, CHECK_AUTH, INIT, GO_TO_PAGE,
   REFRESH_TOKEN, SOCKET_CONNECTING, SOCKET_CONNECTED,
   BBIM_MESSAGE, ACTIVE_WEBVIEW, UN_ACTIVE_WEBVIEW 
} from '@/store/actions.type';
import { SET_INIT_COMPLETED } from '@/store/mutations.type';
import { FOR_ALL, GUEST_ONLY, USER_ONLY, ADMIN_ONLY } from '@/routes/route.type';
import { APP_NAME, APP_UI } from '@/config';

import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);

const config = {
   statusbar: APP_UI.statusbarColor,
};



const setStatusBarBg = (color, style) => {
   // 设置系统状态栏背景
   plus.navigator.setStatusBarBackground(color || config.statusbar);
   //plus.navigator.setStatusBarStyle(style || 'light');
}

export const onPageCreated = (vm) => {
   if(IS_PLUS){
      if(!Utils.isPlus())  throw new Error('Plus Not Found');
   }

   let page = Routes.findPage(vm.name);
   if(!page) Utils.pageNotFound(vm.name);

   vm.$store.commit(SET_INIT_COMPLETED, false);

   if(IS_PLUS) {
      if(vm.$store.getters.plusReady){
         checkAuthHandler(vm, page);
      }else {
         mui.plusReady(() => {
            vm.$store.dispatch(PLUS_READY);
   
            checkAuthHandler(vm, page);
            
         });
      }
   }else {
      checkAuthHandler(vm, page);
   }

   
}

const checkAuthHandler = (vm, page) => {
   
   vm.$store.dispatch(CHECK_AUTH)
   .then(user => {
      let pageType = Routes.getRouteType(page);
      let needAuth = pageType === USER_ONLY;
		let guestOnly = pageType === GUEST_ONLY;
      let forAll = pageType === FOR_ALL;

      if(user) {
         //有token
			let tokenStatus = Jwt.tokenStatus();
			if(tokenStatus === -1) {
				//token過期
				if(forAll) next(vm, page);
				else refreshToken(vm, page);

			}else if(tokenStatus === 0) {
				//token 即將到期
				if(forAll) next(vm, page);
				else if(guestOnly) redirect(vm, { name: 'home' });
				else refreshToken(vm, page);

			}else {
				//token正常
				if(guestOnly) redirect(vm, { name: 'home' });
				else next(vm, page);
			} 	
			
		}else{
         //沒有token
			if(needAuth){
            //需要驗證, 導入login
            redirect(vm, { name: 'login' }, { returnPage: page});
			}
			else{
				next(vm, page);
			} 
		}
   });
}

const next = (vm, page) => {
   //初始化頁面, 進入此階段表示user已通過驗証
   vm.$store.dispatch(INIT, page);
}

const redirect = (vm, page, params = {}) => {
   vm.$store.dispatch(GO_TO_PAGE, page, params);
}

const refreshToken = (vm, page) => {
   vm.$store
   .dispatch(REFRESH_TOKEN)
   .then(() => {
      next(vm, page);
   }).catch(error => {
      console.log(error);
      redirect(vm, { name: 'login' }, { returnPage: page });
   })
}




export const pageEventHandler = (vm, e) => {

   let name = e.detail.name;
   console.log('name', name);
   if(name === ACTIVE_WEBVIEW) {
      vm.init(true);
   }else if(name === UN_ACTIVE_WEBVIEW) {
      vm.init(false);
   }else if(name === BBIM_MESSAGE) {
      console.log('BBIM_MESSAGE in global');
      let data = e.detail.data;
      vm.$store.dispatch(data.key, data.data); 
      
   }else if(name === SOCKET_CONNECTING) {
      vm.$store.dispatch(SOCKET_CONNECTING);
      Toast.loading({
         duration: 0,
         message: '伺服器連線中',
         forbidClick: true
       });
   }else if(name === SOCKET_CONNECTED) {
      vm.$store.dispatch(SOCKET_CONNECTED);
      Toast.clear();
   }else {
   
      console.log('unhadled event');
   }

}