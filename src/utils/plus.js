import { 
   INDEX_EVENT, PAGE_EVENT 
} from '@/store/actions.type';

const indexPageId = 'index';

export const getAppid = () => plus.runtime.appid;

export const getWebviewById = (id) => {
   if(id === indexPageId) id = getAppid();

   return plus.webview.getWebviewById(id);
}

export const getIndexWebview = () => plus.webview.getWebviewById(getAppid());

export const isIndexPage = (page) => page.name === indexPageId;

export const isIndexContext = (context) => {
   if(!context.getters.page) return false;
   return context.getters.page.name === indexPageId;
}

export const fireIndexEvent = (name, data = {}) => {
   console.log('fireIndexEvent');
   console.log('name', name);
   console.log('data', data);
   let indexView = getIndexWebview();
   mui.fire(indexView, INDEX_EVENT, {
      name,
      data
   });
}

export const firePageEvent = (webview, name, data = {}) => {
   mui.fire(webview, PAGE_EVENT, {
      name,
      data
   });
}