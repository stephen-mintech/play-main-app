<template>
<div class="menu-container">
   <div @click="onSelected(item)" v-for="(item, index) in menu_items" :key="index" class="item-container">
      <div class="menu-item" :style="getStyle(item)">
         <div class="icon-container">
            <img :src="`static/images/icons/${item.icon}`" class="icon-img"/>
         </div>
         <div class="title-container">
            <div class="title-text">
                {{ item.title }}
               <div v-if="item.subTitle" class="sub-title-text" >
                  {{ item.subTitle }}
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import { Grid, GridItem, Image } from 'vant';
Vue.use(Grid).use(GridItem).use(Image);

export default {
   name: 'HomeMenu',
   props: {
      menu_items: Array
   },
   methods: {
      getStyle(item) {
         return `background-color:${item.color}`;
      },
      onSelected(item) {
         this.$emit('selected', item);
      }

   }

}

</script>

<style lang="scss" scoped>
.menu-container {
   display : flex;
   height : 160px;
   flex-wrap : wrap;color:white;
   font-size:16px;
}

.item-container {
   flex : 0 0 50%;
   height : 80px;
}


.menu-item {
   display : flex;
   position : relative;
   margin : 0 auto;
   width : 98%;
   height : 95%;
   border-radius: 10px;
   .icon-container {
      flex : 0 0 35%;
      height : 100%;
      
   }
   .icon-img {
      object-fit : scale-down;
      max-width : 60%;
      max-height : 100%;
      border-radius : 999em;
      position : relative;
      top : 50%;
      left : 50%;
      transform : translate(-50%,-50%)
   }
   .title-container {
      flex : 0 0 65%;
      height : 100%;      
   }
   .title-text {
      top : 50%;
      transform:translateY(-50%);
      position : relative
   }
   .sub-title-text {
      font-size: 12px
   }
}


</style>