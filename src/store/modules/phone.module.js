import PhoneService from '@/services/phone.service';

import { FETCH_AREA, SEND_VCODE, SUBMIT_PHONE_BIND } from '@/store/actions.type';
import { SET_LOADING, SET_AREA, SET_SENDING_VCODE, SET_PHONE_BINDING } from '@/store/mutations.type';


const initialState = {
   areaList: [],
   sendingVCode: false,
   phoneBinding: false
};

export const state = { ...initialState };
 
const getters = {
   
};


const actions = {
   [FETCH_AREA](context) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         PhoneService.fetchArea()
            .then(data => {
               let result = Utils.resolveOkData(data);
               if(result.status) {
                  let areaList = result.content;
                  context.commit(SET_AREA, areaList);
               }
               resolve(result.status);
            })
            .catch(error => {
               reject(error);
            })
            .finally(() => { 
               context.commit(SET_LOADING, false);
            });
      });
   },
   [SEND_VCODE](context, params = { phone, areaCode, code }) {
      context.commit(SET_SENDING_VCODE, true);
      return new Promise((resolve, reject) => {
         PhoneService.sendVCode(params)
         .then(data => {
            let result = Utils.resolveOkData(data);
            if(result.status) resolve(true);
            else reject(new Error(result.msg));
         })
         .catch(error => {
            reject(error);
         })
         .finally(() => { 
            context.commit(SET_SENDING_VCODE, false);
         });
      });
   },
   [SUBMIT_PHONE_BIND](context, model) {
      context.commit(SET_PHONE_BINDING, true);
      return new Promise((resolve, reject) => {
         PhoneService.submitBind(model)
         .then(data => {
            let result = Utils.resolveOkData(data);
            if(result.status) resolve(true);
            else reject(new Error(result.msg));
         })
         .catch(error => {
            reject(error);
         })
         .finally(() => { 
            context.commit(SET_PHONE_BINDING, false);
         });
      });
   }
};


const mutations = {
   [SET_AREA](state, areaList) {
      state.areaList = areaList;
   },
   [SET_SENDING_VCODE](state, val) {
      state.sendingVCode = val;
   },
   [SET_PHONE_BINDING](state, val) {
      state.phoneBinding = val;
   }
};

export default {
   state,
   actions,
   mutations,
   getters
};
 