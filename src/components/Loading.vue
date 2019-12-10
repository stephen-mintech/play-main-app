<template>
   <div style="text-align: center; padding-top:10px;">
      <van-loading type="spinner" size="20px">
         {{ text }}
      </van-loading>
   </div>
</template>

<script>
import { Loading } from 'vant';
Vue.use(Loading);

export default {
   name: 'Loading',
   props: {
      text: {
         type: String,
         default: '加載中...'
      }
   },
   data() {
      return {
         
      };
   }
}
</script>