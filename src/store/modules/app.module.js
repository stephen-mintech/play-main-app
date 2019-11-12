import Errors from '@/common/errors';
import { INIT, INIT_PLUS, GO_TO_PAGE, GO_BACK, PLUS_GO_BACK,
   PLUS_TO_PAGE, FETCH_TAB_PAGES, SELECT_TAB
} from '@/store/actions.type';

import { SET_INIT_COMPLETE, SET_ERROR, 
   CLEAR_ERROR, SET_LOADING, SET_IS_PLUS,
   SET_CURRENT_PAGE, SET_SUB_PAGES,
   SET_TAB_PAGES, SET_ACTIVE_TAB 
} from '@/store/mutations.type';

import { isPlus } from '@/utils';

const initialState = {
   initComplete: false,
   loading: false,
   tabPages: [],
   currentPage: null,
   lastPage: null,
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
   tabPages() {
      return state.tabPages;
   },
   activeTabName() {
      if(state.activeTab) return state.activeTab.name;
      return '';
   },
   currentPage() {
      return state.currentPage;
   },
   lastPage() {
      return state.lastPage;
   }
};

const actions = {
   [INIT](context, { user, page }) {
      //初始化頁面, 進入此階段表示user已通過驗証
      context.commit(SET_CURRENT_PAGE, page);

      if(isPlus()) {
         context.dispatch(INIT_PLUS, { user, page });
      }else {
         context.commit(SET_IS_PLUS, false);

         let tabPages = Routes.getTabPages(user);
         context.commit(SET_TAB_PAGES, tabPages);

         let tab = tabPages.find(item => item.name === page.name);
         if(tab) context.commit(SET_ACTIVE_TAB, tab);
         else context.commit(SET_ACTIVE_TAB, tabPages[0]);

         context.commit(SET_INIT_COMPLETE, true);
      }
   },
   [GO_TO_PAGE](context, page) {
      console.log(GO_TO_PAGE);
      console.log('page', page);
      if(!page.view) page = Routes.findPage(page.name);
      if(!page) Utils.pageNotFound(page.name);



      if(isPlus()) {
         context.dispatch(PLUS_TO_PAGE, page);
      }else {
         window.location.href = page.view;
      }
   },
   [GO_BACK](context) {
      if(isPlus())  context.dispatch(PLUS_GO_BACK);
      else window.history.back();
   },
   [FETCH_TAB_PAGES](context, user) {
      let tabPages = Routes.getTabPages(user);
      context.commit(SET_TAB_PAGES, tabPages);
   },
   [SELECT_TAB](context, page) {
      context.commit(SET_ACTIVE_TAB, page);
      context.dispatch(GO_TO_PAGE, page);
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
      state.lastPage = { ...state.currentPage };
      state.currentPage = page;
   }
   
};

export default {
   state,
   actions,
   mutations,
   getters
};
 