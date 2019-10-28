<template>
   <div style="text-align: center;">
      <van-loading :color="loadingUI.color" />
   </div>
</template>

<script>
import { LOADING_UI } from '@/config';
import { Loading } from 'vant';
Vue.use(Loading);

export default {
   name: 'Loading',
   data() {
      return {
         loadingUI: LOADING_UI
      };
   }
}
</script>