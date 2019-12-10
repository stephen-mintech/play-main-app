import Vue from 'vue';
import Vuex from 'vuex';

import plus from './modules/plus.module';
import socket from './modules/socket.module';
import app from './modules/app.module';
import route from './modules/route.module';
import auth from './modules/auth.module';
import home from './modules/home.module';
import news from './modules/news.module';
import notices from './modules/notices.module';
import phone from './modules/phone.module';
import bank from './modules/bank.module';
import cert from './modules/cert.module';
import partners from './modules/partners.module';
import categories from './modules/categories.module';

Vue.use(Vuex);

export default new Vuex.Store({
   modules: {
      plus,
      socket,
      app,
      route,
      auth,
      home,
      news,
      notices,
      phone,
      bank,
      cert,
      partners,
      categories
   }
});
