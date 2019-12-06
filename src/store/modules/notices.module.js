import NoticesService from '@/services/notices.service';

import { FETCH_NOTICES, GET_NOTICE } from '@/store/actions.type';
import { SET_LOADING, SET_NOTICES } from '@/store/mutations.type';


const initialState = {
   loading: false,
   list: []
};

export const state = { ...initialState };
 
const getters = {
   
};


const actions = {
   [FETCH_NOTICES](context, params) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         NoticesService.fetch(params)
            .then(notices => {
               console.log('notices', notices);
               context.commit(SET_NOTICES, notices);
               resolve(notices);
            })
            .catch(error => {
               reject(error);
            })
            .finally(() => { 
               context.commit(SET_LOADING, false);
            });
      });
   },
   [GET_NOTICE](context, id) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         NoticesService.get(id)
            .then(data => {
               context.commit(SET_ARTICLE_NEWS, data);
               resolve(data);
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
   [SET_NOTICES](state, notices) {
      state.list = notices;
   }
};

export default {
   state,
   actions,
   mutations,
   getters
};
 