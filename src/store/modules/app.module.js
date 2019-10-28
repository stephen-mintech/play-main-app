import PageManager from 'page-manager';
import Errors from '@/common/errors';
import { INIT, CHECK_AUTH, GO_TO_PAGE, FETCH_TAB_PAGES, SELECT_TAB } from '@/store/actions.type';
import { SET_ERROR, CLEAR_ERROR, SET_LOADING, 
   SET_CURRENT_PAGE, SET_TAB_PAGES, SET_ACTIVE_TAB } from '@/store/mutations.type';

const initialState = {
   test: null,
   loading: false,
   tabPages: [],
   currentPage: Routes.getDefaultPage(),
   activeTab: null,
   errorList: new Errors(),
};

export const state = { ...initialState };

const getters = {
   loading() {
      return state.loading;
   },
   isPlus() {
      if(PageManager) return PageManager.isPlus;
      return false;
   },
   activeTabName() {
      if(state.activeTab) return state.activeTab.name;
      return '';
   },
};

const actions = {
   [INIT](context, data) {
      let user = data.user;
      let page = data.page;

      let tabPages = Routes.getTabPages(user);
      context.commit(SET_TAB_PAGES, tabPages);

      context.commit(SET_CURRENT_PAGE, page);
      if(getters.isPlus()) {
         
      }else{
         let tab = tabPages.find(item => item.name === page.name);
         if(tab) context.commit(SET_ACTIVE_TAB, tab);
      }
      
   },
   [GO_TO_PAGE](context, name) {
      console.log(GO_TO_PAGE);
      if(getters.isPlus){
         let page = Routes.findPage(name);
         if(!page) Utils.pageNotFound(name);

         context.dispatch(CHECK_AUTH, page)
         .then(result => {
            if(result.auth){
               context.dispatch(INIT, { page, user: result.user });
            } 
            else throw new Error('權限不足');
         })
         .catch(error => {
            console.log(error);
         })
      }else {
         window.location.href = page.view;
      }
      
   },
   [FETCH_TAB_PAGES](context, user) {
      let tabPages = Routes.getTabPages(user);
      context.commit(SET_TAB_PAGES, tabPages);
   },
   [SELECT_TAB](context, item) {
      if(getters.isPlus()) {
         PageManager.switchTab(item.name, getters.activeTabName());
      }else{
         window.location.href = item.view;
      }
      context.commit(SET_ACTIVE_TAB, item);
   }
};


const mutations = {
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
 