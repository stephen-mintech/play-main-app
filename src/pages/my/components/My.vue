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
         <Link name="logout" icon="undo-outline" text="登出"
            @selected="logout" 
         />
         
      </van-cell-group>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { OPEN_CHILD_PAGE, LOGOUT, GO_TO_PAGE } from '@/store/actions.type';

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
         hideLinks: ['profile'],
         model: {
            name: 'Stephen 阿水',
            type: '正式會員',
            subTitle: '這人很懶,沒有寫介紹',
            img: 'http://hotfix.7cplay.com/zuzucustom/titleimg/8c829d86-9dd0-43bd-a008-a960dedf3d7e.jpg'
         }
      };
   },
   computed: {
      ...mapGetters(['currentUser','childrenLinks']),
      links() {
         if(this.childrenLinks) {
            return this.childrenLinks.filter(item => !this.hideLinks.includes(item.name));
         }else return [];
      }
   },
   methods: {
      onLinkSelected(name) {
         let page = this.links.find(item => item.name === name);
         this.$store.dispatch(OPEN_CHILD_PAGE,  page);
      },
      editProfile() {
         this.$store.dispatch(OPEN_CHILD_PAGE,  { name: 'profile' });
      },
      logout() {
         this.$store.dispatch(LOGOUT);
         setTimeout(() => {
            this.$store.dispatch(GO_TO_PAGE,  { name: 'home' });
         }, 500)
      }
      
   }
};
</script>
