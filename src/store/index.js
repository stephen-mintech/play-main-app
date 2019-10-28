import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app.module';
import auth from './modules/auth.module';
import home from './modules/home.module';
import news from './modules/news.module';
import partners from './modules/partners.module';
import categories from './modules/categories.module';

Vue.use(Vuex);

export default new Vuex.Store({
   modules: {
      app,
      auth,
      home,
      news,
      partners,
      categories
   }
});
