<template>
	<div>
      <Spacer />
      <div class="card-content" style="padding-top:10px;">
         <MyPofile :model="model" @edit="editProfile" />
      </div>
      <Spacer />
      <MySummary />
      <Spacer />
      <van-cell-group>
         <Link v-for="(item, index) in links" :key="index"
            :name="item.name" :icon="item.meta.icon" :text="item.meta.title"
            @selected="onLinkSelected" 
         />
      </van-cell-group>

      <Spacer />
      <van-cell-group>
         <Link name="logout" icon="undo-outline" text="登出"/>
         
      </van-cell-group>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { GO_TO_PAGE } from '@/store/actions.type';

import { Panel, Icon, Button, Cell, Grid, GridItem, CellGroup, Divider } from 'vant';
Vue.use(Panel).use(Icon).use(Button).use(Cell).use(Grid)
.use(GridItem).use(CellGroup).use(Divider);


import Link from '@/components/Link';
import Spacer from '@/components/Spacer';
import MyPofile from '@/components/my/Profile';
import MySummary from '@/components/my/Summary';


export default {
   name: 'My',
   components: {
      Link,
      Spacer,
      MyPofile,
      MySummary
   },
   data() {
      return {
         hide: ['profile'],
         model: {
            name: 'Stephen 阿水',
            type: '正式會員',
            subTitle: '這人很懶,沒有寫介紹',
            img: 'http://hotfix.7cplay.com/zuzucustom/titleimg/8c829d86-9dd0-43bd-a008-a960dedf3d7e.jpg'
         }
      };
   },
   computed: {
      ...mapGetters(['currentUser','subPages']),
      links() {
         if(this.subPages) {
            return this.subPages.filter(item => !this.hide.includes(item.name));
         }else return [];
      }
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
      onLinkSelected(name) {
         let page = this.links.find(item => item.name === name);
         this.$store.dispatch(GO_TO_PAGE,  page);
      },
      editProfile() {
         console.log('editProfile');
         this.$store.dispatch(GO_TO_PAGE,  { name: 'profile' });
      }
      
   }
};
</script>
