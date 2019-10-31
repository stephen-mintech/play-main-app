<template>
	<a href="#" class="media-box media-box_appmsg">
      <div id="myphoto" class="media-box__hd">
         <img src="http://hotfix.7cplay.com/zuzucustom/titleimg/8c829d86-9dd0-43bd-a008-a960dedf3d7e.jpg" 
         alt="Alternate Text" class="media-box__thumb" 
         style="object-fit: cover; border-radius: 999em; width: 50px; height: 50px;"
         >
      </div>
      <div class="media-box__bd" style="height: 50px;">
         <h4 class="main-title" style="color: black;">正式會員 / Stephen 阿水</h4> 
         <p class="sub-title">這人很懶,沒有寫介紹</p>
      </div>
      <van-button icon="edit" plain type="primary" size="small">編輯</van-button>
   </a>
</template>

<script>
import { Button } from 'vant';
Vue.use(Button);

export default {
   name: 'MyPofile',
   data() {
      return {
         
      };
   },
   methods: {
      onSelected() {
         
      }
      
   }
};
</script>


<style lang="scss" scoped>

@import '@/assets/scss/media';


</style>