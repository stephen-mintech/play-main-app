import BaseService from '@/common/baseService';
import Jwt from '@/common/jwt';
import AuthService from '@/services/auth.service';

import { CHECK_AUTH, LOGIN, LOGOUT, REFRESH_TOKEN } from '../actions.type';
import { SET_AUTH, PURGE_AUTH, 
   SET_USER, SET_LOADING 
} from '../mutations.type';

 
const state = {
   user: null
};

const getters = {
   currentUser(state) {
     return state.user;
   },
   phoneConfirmed(state) {
      if(!state.user) return false;
      return true;
   }
};

const actions = {
   [CHECK_AUTH](context) {
      return new Promise((resolve) => {
         let accessToken = Jwt.getToken();
         if(accessToken) {
            BaseService.setHeader();
            let claims = Jwt.getClaims();
            context.commit(SET_USER, {
               id: claims.id,
               name: claims.sub
            }); 
            resolve(true);
         }else {
            context.commit(PURGE_AUTH);
            resolve(false);
         }
      });
   },
   [LOGIN](context, credentials) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         AuthService.login(credentials)
         .then(model => {
            context.commit(SET_AUTH, {
               token: model.accessToken.token,
               refreshToken: model.refreshToken
            }); 
            resolve(true);
         })
         .catch(error => {
            reject(Utils.resolveErrorData(error));
         })
         .finally(() => { 
            context.commit(SET_LOADING, false);
         })
      });
   },
   [LOGOUT](context) {
      context.commit(PURGE_AUTH);    
   },
   [REFRESH_TOKEN](context) {
      return new Promise((resolve, reject) => {
         let accessToken = Jwt.getToken();
         let refreshToken = Jwt.getRefreshToken();
         if(accessToken && refreshToken) {
            context.commit(SET_LOADING, true);
            AuthService.refreshToken({ accessToken, refreshToken })
            .then(model => {
               context.commit(SET_AUTH, {
                  token: model.accessToken.token,
                  refreshToken: model.refreshToken
               });
               context.commit(SET_LOADING, false);
               resolve(true);
            })
            .catch(err => {
               context.commit(PURGE_AUTH);
               reject(Utils.resolveErrorData(error));        
            })
            .finally(() => { 
               context.commit(SET_LOADING, false);
            })
         }else {
            context.commit(PURGE_AUTH);
            resolve(false);
         }
      });
   }
};


const mutations = {
   [SET_USER](state, user) {
      state.user = user;
   },
   [SET_AUTH](state, model) {
      
      Jwt.saveToken(model.token, model.refreshToken);

      let claims = Jwt.getClaims();
      console.log(claims);
      state.user = {
         id: claims.id,
         name: claims.sub
      };
      
   },
   [PURGE_AUTH](state) {
      state.user = null;
      Jwt.destroyToken();
   }
};

export default {
   state,
   actions,
   mutations,
   getters
};
 