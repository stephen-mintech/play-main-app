(function(global, undefined) {
   console.log('begin PageManager');
   if(global.PageManager) return;

   var config = {
      subpages: [],
      barHeight: 44,
      top: '0px',
      bottom: '49px',
      keys: {
        token: 'ml.login.token',
        guide: 'ml.index.guide'
      },
      statusbar: '#eb2000',
      aniShow: 'pop-in',
      titleNView: {
        titleSize: '18px',
        autoBackButton: true,
        titleColor: '#ffffff',
        backgroundColor: '#eb2000'
      }
   };

   // 已经加载的页面
   var loadedPage = { 'home': true };

   var isPlus = false;
   // 判断runtime是否支持5+ API
   if(navigator.userAgent.indexOf('Html5Plus') < 0){
      //不支持5+ API
      console.log('不支持5+ API');
   }else{
      //支持5+ API
      console.log('支持5+ API');
      isPlus = true;
   }

   /**
	* 本地存储
	*/
   var storage = (function() {
      return isPlus && typeof plus !== 'undefined'
        ? plus.storage
        : global.localStorage;
    })();
   

   /**
	* 初始化页面
   */
   
   function initPage() {
      console.log('initPage');
      //取消浏览器的所有事件，使得active的样式在手机上正常生效
      // document.addEventListener('touchstart', function () {
      //    return false;
      // },
      //    true
      // );

      // 禁止选择
      // document.oncontextmenu = function () {
      //    return false;
      // };

      if(isPlus){
         plusReady(function () {
            console.log('init page currentWebview id:' + plus.webview.currentWebview().id);
            // 隐藏滚动条
            plus.webview.currentWebview().setStyle({ scrollIndicator: 'none' });
            // 强制竖屏
            plus.screen.lockOrientation('portrait-primary');
         });
      }
   }

   /**
   * 主页面容器
   * @param {Number} index 页面索引
   */
   function initWebview(subPages, index) {
      console.log('initWebview ');
      return;
      console.log('initWebview index:' , index);
      console.log('initWebview subPages:' , JSON.stringify(subPages));
      if(!isPlus) return;

      //设置默认打开首页显示的子页序号；
      if(!index) index = 0;

      //所有的plus-*方法写在mui.plusReady中或者后面。
      mui.plusReady(function () {
         // 状态栏颜色
         setStatusBarBg();

         //获取当前页面所属的Webview窗口对象
         var self = plus.webview.currentWebview();
         console.log('self', JSON.stringify(self));

         var secondWebview = plus.webview.getSecondWebview();
         if (secondWebview) self.append(secondWebview);
         console.log('secondWebview', JSON.stringify(secondWebview));

         for(var i = 1; i < subPages.length; i++) {
            // 除secondWebview外的subpages
            // 创建webview子页
            console.log('subPages[i]',subPages[i]);
            var sub = plus.webview.create(
               subPages[i].view, //子页url
               subPages[i].name, //子页id
               {
                  top: config.top, //设置距离顶部的距离
                  bottom: config.bottom, //设置距离底部的距离
                  // bounce: i == 1 ? 'vertical' : 'none',
                  render: 'always',
                  // bounceBackground: '#FFFFFF',
                  scrollIndicator: 'none',
                  statusbar: {}
               }
            );
            // 如不是我们设置的默认的子页则隐藏，否则添加到窗口中
            if (i != index) sub.hide();
            // 将webview对象填充到窗口
            self.append(sub);
         }
      });
   }

   function setStatusBarBg(color, style) {
      console.log('setStatusBarBg');
      // 设置系统状态栏背景
      plus.navigator.setStatusBarBackground(color || config.statusbar);
      plus.navigator.setStatusBarStyle(style || 'light');
   }

   function floatWebview(url, opt) {
      var floatw = plus.webview.getWebviewById(url);
      console.log('floatWebview url: ', url);
      console.log('floatWebview floatw: ', floatw);
      if(floatw) {
        // 避免快速多次点击创建多个窗口
        floatw.show('fade-in');
      }else {
         floatw = plus.webview.create(
            url,
            url,
            {
               background: 'transparent',
               zindex: 99
            },
            (opt && opt.extras) || null
         );
         floatw.show('fade-in');
      }
   }

   /**
   * 切换tabbar
   * @param {String} path
   */
   function switchTab(name, oldName) {
      console.log('switchTab');
      if(typeof plus !== 'undefined') {
         if(loadedPage[name]) {
            plus.webview.show(name, 'none');
         }else {
            console.log('aniShow :' + name);
            plus.webview.show(name);
         }
         // 标记为已加载
         loadedPage[name] = true;

         // 不使用hide无闪屏，但卡顿
         if(oldName) {
            plus.webview.hide(oldName, 'none');
         }else {
            config.subpages.forEach(function (v) {
               if(v !== name) {
                  plus.webview.hide(v, 'none');
               }
            });
         }
      }else {
         window.location.href = path;
      }
   }

   /**
   * 返回主页
   */
   function goHome() {
      console.log('goHome');
      switchTab('home.html');
      invoke('Hbuilder', 'index_update_tab', {
         path: 'home.html'
      });

      plusReady(function () {
         invoke(plus.runtime.appid, 'index_update_tab', {
            path: 'home.html'
         });
      });
   }

   function openWindow(url, options) {
      console.log('openWindow');
      if(!url) return;
  
      var styles = {};
      var extras = {};
  
      if(options && typeof options.styles === 'object') {
         styles = Object.assign(styles, options.styles);
      }
  
      if(options && typeof options.extras === 'object') {
         extras = Object.assign(extras, options.extras);
      }
  
      // id为url去掉hash和query
      var id = url;
      if(id.indexOf('#') !== -1) {
        id = id.substring(0, id.indexOf('#'));
      }
      if(id.indexOf('?') !== -1) {
        id = id.substring(0, id.indexOf('?'));
      }
  
      mui.openWindow({
         url: url,
         id: id,
         extras: extras,
         styles: styles,
         show: {
            aniShow: (options && options.aniShow) || config.aniShow
         },
         waiting: {
            autoShow: false
         }
      });
   }

   function openWindowWithTitle(url, options) {
      console.log('openWindowWithTitle');
      if(!options) options = {};
  
      if(!options.styles) options.styles = {};
      if(!options.styles.titleNView) options.styles.titleNView = {};
  
      Object.assign(options.styles.titleNView, config.titleNView);
  
      openWindow(url, options);
   }

   /**
   * plusready or execute
   * @param {Function} fn
   */
   function plusReady(fn) {
      if(isPlus)  return mui.plusReady(fn);     
      else {
         setTimeout(function () {
            fn && fn();
         }, 0);
      }
   }

   function preLoad(pages) {
      console.log('preLoad');
      if(!pages) return;

      if(pages.length && isPlus) {
         mui.plusReady(function() {
            for (var i = 0; i < pages.length; i++) {
               mui.preload({
                  id: pages[i].name,
                  url: pages[i].view,
                  styles: {
                     // render: "always" // 一直渲染
                  },
                  extras: {} // 自定义扩展参数
               })
            }
         });
      }
   }

   // 封装mui.fire
   var invoke = function (name, event, data) {
      if(!isPlus) return;
      console.log('invoke');
      plusReady(function () {
         var page = plus.webview.getWebviewById(name);
         console.log('invoke page', JSON.stringify(page));
         mui.fire(page, event, data);
      });
   };

   var invokeAll = function(event, data) {
      if(!isPlus) return;
      console.log('invokeAll');
      var pages = plus.webview.all();
      if (pages.length) {
         for (var i = 0; i < pages.length; i++) {
            mui.fire(pages[i], event, data);
         }
      }
   };

   var PageManager = {
      initPage: initPage,
      initWebview: initWebview,
      switchTab: switchTab,
      isPlus: isPlus,
      floatWebview: floatWebview,
      storage: storage,
      config: config,
      plusReady: plusReady,
      preLoad: preLoad,
      openWindow: openWindow,
      openWindowWithTitle: openWindowWithTitle,
      invoke: invoke,
      invokeAll: invokeAll,
      goHome: goHome,
      setStatusBarBg: setStatusBarBg
   };
  
   global.PageManager = PageManager;

})(window, undefined);
  
//PageManager.initPage();