import PhoneService from '@/services/phone.service';

import { FETCH_AREA } from '@/store/actions.type';
import { SET_LOADING, SET_AREA } from '@/store/mutations.type';


const initialState = {
   areaList: []
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
   }
};


const mutations = {
   [SET_AREA](state, areaList) {
      state.areaList = areaList;
   }
};

export default {
   state,
   actions,
   mutations,
   getters
};
 