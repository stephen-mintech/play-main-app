<template>
   <div class="page-content nav-content">
      <van-nav-bar :title="page.meta.title" fixed left-arrow @click-left="goBack" />
      
      <div v-if="ready">
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
            <van-field label="手機號碼" placeholder="請輸入手機號碼" @input="clearErr('phone')"
               v-model="model.phone" :error-message="errors.get('phone')"
            />
            <van-field
               label="驗證碼" placeholder="請輸入驗證碼" clearable @input="clearErr('VCode')"
               v-model="model.VCode" :error-message="errors.get('VCode')"
            >
               <van-button :loading="sendingVCode" slot="button" plain size="small" type="primary"
                  @click="onSendVCode" :disabled="vCodeSended"
               >
                  
                  <span v-text="sendVCodeBtnText"></span>
               </van-button>
               
            </van-field>
         </van-cell-group>

         <Spacer />
         <van-button type="primary" round size="large"
            @click="onSubmit" :disabled="phoneBinding"
         >
            進行認證
         </van-button>
      </div>
      <Loading v-else />     
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { FETCH_AREA, SEND_VCODE, SUBMIT_PHONE_BIND, GO_BACK } from '@/store/actions.type';
import { PHONE_VCODE_TIMEOUT } from '@/config';
import { NavBar, Cell, CellGroup, Field, Panel,
   Image, Button, Picker, Popup, Toast, Notify
} from 'vant';

Vue.use(NavBar).use(CellGroup).use(Cell).use(Field).use(Panel)
.use(Image).use(Button).use(Picker).use(Popup).use(Toast).use(Notify);

import Loading from '@/components/Loading';
import Spacer from '@/components/Spacer';
import Errors from '@/common/errors';

export default {
   name: 'BindPhone',
   components: {
      Loading,
      Spacer
   },
   data() {
      return {
         name: 'BindPhone',
         ready: false,
         areaCode: {
            picking: false,
            options: [],
            selectedItem: null,
            selectedIndex: 0,
            text: ''
         },
         model: {
            phone: '',
            AreaCode: '',
            VCode: ''            
         },
         seconds: 0,
         vCodeSended: false,
         errors: new Errors()
      };
   },
   computed: {
      ...mapGetters(['page', 'currentUser']),
      ...mapState({
         areaList: state => state.phone.areaList,
         sendingVCode: state => state.phone.sendingVCode,
         phoneBinding: state => state.phone.phoneBinding
      }),
      sendVCodeBtnText() {
         if(this.seconds > 0) return `等待${this.seconds}秒`;
         if(this.vCodeSended) return '驗證碼已發送';
         return '發送驗證碼';
      }
   },
   beforeMount (){      
      this.init();
   },
   methods: {
      init() {
         this.$store.dispatch(FETCH_AREA)
         .then(status => {
            if(status) this.mapAreaList();
            this.ready = true;
         }).catch(error => {
            this.ready = false;
            Toast.fail('載入資料失敗');
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
      onSendVCode() {
         this.checkInputs(['phone']);
         if(this.errors.any()) return;

         this.sendVCode();

      },
      sendVCode() {
         let phone = this.model.phone;
         let areaCode = this.areaCode.selectedItem.value;

         this.$store.dispatch(SEND_VCODE, { phone, areaCode })
         .then(() => {
            this.vCodeSended = true;
            this.countDown();
            Notify({ type: 'success', message: `驗證碼發送成功,${PHONE_VCODE_TIMEOUT}分鐘內有效` });
         }).catch(error => {
            if(error.message) {
               Toast.fail(error.message);
            }else {
               Toast.fail('發送認證碼失敗');
            }
         })
      },
      countDown() {
         this.seconds = 30;
         setInterval(() => {
            this.seconds -= 1;
         }, 1000);
      },
      goBack() {
			this.$store.dispatch(GO_BACK);
      },
      clearErr(key) {
         this.errors.clear(key);
      },
      phoneErrMsg(phone) {
         if(!phone) return '必須填寫手機號碼';
         if(!Utils.numbersOnly(phone)) return '手機號碼格式錯誤';
         return '';
      },
      checkInputs(keys) {
         this.errors.clear();
         let errors = {};
         if(keys.includes('phone')) {
            let phoneErrMsg = this.phoneErrMsg(this.model.phone);
            if(phoneErrMsg) {
               errors['phone'] = [phoneErrMsg];
            }
         }

         if(keys.includes('VCode')) {
            if(!this.model.VCode) errors['VCode'] = ['必須填寫驗證碼'];
         }

         if(Object.keys(errors).length > 0) this.errors.record(errors);

      },
      onSubmit() {
         this.seconds = 0;
         let errors = {};
         let phoneErrMsg = this.phoneErrMsg(this.model.phone);
         if(phoneErrMsg) {
            errors['phone'] = [phoneErrMsg];
         }

         if(!this.model.VCode) errors['VCode'] = ['必須填寫驗證碼'];

         if(Object.keys(errors).length > 0) this.errors.record(errors);
         else this.submit();
      },
      submit() {
         this.model.AreaCode = this.areaCode.selectedItem.value;
         
         this.$store.dispatch(SUBMIT_PHONE_BIND, this.model)
         .then(() => {
            Notify({ type: 'success', message: '驗證成功' });
         }).catch(error => {
            if(error.message) {
               Toast.fail(error.message);
            }else {
               Toast.fail('驗證失敗');
            }
         })
      },
      onBindSuccess() {
         this.goBack();
      }
   }
}
</script>


<style lang="scss" scoped>


</style>