import { INIT_PLUS, INIT_WEBVIEW, PLUS_READY, PRE_LOAD, GO_TO_PAGE, FETCH_TAB_PAGES, SELECT_TAB } from '@/store/actions.type';
import { SET_IS_PLUS, SET_PLUS_READY, SET_SUB_PAGES } from '@/store/mutations.type';
import { isPlus } from '@/utils';
import { APP_UI } from '@/config';


const initialState = {
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
      context.commit(SET_IS_PLUS, true);

      let subPages = Routes.getSubPages(page.name, user);
      context.commit(SET_SUB_PAGES, subPages);
      
      mui.plusReady(() => {
         //let indexView = getIndexWebview();
         //indexView.evalJS(`busEvent('test_name', 'testData')`);

         // var currentWebview = plus.webview.currentWebview();
         // for(let i = 0; i < subPages.length; i++) {
         //    let id = subPages[i].name;
         //    let url = subPages[i].view;
         //    let subWebview = plus.webview.getWebviewById(id);
         //    if(subWebview) {
               
         //    }else {
         //       subWebview = plus.webview.create(url, id);
         //    }

         //    subWebview.hide();
         //    currentWebview.append(subWebview);
         // }

         

         setStatusBarBg();

         // 隐藏滚动条
         plus.webview.currentWebview().setStyle({ scrollIndicator: 'none' });
         // 强制竖屏
         plus.screen.lockOrientation('portrait-primary');

         //获取当前页面所属的Webview窗口对象
         //let self = plus.webview.currentWebview();
         //console.log(self);
         //let secondWebview = plus.webview.getSecondWebview();
         //console.log(secondWebview);


         //console.log(plus.webview.all());
         context.commit(SET_PLUS_READY, true);
         Bus.$emit(PLUS_READY);    
      });
      
   },
   [INIT_WEBVIEW](context, showName) {
      let currentWebview = plus.webview.currentWebview();
      let secondWebview = plus.webview.getSecondWebview();
      if (secondWebview) currentWebview.append(secondWebview);

      let subPages = context.state.subPages;
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
   [PRE_LOAD](context) {
      console.log(PRE_LOAD);
      let subPages = context.state.subPages;
      console.log('subPages', subPages);
      subPages.forEach(page => {
         let id = page.name;
         let url = page.view;
         let view = mui.preload({
            id, url
         });
         console.log(view);
      })

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
   [GO_TO_PAGE](context, { user, page, currentPage }) {
      if(!isPlus()) return;

      if(!page.view) page = Routes.findPage(page.name);
      if(!page) Utils.pageNotFound(page.name);

      let id = page.name;
      console.log('id', id);

      if(pageLoaded(id)) {
         plus.webview.show(id, 'none');
      }else {
         plus.webview.show(id);
      }

      addLoadedPage(id);
 
       // 不使用hide无闪屏，但卡顿
      if(currentPage) {
         //console.log(currentPage);
         //if(currentPage.name !== 'index') plus.webview.hide(currentPage.name, 'none');         
      }else {
         // config.subpages.forEach(function(v) {
         //    if (v !== path) {
         //       plus.webview.hide(v, "none");
         //    }
         // });
      }



      //console.log('page:', page);
      //获取当前页面所属的Webview窗口对象
      //var currentWebview = plus.webview.currentWebview();
      //console.log('currentWebview', currentWebview);
      // let webview = plus.webview.getWebviewById(page.name);
      // if(webview) {
      //    webview.show();
      // }
     

      //console.log('all webviews:', plus.webview.all());
      
      //plus.webview.show(name);

      // let page = Routes.findPage(name);
      // if(!page) Utils.pageNotFound(name);

      // context.dispatch(CHECK_AUTH, page)
      // .then(result => {
      //    if(result.auth){
      //       context.dispatch(INIT, { page, user: result.user });
      //    } 
      //    else throw new Error('權限不足');
      // })
      // .catch(error => {
      //    console.log(error);
      // })
      
   }
};


const mutations = {
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
 