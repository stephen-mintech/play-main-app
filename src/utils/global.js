import { CHECK_AUTH, INIT } from '@/store/actions.type';
import PageManager from 'page-manager';

export const onPageCreated = (vm, isPlus) => {
   if(isPlus) {
      vm.ready = true;
      PageManager.plusReady(() => {
         if(vm.isPlus) {
            let subPages = Routes.getSubPages(vm.name);
            PageManager.preLoad(subPages);
         }
      })
   }else {
      let page = Routes.findPage(vm.name);
      if(!page) Utils.pageNotFound(vm.name);

      vm.$store.dispatch(CHECK_AUTH, page)
      .then(result => {
         console.log('result', result);
         if(result.auth) {
            vm.$store.dispatch(INIT, { page, user: result.user });
            vm.ready = true;
         }
         else throw new Error('權限不足');
      })
      .catch(error => {
         console.log(error);
      })
   }
}