<template>
	<van-grid :border="false" :column-num="3">
      <van-grid-item>
         <i class="fa fa-2x fa-eye" style="color:gray;"></i>
         <span style="padding-top:10px">關注(0)</span>
      </van-grid-item>
      <van-grid-item>
         <i class="fa fa-2x fa-child" style="color:gray;"></i>
         <span style="padding-top:10px">粉絲(0)</span>
      </van-grid-item>
      <van-grid-item>
         <i class="fa fa-2x fa-globe" style="color:gray;"></i>
         <span style="padding-top:10px">最近來訪(0)</span>
      </van-grid-item>
   </van-grid>
</template>

<script>
import { Grid, GridItem } from 'vant';
Vue.use(Grid).use(GridItem);

export default {
   name: 'MySummary',
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