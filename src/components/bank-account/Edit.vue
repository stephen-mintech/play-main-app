<template>
   <div>
      <van-cell-group>
         <Spacer />
         <div class="text-center">
            <h2>{{ title }}</h2>
         </div>
         
         <van-field readonly clickable label="銀行" :value="bankCode.text"
            placeholder="選擇銀行" @click="Code.picking = true"
         />
         <van-popup v-model="bankCode.picking" position="bottom" :style="{ height: '80%' }">
            <van-picker :columns="bankCode.options"
               :default-index="bankCode.selectedIndex"
               @change="onBankPickerChanged"
            />
         </van-popup>
         <van-field label="分行" placeholder="請輸入分行"
            v-model="model.Branch" :error-message="errors.get('Branch')"
         />
         <van-field label="戶名" placeholder="請輸入戶名"
            v-model="model.Name" :error-message="errors.get('Name')"
         />
         <van-field label="帳號" placeholder="請輸入帳號"
            v-model="model.Number" :error-message="errors.get('Number')"
         />
         
         <van-cell title="存摺封面" :label="errors.get('Photo')" label-class="text-error">
            <van-uploader class="mt-10" v-model="fileList" :after-read="afterRead" >
               <van-button v-show="canUploadPhoto" icon="photo" size="small" type="primary">
                  上傳
               </van-button>
            </van-uploader>
         </van-cell>
          
         <van-field label="手機號碼"
            
         />
         <van-field
            label="驗證碼" placeholder="請輸入驗證碼" clearable
            v-model="model.VCode" :error-message="errors.get('VCode')"
         >
            <van-button slot="button" size="small" type="primary">
               發送驗證碼
            </van-button>
         </van-field>
         
         
         <van-cell>
            <div class="text-right">
               <van-button @click="cancel" hairline type="default">
                  取消
               </van-button>
               <van-button class="ml-10" type="primary" 
               :disabled="submitting" :loading="submitting">
                  存檔
               </van-button>
            </div>
         </van-cell>
      </van-cell-group>
      
   </div>
</template>

<script>
import Spacer from '@/components/Spacer';
import Errors from '@/common/errors';

import { Button, Cell, CellGroup, Field, 
   Picker, Popup, Uploader
} from 'vant';
Vue.use(Button).use(CellGroup).use(Cell).use(Field)
   .use(Picker).use(Popup).use(Uploader);

export default {
   name: 'BackAccountEdit',
   props: {
      model: Object
   },
   components: {
      Spacer
   },
   data() {
      return {
         name: 'BindPhone',
         fileList: [],
         bankCode: {
            picking: false,
            options: [],
            selectedItem: null,
            selectedIndex: 0,
            text: ''
         },
         submitting: false,
         errors: new Errors()
      };
   },
   computed: {
      title() {
         return '新增銀行帳戶';
      },
      canUploadPhoto() {
         return this.fileList.length === 0;
      }
   },
   methods: {
      init() {
         this.$store.dispatch(FETCH_AREA)
         .then(status => {
            if(status) this.mapBankList();
         }).catch(error => {
            
         })
      },
      mapBankList() {
         this.bankCode.options = this.bankList.map(item => {
            return {
               value: item.BankCode,
               text: item.Name
            }
         });
         this.setSelectedBank({
            value: this.bankList[0].BankCode,
            text: this.bankList[0].Name,
         });
      },
      onBankPickerChanged(picker, values) {
         this.setSelectedBank(values);
         this.bankCode.picking = false;
      },
      setSelectedBank(item) {
         this.bankCode.options.findIndex(option => option.value === item.value);
         this.bankCode.selectedItem = {
            value: item.value,
            text: item.text
         };
         this.bankCode.text = `${item.value} ${item.text}`;
      },
      afterRead(file) {
         console.log(file);
      },
      cancel() {
			this.$emit('cancel');
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