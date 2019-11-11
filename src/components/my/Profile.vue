<template>
	<div class="media-box media-box_appmsg">
      <div id="myphoto" class="media-box__hd">
         <Avatar :src="model.img" class_name="media-box__thumb"
            style_text="object-fit: cover; border-radius: 999em; width: 50px; height: 50px;"
         />
      </div>
      <div class="media-box__bd" style="height: 50px;">
         <h4 class="main-title" style="color: black;">{{ model.type }} / {{ model.name }}</h4> 
         <p class="sub-title">{{ model.subTitle }}</p>
      </div>
      <van-button @click.prevent="edit" icon="edit" plain type="primary" size="small">
         編輯
      </van-button>
   </div>
</template>

<script>
import Avatar from '@/components/Avatar';

import { Button } from 'vant';
Vue.use(Button);

export default {
   name: 'MyPofile',
   components: {
		Avatar
   },
   props: {
      model: Object
   },
   data() {
      return {
         
      };
   },
   methods: {
      edit() {
         this.$emit('edit');
      }
      
   }
};
</script>


<style lang="scss" scoped>

@import '@/assets/scss/media';


</style>