<template>
	<div >
      <van-cell-group>
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" label="描述信息" />
</van-cell-group>
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { Cell, CellGroup } from 'vant';

Vue.use(Cell).use(CellGroup);
export default {
   name: 'Chat',
   components: {
		
	},
   data() {
      return {
         
      };
   },
   created() {
   },
   mounted() {
      this.$nextTick(() => {
         this.init();
      });
   },
   methods: {
      init() {
         
         
      },
      fetchData() {
         
      }
   }
};
</script>
