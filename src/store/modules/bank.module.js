import BanksService from '@/services/banks.service';

import { FETCH_BANK_INFOES, BBIM_ACTION, GET_BANK_INFO, BANK_INFOES_FETCHED } from '@/store/actions.type';
import { SET_LOADING, SET_BANK_CODES, SET_BANK_INFOES } from '@/store/mutations.type';


const initialState = {
   codeList: [],
   infoList: []
};

export const state = { ...initialState };
 
const getters = {
   
};


const actions = {
   [FETCH_BANK_INFOES](context, page) {
      
      let cmd = GET_BANK_INFO;
      let param = '';
     
      context.dispatch(BBIM_ACTION, {
         page, cmd, param
      });
   },
   //from socket
   [GET_BANK_INFO](context, data) {
      console.log(GET_BANK_INFO);
      data = Utils.resolveSocketData(data); 
      let result = data.result;
      if(result.status) {
         let bankCodes = result.content.BankCode;
         context.commit(SET_BANK_CODES, bankCodes);

         let bankInfoes = result.content.MyBankInfo;
         context.commit(SET_BANK_INFOES, bankInfoes);
      }

      Bus.$emit(BANK_INFOES_FETCHED);
   }
};


const mutations = {
   [SET_BANK_CODES](state, codeList) {
      state.codeList = codeList;
   },
   [SET_BANK_INFOES](state, infoList) {
      state.infoList = infoList;
   },
};

export default {
   state,
   actions,
   mutations,
   getters
};
 