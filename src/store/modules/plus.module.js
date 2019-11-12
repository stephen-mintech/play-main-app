import { INIT_PLUS, INIT_WEBVIEW, ACTIVE_WEBVIEW, UN_ACTIVE_WEBVIEW,
   INDEX_EVENT, PAGE_EVENT, PLUS_READY, PRE_LOAD_WEBVIEW,
   UNLOAD_WEBVIEW, PLUS_TO_PAGE, PLUS_GO_BACK   
} from '@/store/actions.type';

import { SET_PAGE, SET_IS_PLUS, SET_PLUS_READY, SET_INIT_COMPLETE,
   SET_CURRENT_PAGE, SET_SUB_PAGES, SET_TAB_PAGES, SET_ACTIVE_TAB   
} from '@/store/mutations.type';

import { APP_UI } from '@/config';


const initialState = {
   page: null,
   isPlus: false,
   plusReady: false,
   subPages: []
};

export const state = { ...initialState };

const getters = {
   isPlus() {
      return state.isPlus;
   },
   plusReady() {
      return state.plusReady;
   },
   subPages() {
      return state.subPages;
   }
};

var loadedPages = ['home'];

const pageLoaded = (name) => loadedPages.includes(name);

const addLoadedPage = (name) => loadedPages.push(name);

const getPage = (data) =>  {
   if(!page.view) page = Routes.findPage(page.name);
   if(!page) Utils.pageNotFound(page.name);
   return page;
} 

const isIndexContext = (context) => {
   if(!context.state.page) return false;
   return context.state.page.name === 'index';
}


const config = {
   statusbar: APP_UI.statusbarColor,
};

const setStatusBarBg = (color, style) => {
   // 设置系统状态栏背景
   plus.navigator.setStatusBarBackground(color || config.statusbar);
   //plus.navigator.setStatusBarStyle(style || 'light');
}

const getAppid = () => plus.runtime.appid;

const getIndexWebview = () => plus.webview.getWebviewById(getAppid());

