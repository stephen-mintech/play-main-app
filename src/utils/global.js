import { CHECK_AUTH, INIT } from '@/store/actions.type';

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