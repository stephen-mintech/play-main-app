import Errors from '@/common/errors';
import { INIT, INIT_PLUS, GO_TO_PAGE, FETCH_TAB_PAGES, SELECT_TAB } from '@/store/actions.type';
import { SET_INIT_COMPLETE, SET_ERROR, CLEAR_ERROR, SET_LOADING, 
   SET_CURRENT_PAGE, SET_SUB_PAGES, SET_TAB_PAGES, SET_ACTIVE_TAB } from '@/store/mutations.type';

import { isPlus } from '@/utils';


const initialState = {
   initComplete: false,
   loading: false,
   tabPages: [],
   currentPage: Routes.getDefaultPage(),
   activeTab: null,
   errorList: new Errors(),
};

export const state = { ...initialState };

 

const getters = {
   initComplete() {
      return state.initComplete;
   },
   loading() {
      return state.loading;
   },
   activeTabName() {
      if(state.activeTab) return state.activeTab.name;
      return '';
   },
   currentPage() {
      return state.currentPage;
   }
};

const actions = {
   [INIT](context, { user, page }) {
      
      context.commit(SET_CURRENT_PAGE, page);

      let tabPages = Routes.getTabPages(user);
      context.commit(SET_TAB_PAGES, tabPages);      

      let tab = tabPages.find(item => item.name === page.name);
      if(tab) context.commit(SET_ACTIVE_TAB, tab);
      else context.commit(SET_ACTIVE_TAB, tabPages[0]);

      context.commit(SET_INIT_COMPLETE, true);

      if(isPlus()) context.dispatch(INIT_PLUS, { user, page });
      
   },
   [GO_TO_PAGE](context, data) {
      if(isPlus()) return;
      
      if(data.view) window.location.href = data.view;
      else {
         let page = Routes.findPage(data.name);
         if(page) window.location.href = page.view;
         else Utils.pageNotFound(data.name);
      }
   },
   [FETCH_TAB_PAGES](context, user) {
      let tabPages = Routes.getTabPages(user);
      context.commit(SET_TAB_PAGES, tabPages);
   },
   [SELECT_TAB](context, { user, page }) {
      let currentPage = context.state.currentPage;
      context.commit(SET_ACTIVE_TAB, page);
      context.dispatch(GO_TO_PAGE, { user, page, currentPage });
   }
};


const mutations = {
   [SET_INIT_COMPLETE](state, val) {
      state.initComplete = val;
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
   [SET_SUB_PAGES](state, subPages) {
      state.subPages = subPages;
   },
   [SET_TAB_PAGES](state, tabPages) {
      state.tabPages = tabPages;
   },
   [SET_ACTIVE_TAB](state, item) {
      state.activeTab = item;
   },
   [SET_CURRENT_PAGE](state, page) {
      state.currentPage = page;
   }
   
};

export default {
   state,
   actions,
   mutations,
   getters
};
 