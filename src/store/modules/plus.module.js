import { INIT_PLUS, PLUS_READY, INIT_COMPLETED,
   ACTIVE_WEBVIEW, BBIM_ACTION, BBIM_MESSAGE,
   INDEX_EVENT, PAGE_EVENT, SOCKET_SEND,
   PLUS_SELECT_TAB, PLUS_TO_PAGE, PLUS_GO_BACK,
   PLUS_OPEN_CHILD_PAGE, UNLOAD_WEBVIEW, SHOW_INDEX  
} from '@/store/actions.type';

import { SET_PLUS_READY, SET_DEVICE_INFO, SET_INIT_COMPLETED,
   SET_TAB_PAGES, SET_ACTIVE_TAB, SET_SUB_PAGES,
   SET_CHILDREN_LINKS  
} from '@/store/mutations.type';

import { APP_NAME, APP_UI } from '@/config';


const initialState = {
   plusReady: false,
   deviceInfo: null
};

export const state = { ...initialState };

const getters = {
   plusReady() {
      return state.plusReady;
   },
   uuid() {
      if(!state.deviceInfo) return '';
      return state.deviceInfo.uuid;
   }
};

const indexPageId = 'index';
const config = {
   statusbar: APP_UI.statusbarColor,
};


const initWebview = (tabPages, showName) => {
   let currentWebview = plus.webview.currentWebview();
      let secondWebview = plus.webview.getSecondWebview();
      if (secondWebview) currentWebview.append(secondWebview);
     
      //預先載入菜單頁面
      for(let i = 0; i < tabPages.length; i++) {
         let id = tabPages[i].name;
         let url = tabPages[i].view;
         let subWebview = Utils.getWebviewById(id);
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
      let webview = Utils.getWebviewById(id);
      if(!webview) webview = mui.preload({ id, url });
   });
}

const unloadPages = (page, tabPages, subPages) => {
   //保留的子頁面 (index, home, 當前頁面的子頁面, 以及菜單頁面)
   let reserve = [Utils.getAppid(), 'home', page.name]
   .concat(subPages.map(item => item.name))
   .concat(tabPages.map(item => item.name));
   //關閉不需要的子頁面
   let unloadViews = plus.webview.all().filter(item => !reserve.includes(item.id));
   unloadViews.forEach(view => view.close());
}



const getOrCreateWebview = (page) => {
   let id = page.name;
   if(id === indexPageId) id = Utils.getAppid();

   let webview = Utils.getWebviewById(id);
   if(!webview) webview = plus.webview.create(page.view, id);
   return webview;
}

const openPage = (context, page, params) => {
   let webview = getOrCreateWebview(page);
   //將事件傳遞到目標頁面，啟動該頁面
   Utils.firePageEvent(webview, ACTIVE_WEBVIEW, params);

   mui.openWindow({
      url: page.view, 
      id: page.name
   });

   //將事件傳遞到index頁面，告知某頁面已active
   Utils.fireIndexEvent(ACTIVE_WEBVIEW, { page });
}

const setStatusBarBg = (color, style) => {
   // 设置系统状态栏背景
   plus.navigator.setStatusBarBackground(color || config.statusbar);
   //plus.navigator.setStatusBarStyle(style || 'light');
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
      context.commit(SET_INIT_COMPLETED, false);

      let user = context.getters.currentUser;

      let tabPages = [];
      let subPages = [];
      if(Utils.isIndexContext(context)) {
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

      if(Utils.isIndexContext(context)) {
         plus.device.getInfo({
            success: (info) => {
               context.commit(SET_DEVICE_INFO, info);
               context.commit(SET_INIT_COMPLETED, true);
               Bus.$emit(INIT_COMPLETED);
            },
            fail: (err) => {
               console.error('getDeviceInfo failed.', err);
            }
         });
      }else {
         context.commit(SET_INIT_COMPLETED, true);
         Bus.$emit(INIT_COMPLETED);
      }

      if(Routes.isTabPage(page) || page.name === 'login') {
         context.dispatch(UNLOAD_WEBVIEW, { page, subPages });
      }
      
   },
   [SHOW_INDEX]() {
      console.log(SHOW_INDEX);
      console.log('currentwebview',plus.webview.currentwebview());
      plus.webview.all().forEach(view => view.hide());
      Utils.getIndexWebview().show();
   },
    // index專用
   [PLUS_SELECT_TAB](context, page) {
      let webview = getOrCreateWebview(page);

      //將事件傳遞到目標頁面，啟動該頁面
      Utils.firePageEvent(webview, ACTIVE_WEBVIEW);
      
      webview.show();

      //將事件傳遞到index頁面，告知某頁面已active
      Utils.fireIndexEvent(ACTIVE_WEBVIEW, { page });

   },
   [PLUS_TO_PAGE](context, page, params = {}) {
      
      if(Routes.isTabPage(page) || Utils.isIndexPage(page)){
         context.dispatch(PLUS_SELECT_TAB, page);
         return;
      }

      openPage(context, page, params);
      
   },
   [PLUS_GO_BACK](context) {
      mui.back();
   },
   [PLUS_OPEN_CHILD_PAGE](context, { page, params }) {
      openPage(context, page, params);
   },
    // index專用
   [UNLOAD_WEBVIEW](context, { page, subPages }) {
      if(!Utils.isIndexContext(context)) {
         //將事件發佈給index處理
         Utils.fireIndexEvent(UNLOAD_WEBVIEW, { page, subPages });
         return;
      }

      let tabPages = context.getters.tabPages;
      unloadPages(page, tabPages, subPages);
   },
     // index專用
   [BBIM_ACTION](context, { page, cmd, param }) {
      
      if(!Utils.isIndexContext(context)) {
         //將事件發佈給index處理
         Utils.fireIndexEvent(BBIM_ACTION, { page, cmd, param });
         return;
      }

      context.dispatch(SOCKET_SEND, { page, cmd, param });
      
   },
   // index專用
   [BBIM_MESSAGE](context, { key, data, pages = null }) {
      console.log('BBIM_MESSAGE',BBIM_MESSAGE);
      console.log('BBIM_MESSAGE in plus module');
      console.log('key', key);
      console.log('pages', pages);
      console.log('data', data);
      if(Utils.isIndexContext(context)) {
         pages.forEach(name => {
            let webview = Utils.getWebviewById(name);
            Utils.firePageEvent(webview, BBIM_MESSAGE, {
               key,
               data
            });
         })
      }else {

      }
      
   }
   
};


const mutations = {
   [SET_PLUS_READY](state) {
      state.plusReady = true;
   },
   [SET_DEVICE_INFO](state, info) {
      console.log(SET_DEVICE_INFO, info);
      state.deviceInfo = info;
   }
};

export default {
   state,
   actions,
   mutations,
   getters
};
 