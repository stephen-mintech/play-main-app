import SocketService from '@/services/socket.service';
import { SOCKET_URL } from '@/config';

import { INIT_SOCKET, SOCKET_CONNECTING, SOCKET_CONNECTED,
   SOCKET_SEND, BBIM_MESSAGE, CLOSE_SOCKET, SHOW_INDEX 
} from '@/store/actions.type';

import { SET_SOCKET_INITIALIZED, SET_SOCKET_CONNECTING, SET_SOCKET_CONNECTED
} from '@/store/mutations.type';

const initialState = {
   initialized: false,
   connecting: false,
   connected: false
};

export const state = { ...initialState };

var _context;
var socketService;

const getters = {
   
};


const actions = {
   [INIT_SOCKET](context, { url, uuid, token }) {
      _context = context;
      if(!socketService){
         socketService = new SocketService(url, uuid, token);
         context.commit(SET_SOCKET_INITIALIZED);
         
         socketService.on(BBIM_MESSAGE, (data) => {
            _context.dispatch(BBIM_MESSAGE, data);
         });
         socketService.on(SOCKET_CONNECTING, () => {
            _context.dispatch(SOCKET_CONNECTING);
         });
         socketService.on(SOCKET_CONNECTED, () => {
            _context.dispatch(SOCKET_CONNECTED);
            Bus.$emit(SOCKET_CONNECTED);
         })
      }
   },
   [SOCKET_CONNECTING](context) {
      
      context.commit(SET_SOCKET_CONNECTING, true);
      context.commit(SET_SOCKET_CONNECTED, false);
      if(Utils.isIndexContext(context)) {
         plus.webview.all().forEach(view => {
            Utils.firePageEvent(view, SOCKET_CONNECTING);
         });
      }
     
   },
   [SOCKET_CONNECTED](context) {
      
      context.commit(SET_SOCKET_CONNECTING, false);
      context.commit(SET_SOCKET_CONNECTED, true);

      if(Utils.isIndexContext(context)) {
         plus.webview.all().forEach(view => {
            Utils.firePageEvent(view, SOCKET_CONNECTED);
         });
      }
     
   },
   [SOCKET_SEND](context, { page, cmd, param }) {
      console.log(SOCKET_SEND);
      console.log('page', page);
      console.log('cmd', cmd);
      console.log('param', param);
      
      socketService.send(page, cmd, param);
     
   },
   // index專用
   [CLOSE_SOCKET](context) {
      if(!Utils.isIndexContext(context)) {
         //將事件發佈給index處理
         Utils.fireIndexEvent(CLOSE_SOCKET);
         return;
      }
      socketService.close();
   }
};


const mutations = {
   [SET_SOCKET_INITIALIZED](state) {
      state.initialized = true;
   },
   [SET_SOCKET_CONNECTING](state, val) {
      state.connecting = val;
   },
   [SET_SOCKET_CONNECTED](state, val) {
      state.connected = val;
   }
};

export default {
   state,
   actions,
   mutations,
   getters
};
 