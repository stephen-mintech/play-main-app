import CategoriesService from '@/services/categories.service';

import { FETCH_CATEGORIES, GET_CATEGORY } from '@/store/actions.type';
import { SET_LOADING, SET_CATEGORY, SET_CATEGORIES } from '@/store/mutations.type';


const initialState = {
   list: [],
   category: null
};

export const state = { ...initialState };
 
const getters = {
   
};


const actions = {
   [FETCH_CATEGORIES](context, params) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         CategoriesService.fetch(params)
            .then(categories => {
               context.commit(SET_CATEGORIES, categories);
               resolve(categories);
            })
            .catch(error => {
               reject(error);
            })
            .finally(() => { 
               context.commit(SET_LOADING, false);
            });
      });
   },
   [GET_CATEGORY](context, id) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         CategoriesService.get(id)
            .then(data => {
               context.commit(SET_CATEGORY, data);
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
   [SET_CATEGORIES](state, categories) {
      state.list = categories;
      
   },
   [SET_CATEGORY](state, category) {
      state.category = category;
   }   
};

export default {
   state,
   actions,
   mutations,
   getters
};
 