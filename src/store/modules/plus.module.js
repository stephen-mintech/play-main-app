import { INIT_PLUS, PLUS_READY, INIT_COMPLETED,
   ACTIVE_WEBVIEW,
   INDEX_EVENT, PAGE_EVENT,
   PLUS_SELECT_TAB, PLUS_TO_PAGE, PLUS_GO_BACK,
   PLUS_OPEN_CHILD_PAGE, UNLOAD_WEBVIEW   
} from '@/store/actions.type';

import { SET_PLUS_READY, SET_INIT_COMPLETED,
   SET_TAB_PAGES, SET_ACTIVE_TAB, SET_SUB_PAGES,
   SET_CHILDREN_LINKS  
} from '@/store/mutations.type';

import { APP_NAME, APP_UI } from '@/config';


const initialState = {
   plusReady: false
};

export const state = { ...initialState };

const getters = {
   plusReady() {
      return state.plusReady;
   }
};

const indexPageId = 'index';
const config = {
   statusbar: APP_UI.statusbarColor,
};
const isIndexContext = (context) => {
   if(!context.getters.page) return false;
   return context.getters.page.name === indexPageId;
}

const isIndexPage = (page) => page.name === indexPageId;

const initWebview = (tabPages, showName) => {
   let currentWebview = plus.webview.currentWebview();
      let secondWebview = plus.webview.getSecondWebview();
      if (secondWebview) currentWebview.append(secondWebview);
     
      //預先載入菜單頁面
      for(let i = 0; i < tabPages.length; i++) {
         let id = tabPages[i].name;
         let url = tabPages[i].view;
         let subWebview = plus.webview.getWebviewById(id);
         if(!subWebview) {
            let style = {
               top:  APP_UI.top,
               bottom: APP_UI.bottom,
               render: 'always',
               scrollIndicator: 'none',
               statusbar: {}
            };
            subWebview = plus.webview.create(url, id, style);
         }
        
         if(id !== showName) subWebview.hide();
         currentWebview.append(subWebview);
      }
}

const preloadSubpages = (subPages) => {
   //預先載入子頁面
   subPages.forEach(page => {
      let id = page.name;
      let url = page.view;
      let webview = plus.webview.getWebviewById(id);
      if(!webview) webview = mui.preload({ id, url });
   });
}

const unloadPages = (page, tabPages, subPages) => {
   return;
   //保留的子頁面 (index, home, 當前頁面的子頁面, 以及菜單頁面)
   let reserve = [getAppid(), 'home', page.name]
   .concat(subPages.map(item => item.name))
   .concat(tabPages.map(item => item.name));
   //關閉不需要的子頁面
   let unloadViews = plus.webview.all().filter(item => !reserve.includes(item.id));
   unloadViews.forEach(view => view.close());
}

const getOrCreateWebview = (page) => {
   let id = page.name;
   if(id === indexPageId) id = getAppid();

   let webview = plus.webview.getWebviewById(id);
   if(!webview) webview = plus.webview.create(page.view, id);
   return webview;
}

const openPage = (context, page, params) => {
   let webview = getOrCreateWebview(page);
   //將事件傳遞到目標頁面，啟動該頁面
   firePageEvent(webview, ACTIVE_WEBVIEW, params);

   mui.openWindow({
      url: page.view, 
      id: page.name
   });

   //將事件傳遞到index頁面，告知某頁面已active
   fireIndexEvent(ACTIVE_WEBVIEW, { page });
}

const setStatusBarBg = (color, style) => {
   // 设置系统状态栏背景
   plus.navigator.setStatusBarBackground(color || config.statusbar);
   //plus.navigator.setStatusBarStyle(style || 'light');
}

const getAppid = () => plus.runtime.appid;

const getIndexWebview = () => plus.webview.getWebviewById(getAppid());

const firePageEvent = (webview, name, data = {}) => {
   mui.fire(webview, PAGE_EVENT, {
      name,
      data
   });
}

const fireIndexEvent = (name, data = {}) => {
   let indexView = getIndexWebview();
   mui.fire(indexView, INDEX_EVENT, {
      name,
      data
   });
}


const actions = {
   [PLUS_READY](context) { 
      context.commit(SET_PLUS_READY);
      // 设置系统状态栏背景
      setStatusBarBg();
      // 隐藏滚动条
      plus.webview.currentWebview().setStyle({ scrollIndicator: 'none' });
      // 强制竖屏
      plus.screen.lockOrientation('portrait-primary');
   },
   [INIT_PLUS](context, page) {
      //初始化頁面, 進入此階段表示user已通過驗証
      //且plus 已經 SET_PLUS_READY

      let user = context.getters.currentUser;

      let tabPages = [];
      let subPages = [];
      if(isIndexContext(context)) {
         tabPages = Routes.getTabPages(user);
         context.commit(SET_TAB_PAGES, tabPages);
         context.commit(SET_ACTIVE_TAB, tabPages[0]);

         initWebview(tabPages, 'home');

      }else {
         subPages = Routes.getSubPages(page, user);
         context.commit(SET_SUB_PAGES, subPages);

         preloadSubpages(subPages);
      }

      let links = Routes.getChildrenLinks(page, user);
      context.commit(SET_CHILDREN_LINKS, links);
      
      context.commit(SET_INIT_COMPLETED, true);
      Bus.$emit(INIT_COMPLETED);

      if(Routes.isTabPage(page)) {
         context.dispatch(UNLOAD_WEBVIEW, { page, subPages });
      }
      
   },
    // index專用
   [PLUS_SELECT_TAB](context, page) {
      console.log(PLUS_SELECT_TAB);
      let webview = getOrCreateWebview(page);

      //將事件傳遞到目標頁面，啟動該頁面
      firePageEvent(webview, ACTIVE_WEBVIEW);
      
      webview.show();

      //將事件傳遞到index頁面，告知某頁面已active
      fireIndexEvent(ACTIVE_WEBVIEW, { page });

   },
   [PLUS_TO_PAGE](context, page, params = {}) {
      console.log(PLUS_TO_PAGE);
      console.log('isTabPage', Routes.isTabPage(page));
      if(Routes.isTabPage(page)){
         context.dispatch(PLUS_SELECT_TAB, page);
         return;
      }

      openPage(context, page, params);
      
   },
   [PLUS_OPEN_CHILD_PAGE](context, { page, params }) {
      openPage(context, page, params);
   },
    // index專用
   [UNLOAD_WEBVIEW](context, { page, subPages }) {
      if(!isIndexContext(context)) {
         //將事件發佈給index處理
         fireIndexEvent(UNLOAD_WEBVIEW, { page, subPages });
         return;
      }

      let tabPages = context.getters.tabPages;
      unloadPages(page, tabPages, subPages);
   }
   
};


const mutations = {
   [SET_PLUS_READY](state) {
      state.plusReady = true;
   }
};

export default {
   state,
   actions,
   mutations,
   getters
};
 