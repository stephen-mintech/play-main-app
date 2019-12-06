<template>
   <div class="media-box media-box_appmsg" style="flex-wrap: wrap;">
      <p class="media-box__desc" style="color: black; flex: 0 0 100%;">
         第一商業銀行 - 长春
      </p>
      <div class="media-box__hd">
         <img src="http://hotfix.7cplay.com/zuzucustom/bankimg/cdba2971-28df-4058-b7b7-47c44ff3f8dd/61e0bfbe-6901-486f-954a-98e5aeca5093.jpg" alt="" class="media-box__thumb" style="position: relative; top: 50%; transform: translateY(-50%);">
      </div>
      <div class="media-box__bd ml-10">
         <h4 class="media-box__title">何金水</h4> 
         <p class="media-box__desc">1452365422</p>
      </div>
      <div class="media-box__ft">
         <van-tag v-if="model.isDefault" type="primary" size="large">預設領款帳戶</van-tag>
         <van-button v-else plain type="primary">設成預設</van-button>
      </div>
   </div>
</template>

<script>

import { Button, Tag } from 'vant';
Vue.use(Button).use(Tag);

export default {
   name: 'BackAccountItem',
   props: {
      model: Object
   },
   
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/media';

</style>