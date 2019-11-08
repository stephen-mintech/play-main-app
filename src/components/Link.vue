<template>
   <van-cell :center="true" is-link @click="onSelected">
      <van-icon v-if="hasIcon" class-prefix="ion-ios" :name="icon" class="fa"
         style="width: 32px;font-size: 32px;text-align: center;"
         color=""
      />
      <span :class="{ 'title-padding' : hasIcon, 'main-title' : true }">
         {{ text }}
      </span>
   </van-cell>
</template>

<script>
import { Icon } from 'vant';
Vue.use(Icon);

export default {
   name: 'Link',
   props: {
      name: String,
      icon: String,
      text: String
   },
   computed: {
		hasIcon() {
         if(this.icon) return true;
         return false;
      }
	},
   methods: {
      getIconStyle() {
         return `color : red;`;
      },
      onSelected() {
         this.$emit('selected', this.name);
      }
      
   }
}
</script>


<style lang="scss" scoped>

@import '@/assets/scss/var';

.title-padding {
   padding-left : 10px;//$main-title-font-size;
}

</style>