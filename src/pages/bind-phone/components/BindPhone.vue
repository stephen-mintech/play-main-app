<template>
   <div class="page-content nav-content">
      <van-nav-bar :title="page.meta.title" fixed left-arrow @click-left="goBack" />
      <van-cell-group>
         <van-field readonly clickable label="國碼" :value="areaCode.text"
            placeholder="選擇國碼" @click="areaCode.picking = true"
         />
         <van-popup v-model="areaCode.picking" position="bottom" :style="{ height: '80%' }">
            <van-picker :columns="areaCode.options"
               :default-index="areaCode.selectedIndex"
               @change="onAreaPickerChanged"
            />
         </van-popup>
         <van-field label="手機號碼" placeholder="請輸入手機號碼"
            v-model="model.phone" :error-message="errors.get('phone')"
         />
         <van-field
            label="驗證碼" placeholder="請輸入驗證碼" clearable
            v-model="model.VCode" :error-message="errors.get('VCode')"
         >
            <van-button slot="button" size="small" type="primary">
               發送驗證碼
            </van-button>
         </van-field>
      </van-cell-group>

      <Spacer />
      <van-button type="primary" round size="large"
         @click="onSubmit"
      >
         進行認證
      </van-button>
            
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { FETCH_AREA, GO_BACK } from '@/store/actions.type';
import { NavBar, Cell, CellGroup, Field, Panel,
   Image, Button, Picker, Popup 
} from 'vant';

Vue.use(NavBar).use(CellGroup).use(Cell).use(Field).use(Panel)
.use(Image).use(Button).use(Picker).use(Popup);

import Spacer from '@/components/Spacer';
import Errors from '@/common/errors';

export default {
   name: 'BindPhone',
   components: {
      Spacer
   },
   data() {
      return {
         name: 'BindPhone',
         areaCode: {
            picking: false,
            options: [],
            selectedItem: null,
            selectedIndex: 0,
            text: ''
         },
         model: {
            areaCode: '',
            phone: '',
         },
         errors: new Errors()
      };
   },
   computed: {
      ...mapGetters(['page', 'currentUser']),
      ...mapState({
         areaList: state => state.phone.areaList
      })
   },
   beforeMount (){
      this.init();
   },
   methods: {
      init() {
         this.$store.dispatch(FETCH_AREA)
         .then(status => {
            if(status) this.mapAreaList();
         }).catch(error => {
            
         })
      },
      mapAreaList() {
         this.areaCode.options = this.areaList.map(item => {
            return {
               value: item.AreaCode,
               text: item.Name
            }
         });
         this.setSelectedArea({
            value: this.areaList[0].AreaCode,
            text: this.areaList[0].Name,
         });
      },
      onAreaPickerChanged(picker, values) {
         this.setSelectedArea(values);
         this.areaCode.picking = false;
      },
      setSelectedArea(item) {
         this.areaCode.options.findIndex(option => option.value === item.value);
         this.areaCode.selectedItem = {
            value: item.value,
            text: item.text
         };
         this.areaCode.text = `${item.value} ${item.text}`;
      },
      goBack() {
			this.$store.dispatch(GO_BACK);
      },
      phoneErrMag(phone) {
         if(!phone) return '必須填寫手機號碼';
         return '';
      },
      onSubmit() {
         let errors = {};
         let phoneErrMag = this.phoneErrMag(this.model.phone);
         if(phoneErrMag) {
            errors['phone'] = [phoneErrMag];
         }

         if(Object.keys(errors).length > 0) this.errors.record(errors);
         else this.submit();
      },
      submit() {

      }
   }
}
</script>


<style lang="scss" scoped>


</style>