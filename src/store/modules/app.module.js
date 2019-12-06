import { IS_PLUS } from '@/config';
import Errors from '@/common/errors';
import { INIT, INIT_PLUS, INIT_COMPLETED,
    SELECT_TAB, PLUS_SELECT_TAB
} from '@/store/actions.type';

import { SET_INIT_COMPLETED, SET_ERROR, SET_PAGE,
   CLEAR_ERROR, SET_LOADING, SET_IS_PLUS,
   SET_TAB_PAGES, SET_ACTIVE_TAB, SET_CHILDREN_LINKS 
} from '@/store/mutations.type';

const initialState = {
   page: null,
   isPlus: IS_PLUS,
   initCompleted: false,
   loading: false,
   tabPages: [],
   activeTab: null,
   errorList: new Errors(),
};

export const state = { ...initialState };

 

const getters = {
   page() {
      return state.page;
   },
   isPlus() {
      return state.isPlus;
   },
   initCompleted() {
      return state.initCompleted;
   },
   loading() {
      return state.loading;
   },
   tabPages() {
      return state.tabPages;
   },
   activeTab() {
      return state.activeTab;
   },
   activeTabName() {
      if(state.activeTab) return state.activeTab.name;
      return '';
   }
};

const actions = {
   [INIT](context, page) {
      //初始化頁面, 進入此階段表示user已通過驗証
      context.commit(SET_PAGE, page);

      if(IS_PLUS) {
         context.dispatch(INIT_PLUS, page);
      }else {
         
         let user = context.getters.currentUser;
         
         let tabPages = Routes.getTabPages(user);
         context.commit(SET_TAB_PAGES, tabPages);

         let tab = tabPages.find(item => item.name === page.name);
         if(tab) context.commit(SET_ACTIVE_TAB, tab);
         else context.commit(SET_ACTIVE_TAB, tabPages[0]);
         
         let links = Routes.getChildrenLinks(page, user);
         context.commit(SET_CHILDREN_LINKS, links);

         context.commit(SET_INIT_COMPLETED, true);
         Bus.$emit(INIT_COMPLETED);
      }
   },
   [SELECT_TAB](context, page) {
      console.log(SELECT_TAB);
      context.commit(SET_ACTIVE_TAB, page);
      if(IS_PLUS) {
         context.dispatch(PLUS_SELECT_TAB, page);
      }else {
         window.location.href = page.view;
      }      
   }
};


const mutations = {
   [SET_PAGE](state, page) {
      state.page = page;
   },
   [SET_INIT_COMPLETED](state, val) {
      state.initCompleted = val;
   },
   [SET_ERROR](state, errors) {
      state.errorList.record(errors);
   },
   [CLEAR_ERROR](state) {
      state.errorList.clear();   
   },
   [SET_LOADING](state, loading) {
      state.loading = loading;
   },
   [SET_TAB_PAGES](state, tabPages) {
      state.tabPages = tabPages;
   },
   [SET_ACTIVE_TAB](state, item) {
      console.log(SET_ACTIVE_TAB, item);
      state.activeTab = item;
   }
};

export default {
   state,
   actions,
   mutations,
   getters
};
 