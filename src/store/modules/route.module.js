import { IS_PLUS } from '@/config';
import { GO_TO_PAGE, GO_BACK, PLUS_GO_BACK,
   PLUS_TO_PAGE, OPEN_CHILD_PAGE,
    PLUS_OPEN_CHILD_PAGE, TO_BIND_PHONE_PAGE
} from '@/store/actions.type';

import { 
   SET_SUB_PAGES, SET_CHILDREN_LINKS
} from '@/store/mutations.type';

const initialState = {
   subPages: [],
   childrenLinks: []
};

export const state = { ...initialState };

 

const getters = {
   subPages() {
      return state.subPages;
   },
   childrenLinks() {
      return state.childrenLinks;
   },
};

const actions = {
   [GO_TO_PAGE](context, page, params = {}) {
      if(!page.view) page = Routes.findPage(page.name);
      if(!page) Utils.pageNotFound(page.name);


      if(IS_PLUS) {
         context.dispatch(PLUS_TO_PAGE, page, params);
      }else {
         window.location.href = page.view;
      }
   },
   [OPEN_CHILD_PAGE](context, page, params = {}) {      
      if(!page.view) page = Routes.findPage(page.name);
      if(!page) Utils.pageNotFound(page.name);


      if(IS_PLUS) {
         context.dispatch(PLUS_OPEN_CHILD_PAGE, { page, params });
      }else {
         window.location.href = page.view;
      }
   },
   [GO_BACK](context) {
      if(IS_PLUS)  context.dispatch(PLUS_GO_BACK);
      else window.history.back();
   },
   [TO_BIND_PHONE_PAGE](context) {
      let page = Routes.findPage('profile');
      context.dispatch(GO_TO_PAGE, page);
   }
};


const mutations = {
   [SET_SUB_PAGES](state, subPages) {
      state.subPages = subPages;
   },
   [SET_CHILDREN_LINKS](state, links) {
      state.childrenLinks = links;
   }
   
};

export default {
   state,
   actions,
   mutations,
   getters
};
 