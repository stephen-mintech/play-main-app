import PartnersService from '@/services/partners.service';

import { FETCH_PARTNERS, GET_PARTNER } from '@/store/actions.type';
import { SET_LOADING, SET_PARTNER, SET_PARTNERS } from '@/store/mutations.type';


const initialState = {
   loading: false,
   category: null,
   list: [],
   partner: null
};

export const state = { ...initialState };
 
const getters = {
   
};


const actions = {
   [FETCH_PARTNERS](context, params) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         PartnersService.fetch(params)
            .then(partners => {
               context.commit(SET_PARTNERS, partners);
               resolve(partners);
            })
            .catch(error => {
               reject(error);
            })
            .finally(() => { 
               context.commit(SET_LOADING, false);
            });
      });
   },
   [GET_PARTNER](context, id) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         PartnersService.get(id)
            .then(data => {
               context.commit(SET_PARTNER, data);
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
   [SET_PARTNERS](state, partners) {
      state.list = partners;
   },
   [SET_PARTNER](state, data) {
      state.partner = data;
   }
};

export default {
   state,
   actions,
   mutations,
   getters
};
 