const actions = {
   [INIT_PLUS](context, { user, page }) {
      console.log(INIT_PLUS);
      console.log('user',user);
      console.log('page',page);
      context.commit(SET_PAGE, page);
      context.commit(SET_IS_PLUS, true);

      let subPages = Routes.getSubPages(page.name, user);
      context.commit(SET_SUB_PAGES, subPages);


      mui.plusReady(() => {
         
         setStatusBarBg();
         
         // 隐藏滚动条
         plus.webview.currentWebview().setStyle({ scrollIndicator: 'none' });
         // 强制竖屏
         plus.screen.lockOrientation('portrait-primary');
         
         if(isIndexContext(context)) context.dispatch(INIT_WEBVIEW, 'home');
         else context.dispatch(PRE_LOAD_WEBVIEW, { subPages });
         

         context.commit(SET_PLUS_READY, true);
         context.commit(SET_INIT_COMPLETE, true);
         Bus.$emit(PLUS_READY);
      });
      
      if(isIndexContext(context)) {
         let tabPages = Routes.getTabPages(user);
         context.commit(SET_TAB_PAGES, tabPages);
         context.commit(SET_ACTIVE_TAB, tabPages[0]);

         context.commit(SET_CURRENT_PAGE, tabPages[0]);
      }
      
      
      
   },
   [INIT_WEBVIEW](context, showName) {
      let currentWebview = plus.webview.currentWebview();
      let secondWebview = plus.webview.getSecondWebview();
      if (secondWebview) currentWebview.append(secondWebview);

      let subPages = context.state.subPages;
      //預先載入菜單頁面
      for(let i = 0; i < subPages.length; i++) {
         let id = subPages[i].name;
         let url = subPages[i].view;
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
      
   },
   [PRE_LOAD_WEBVIEW](context, { subPages }) {
      
      if(!isIndexContext(context)) {
         //將事件發佈給index處理
         context.dispatch(INDEX_EVENT, {
            name: PRE_LOAD_WEBVIEW,
            data: { subPages }
         });

         return;
      }

      console.log(PRE_LOAD_WEBVIEW);

      //context.dispatch(UNLOAD_WEBVIEW, subPages);
     
      //預先載入子頁面
      subPages.forEach(page => {
         let id = page.name;
         let url = page.view;
         let view = mui.preload({
            id, url
         });
         //console.log(view);
      })

      

      

      //關閉不需要的子頁面

      // pages.forEach(pagepath => {
      //    let page = mui.preload({
      //       url: pagepath,
      //       id: pagepath, // 默认使用当前页面的url作为id
      //       styles: {
      //          // render: "always" // 一直渲染
      //       },
      //       extras: {} // 自定义扩展参数
      //    });

      //    result.push(page);
   },
   [UNLOAD_WEBVIEW](context, subPages) {
      console.log(UNLOAD_WEBVIEW);
      console.log('subPages', subPages);
     
      let reserve = [getAppid(), 'home'];
      //保留currentPage子頁面
      let subs = subPages.map(item => item.name);
      //保留菜單頁面
      let tabs = context.getters.tabPages.map(item => item.name);

      reserve = [getAppid()].concat(subs).concat(tabs);
      console.log('reserve', reserve);
      let unloadViews = plus.webview.all().filter(item => !reserve.includes(item.id));
      console.log('unloadViews', unloadViews);
      unloadViews.forEach(view => view.close());
   },
   [INDEX_EVENT](context, { name, data }) {
      let indexView = getIndexWebview();
      indexView.evalJS(`${INDEX_EVENT}('${name}', ${JSON.stringify(data)})`);
   },
   [PAGE_EVENT](context, { webview, name, data }) {
      webview.evalJS(`${PAGE_EVENT}('${webview.id}', '${name}', ${JSON.stringify(data)})`);
   },
   [PLUS_TO_PAGE](context, page) {
      if(!isIndexContext(context)) {
         //將事件發佈給index處理
         context.dispatch(INDEX_EVENT, {
            name: PLUS_TO_PAGE,
            data: page
         });

         return;
      }

      let lastPage = context.getters.lastPage;
      console.log('lastPage', lastPage);
      //將事件傳遞到last，關閉該頁面         
      // context.dispatch(PAGE_EVENT, {
      //    webview: plus.webview.getWebviewById(lastPage.name),
      //    name: UN_ACTIVE_WEBVIEW,
      //    data: {}
      // });


      context.commit(SET_CURRENT_PAGE, page);

      console.log(PLUS_TO_PAGE);
      console.log('page',page);
         
      let id = page.name;

      let webview = plus.webview.getWebviewById(id);
      if(!webview) webview = plus.webview.create(page.view, id);

      console.log('webview', webview);

      //將事件傳遞到目標頁面，啟動該頁面         
      context.dispatch(PAGE_EVENT, {
         webview,
         name: ACTIVE_WEBVIEW,
         data: {}
      });

      webview.show();
      
      
      return;

      // 不使用hide无闪屏，但卡顿
      if(currentPage) {
         console.log('currentPage', currentPage);
         if(currentPage.name !== 'index') plus.webview.hide(currentPage.name, 'none');         
      }else {
         // config.subpages.forEach(function(v) {
         //    if (v !== path) {
         //       plus.webview.hide(v, "none");
         //    }
         // });
      }
      
   },
   [PLUS_GO_BACK](context) {

      if(isIndexContext(context)) {
         context.commit(SET_CURRENT_PAGE, context.getters.lastPage);
      }else {
         mui.back();
         //將事件發佈給index處理
         context.dispatch(INDEX_EVENT, {
            name: PLUS_GO_BACK,
            data: {}
         });
      }
      
   }
};


const mutations = {
   [SET_PAGE](state, page) {
      state.page = page;
      console.log(SET_PAGE);
      console.log('state.page',state.page);
   },
   [SET_IS_PLUS](state, isPlus) {
      if(isPlus)  console.log('支持5+ API');
      else console.log('不支持5+ API');

      state.isPlus = isPlus;
   },
   [SET_PLUS_READY](state, val) {
      state.plusReady = val;
   },
   [SET_SUB_PAGES](state, subPages) {
      state.subPages = subPages;
   }   
};

export default {
   state,
   actions,
   mutations,
   getters
};
 