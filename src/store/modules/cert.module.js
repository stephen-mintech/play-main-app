import BanksService from '@/services/banks.service';

import { FETCH_CERT_INFOES, BBIM_ACTION, GET_MY_CERT, CERT_INFOES_FETCHED } from '@/store/actions.type';
import { SET_LOADING, SET_CERT_INFOES } from '@/store/mutations.type';


const initialState = {
   list: []
};

export const state = { ...initialState };
 
const getters = {
   
};


const actions = {
   [FETCH_CERT_INFOES](context, page) {
      
      let cmd = GET_MY_CERT;
      let param = '';
     
      context.dispatch(BBIM_ACTION, {
         page, cmd, param
      });
   },
   //from socket
   [GET_MY_CERT](context, data) {
      data = Utils.resolveSocketData(data); 
      let certList = data.param;
      context.commit(SET_CERT_INFOES, certList);

      Bus.$emit(CERT_INFOES_FETCHED);
   }
};


const mutations = {
   [SET_CERT_INFOES](state, certList) {
      state.list = certList;
   }
};

export default {
   state,
   actions,
   mutations,
   getters
};
 