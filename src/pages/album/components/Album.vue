<template>
	<div class="page-content nav-content">
      <van-nav-bar :title="page.meta.title" fixed left-arrow @click-left="goBack" />
         <div v-if="editting" class="text-right margin-10">
            <van-button v-if="selectedIds.length" size="small" icon="replay" 
            plain round type="default" @click="cancel"
            >
             取消
            </van-button>
            <span v-else>請選擇要刪除的相片</span> 
            
            <van-button class="ml-10" size="small" icon="close" plain round type="danger" @click="remove">
             刪除
            </van-button>
         </div>
         <div v-else class="text-right margin-10">
            <van-button size="small" icon="add-o" plain round type="info" @click="add">
             新增
            </van-button>
            <van-button class="ml-10" size="small" icon="close" plain round type="danger" @click="remove">
             刪除
            </van-button>
         </div>
      <div>
         <van-checkbox-group v-model="selectedIds" ref="checkboxGroup" @change="test">
         <van-grid :border="false" :column-num="3">
            
               <van-grid-item v-for="(item, index) in list" :key="index" >
                  <div v-show="editting" class="selector">
                     <van-checkbox :name="item.id" />
                  </div>
                  <van-image :src="item.src" :class="{ contrast: editting }"/>
               </van-grid-item>
            
         </van-grid>
         </van-checkbox-group>
      </div>
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { GO_BACK } from '@/store/actions.type';

import { NavBar, Grid, GridItem, Image, Button,
   Checkbox, CheckboxGroup 
} from 'vant';
Vue.use(NavBar).use(Grid).use(GridItem)
.use(Image).use(Button).use(Checkbox).use(CheckboxGroup);

import Spacer from '@/components/Spacer';

export default {
   name: 'Album',
   components: {
      Spacer
	},
   data() {
      return {
         list: [{
            id: 7,
            src: 'https://img.yzcdn.cn/vant/apple-1.jpg',
         },
         {
            id: 11,
            src: 'https://img.yzcdn.cn/vant/apple-2.jpg',
         },
         {
            id: 100,
            src: 'https://img.yzcdn.cn/vant/apple-3.jpg',
         },
         {
            id: 108,
            src: 'https://img.yzcdn.cn/vant/apple-2.jpg',
         }],
         selectedIds: [],
         editting: false
      };
   },
   computed: {
      ...mapGetters(['page', 'currentUser'])
   },
   mounted() {
      this.$nextTick(() => {
         this.init();
      });
   },
   methods: {
      init() {
         return require('@/assets/img/coin.png')
      },
      fetchData() {
         let src = `static/images/avatars/${model.Avatar}`;
         return `background-image: url(${src})`;
      },
      add() {
         this.editting = true;
      },
      remove() {
         this.editting = true;
      },
      cancel() {
         this.selectedIds = [];
         this.editting = false;
      },
      explain() {

      },
      goBack() {
			this.$store.dispatch(GO_BACK);
      },
      test() {
         console.log('selectedIds', this.selectedIds)
      }
   }
};
</script>

<style scoped>
.selector {
   position : absolute;
   right : 0px;
   top : 0px;
   z-index : 5;
}
.contrast {
   filter : contrast(0.5);
}
</style>

