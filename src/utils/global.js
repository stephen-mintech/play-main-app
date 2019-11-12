import { CHECK_AUTH, INIT, ACTIVE_WEBVIEW, UN_ACTIVE_WEBVIEW } from '@/store/actions.type';

export const onPageCreated = (vm) => {

   let page = Routes.findPage(vm.name);
   if(!page) Utils.pageNotFound(vm.name);

   vm.$store.dispatch(CHECK_AUTH, page)
   .then(result => {
      console.log('result', result);
      if(result.auth) {
         vm.$store.dispatch(INIT, { user: result.user, page });
      }
      else throw new Error('權限不足');
   })
   .catch(error => {
      console.log(error);
   })
}


export const pageEventHandler = (vm, e) => {
   console.log('pageEventHandler');
   console.log('pageName', e.detail.pageName);
   console.log('vm.name', vm.name);

   console.log('name', e.detail.name);

   let pageName = e.detail.pageName;
   // 只處理發佈給此頁面的事件
   if(pageName !== vm.name) return;


   let name = e.detail.name;
   if(name === ACTIVE_WEBVIEW) {
      vm.init();
   }else if(name === UN_ACTIVE_WEBVIEW) {
      vm.active = false;
   } 
   else vm.$store.dispatch(name, e.detail.data);

}