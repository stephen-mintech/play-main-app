<template>
   <van-overlay :show="loading" >
      <div class="wrapper" @click.stop>
         <van-loading>
            {{ text }}
         </van-loading>
      </div>
   </van-overlay>
</template>

<script>
import { LOADING_UI } from '@/config';
import { Loading, Overlay } from 'vant';
Vue.use(Loading).use(Overlay);

export default {
   name: 'MaskLoading',
   props: {
      loading: Boolean,
      text: String
   },
   data() {
      return {
         
      };
   }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>