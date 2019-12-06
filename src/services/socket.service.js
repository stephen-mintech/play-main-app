import { EventEmitter } from 'events';

import { SOCKET_CONNECTING, SOCKET_CONNECTED, BBIM_MESSAGE } from '@/store/actions.type';

class SocketService extends EventEmitter {
   constructor(url, uuid, token) {
      super();
      this.url = url;
      this.uuid = uuid;
      this.token = token;
      this.socket = null;
      this.callbacks = {};

      this.connect();

      
   }

   connect() {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = (e) => {
         console.log('Socket is opened');
         this.init();
      }

      this.socket.onmessage = (e) => {
         this.onMessage(e);
      }

      this.socket.onerror = (err) => {
         this.onError(err);
      }

      this.socket.onclose = (e) => {
         console.log('Socket is closed. Reconnect will be attempted in 3 second.', e.reason);
         console.log(e);

         let isValid = this.handleSocketException(e);
         console.log('isValid', isValid);
         if(isValid) {
            //重新連線
            console.log('重新連線');
            this.emit(SOCKET_CONNECTING);
            setTimeout(()=> {
               this.connect();
            }, 3000);
         }
      }
   }

   init() {
      let data = {
         cmd: 'init',
         key: this.uuid,
         param: this.token
      };
      try {
         this.socket.send(JSON.stringify(data));
         this.emit(SOCKET_CONNECTED);
      } catch (e) {
         console.error('init socket failed.', e)
      }
      
   }

   close() {
      this.socket.close();
   }

   

   send(page, cmd, param) {
      let data = {
         cmd, 
         param
      };
      this.socket.send(JSON.stringify(data));

      this.addCallback(cmd, page);
   }

   addCallback(cmd, page) {
      let key = cmd;
      if(this.callbacks.hasOwnProperty(key)) {
         if(this.callbacks[key].includes(page.name)) return;
         else this.callbacks[key].push(page.name);
      }else {
         this.callbacks[key] = [page.name];
      }
   }

   findCallback(cmd) {
      let key = cmd;
      if(this.callbacks.hasOwnProperty(key)) {
         return {
            key, pages: this.callbacks[key]
         };
      }else {
         if(key.endsWith('_r')){
           let cleanKey = key.replace('_r', '');
           if(this.callbacks.hasOwnProperty(cleanKey)) return { key: cleanKey, pages: this.callbacks[cleanKey] };
           else return null;
         } else return null;
      }
   }

   onMessage(e) {
      //console.log('onMessage', e);
      let data = JSON.parse(e.data);
      console.log('onMessage', data);

      
      if(data.cmd) {
         let callback = this.findCallback(data.cmd);
         if(callback) {
            let key = callback.key;
            let pages = callback.pages;
            this.emit(BBIM_MESSAGE, { key, pages, data });
         }
      }
      
   }

   onError(err) {
      console.error('Socket error: ', err.message);      
      this.socket.close();
   }

   handleSocketException(e) {
      if(!e.reason) return true;

      if(e.reason.split('|')[0] === 'muti') {
         // var li = plus.webview.all().filter(e => ((e != plus.webview.getLaunchWebview()) && (e.id != "BBIM")));
         // for (var i = 0; i < li.length; i++) { li[i].close() }
         // var ip = e.reason.split("|")[1];
         // plus.webview.getLaunchWebview().evalJS('alert("帳號被強登 對方IP:' + ip+'");Bridge.LogOut();')
         
         
         return false;
      }else if(e.reason === '帳號被停權') {
         return false;
      }else if(e.reason === '帳號密碼錯誤') {
         return false;
      }else {
         return false;
      }

      
   }
}


export default  SocketService;