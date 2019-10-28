<template>
	<div class="page-content">
		<van-panel title="重要訊息">
         <van-cell-group>
            <van-cell v-for="(item, index) in menuItems" :key="index" is-link
               :title="item.title"
               @click="onMsgSelected(item)"
            >
               <van-icon
                  slot="icon"
                  :name="item.icon"
                  class="cell-title-icon"
               />
            </van-cell>   
         </van-cell-group>
      </van-panel>

      <van-panel title="交談訊息">
         <van-cell-group>
            <van-cell v-for="(item, index) in messages" :key="index" @click="onMsgSelected(item)" is-link>
               <MessagesItem  />
            </van-cell>
         </van-cell-group>
      </van-panel>
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PageManager from 'page-manager';
import { GO_TO_PAGE } from '@/store/actions.type';
import { Panel, Cell, CellGroup, Icon } from 'vant';
Vue.use(Panel).use(Cell).use(CellGroup).use(Icon);

import MessagesItem from '@/components/message/Item';

export default {
   name: 'Notices',
   components: {
		MessagesItem
	},
   data() {
      return {
         menuItems: [{
            name: 'orders',
            title: '訂單中心',
            icon: 'orders-o'
         },{
            name: 'official-notices',
            title: '官方公告',
            icon: 'bullhorn-o'
         }],
         messages: [{
            id: 45
         }]
         
      };
   },
   computed: {
      
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
      onMenuSelected(item) {
         console.log(item);
         this.$store.dispatch(GO_TO_PAGE, 'chat', { id: 3})
      },
      onMsgSelected(item) {
         this.$store.dispatch(GO_TO_PAGE, { name: 'chat', params: { id: 3 }});
      }
   }
};
</script>
