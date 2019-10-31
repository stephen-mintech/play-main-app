import BaseService from '@/common/baseService';
import Jwt from '@/common/jwt';
import AuthService from '@/services/auth.service';
import { FOR_ALL, GUEST_ONLY, USER_ONLY, ADMIN_ONLY } from '@/routes/route.type';


import { CHECK_AUTH } from '../actions.type';
import { SET_AUTH, PURGE_AUTH, SET_USER } from '../mutations.type';

 
const state = {
   user: { id: 35, name: 'stephen'},
   isAuthenticated: false//!!Jwt.getToken()
};

const getters = {
   currentUser(state) {
     return state.user;
   },
   isAuthenticated(state) {
     return state.isAuthenticated;
   }
};

const hasAdminRole = (claims) => {
   return false;
   // let roles = claims.roles.split(',');
   // let adminRoles = roles.filter(role => 
   //    role.toUpperCase() === 'DEV' || role.toUpperCase() === 'BOSS'
   // );

   // if(adminRoles && adminRoles.length) return true;
   // return false;
}

const canVisitPage = (page, user = null) => {
   if(page.meta.type === FOR_ALL) return true;
   if(user) return true;
   return false;
}

const actions = {
   [CHECK_AUTH](context, page) {
      return new Promise((resolve) => {
         let accessToken = 'fakeToken';//Jwt.getToken();
         if(accessToken) {
            let user = {
               id: 35,
               name: 'stephen'
            };
            context.commit(SET_USER, user); 
            resolve({
               user,
               auth: canVisitPage(page, user)
            });
            return;
            BaseService.setHeader();
            let claims = jwtDecode(accessToken);
            if(hasAdminRole(claims)){
               context.commit(SET_USER, {
                  id: claims.id,
                  name: claims.sub
               }); 
               resolve(true);
            }else{
               //有token沒權限,保留token
               let destroyToken = false;
               context.commit(PURGE_AUTH, destroyToken);
               resolve(false);
            }            
         }else {
            context.commit(PURGE_AUTH);
            resolve({
               user: null,
               auth: canVisitPage(page)
            });
         }
      });
   },
};


const mutations = {
   [SET_USER](state, user) {
      state.user = user;
   },
   [SET_AUTH](state, model) {
      
      // Jwt.saveToken(model.token, model.refreshToken);

      // let claims = jwtDecode(model.token);
      // state.user = {
      //    id: claims.id,
      //    name: claims.sub
      // };

      // state.isAuthenticated = true;
      // state.errors = new Errors();
      
   },
   [PURGE_AUTH](state) {
      state.isAuthenticated = false;
      state.user = null;
    
      // state.errors = new Errors();
      // Jwt.destroyToken();
   }
};

export default {
   state,
   actions,
   mutations,
   getters
};
 