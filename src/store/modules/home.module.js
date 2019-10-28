import PageManager from 'page-manager';
import Errors from '@/common/errors';
import { SET_ERROR, CLEAR_ERROR } from '@/store/mutations.type';
import fakeCategories from '@/mock/categories';

const initialState = {
   
};

export const state = { ...initialState };


const getters = {
   homeMenuItems() {
      return fakeCategories;
   }
};



const mutations = {
   [SET_ERROR](state, errors) {
      state.errorList.record(errors);
   },
   [CLEAR_ERROR](state) {
      state.errorList.clear();   
   },
};

export default {
   state,
   mutations,
   getters
};
 