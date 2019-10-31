<template>
	<div class="page-content nav-content">
		<van-nav-bar :title="currentPage.meta.title" fixed left-arrow @click-left="goBack" />
      <div>
         <h2 class="block-title">基本資料</h2>
         <van-cell-group>
            <van-cell title="頭像" title-class="van-field__label main-title" style="align-items: center;">
               <van-image fit
                  src="http://hotfix.7cplay.com/parkcustom/titleimg/cdba2971-28df-4058-b7b7-47c44ff3f8dd.jpg"
               />
            </van-cell>
            <van-cell title="手機認證" title-class="van-field__label main-title" style="align-items: center;">
               <div style="text-align: left;">
                  <span style="color:red; padding-right:15px">未認證</span> 
                  <van-button round plain type="primary">前往認證</van-button>
               </div>
            </van-cell>
            <van-field label-class="main-title" 
               label="暱稱" placeholder="請輸入暱稱"
            />
            <van-cell title="暱稱色彩" title-class="van-field__label main-title" style="align-items: center;">
               <ColorPicker :colors="colors" :selected_color="selectedColor"
               @selected="onColorSelected"
               />
            </van-cell>
            <van-field label-class="main-title" :value="user.genderText" is-link class="main-title"
               label="性別"
            />
            <van-field label-class="main-title" type="textarea" :value="user.description" class="main-title"
               label="簡介"
            />
         </van-cell-group>

         <Spacer />
         <van-button type="primary" round size="large">保存</van-button>
         
      </div>
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { NavBar, Cell, CellGroup, Field, Image, Button } from 'vant';
import { NAME_COLORS } from '@/config';

Vue.use(NavBar).use(CellGroup).use(Cell).use(Field).use(Image).use(Button);

import Spacer from '@/components/Spacer';
import ColorPicker from '@/components/ColorPicker';

export default {
   name: 'Profile',
   components: {
      Spacer,
      ColorPicker
   },
   data() {
      return {
         user: {
            name: 'Stephen 阿水',
            genderText: '不公開',
            description: '這人很懶'
         },
         colors: NAME_COLORS,
         selectedColor: null,
      };
   },
   computed: {
      ...mapState({
         currentPage: state => state.app.currentPage
      }),
   },
   created() {

   },
   beforeMount (){
      this.selectedColor = this.colors[0];
   },
   mounted() {
      this.$nextTick(() => {
         this.init();
      });
   },
   methods: {
      init() {
         
      },
      goBack() {
			mui.back();
      },
      onColorSelected(item) {
         this.selectedColor = { ...item };
      }
      
   }
};
</script>

