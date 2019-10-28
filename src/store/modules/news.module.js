import NewsService from '@/services/news.service';

import { FETCH_NEWS, GET_NEWS } from '@/store/actions.type';
import { SET_LOADING, SET_NEWS, SET_ARTICLE_NEWS } from '@/store/mutations.type';


const initialState = {
   loading: false,
   list: [],
   article: null
};

export const state = { ...initialState };
 
const getters = {
   
};


const actions = {
   [FETCH_NEWS](context, params) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         NewsService.fetch(params)
            .then(news => {
               context.commit(SET_NEWS, news);
               resolve(news);
            })
            .catch(error => {
               reject(error);
            })
            .finally(() => { 
               context.commit(SET_LOADING, false);
            });
      });
   },
   [GET_NEWS](context, id) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         NewsService.get(id)
            .then(data => {
               context.commit(SET_ARTICLE_NEWS, data);
               resolve(data);
            })
            .catch(error => {
               reject(error);
            })
            .finally(() => { 
               context.commit(SET_LOADING, false);
            });
      });
   }
};


const mutations = {
   [SET_NEWS](state, news) {
      state.list = news;
   },
   [SET_ARTICLE_NEWS](state, article) {
      state.article = article;
   }
};

export default {
   state,
   actions,
   mutations,
   getters
};
 