import Vue from 'vue';

//import './plugins/fontawesome';
import '@/styles/css/app/app.css';
import '@/styles/css/font-awesome/css/font-awesome.css';


window.Bus = new Vue({});
window.Vue = Vue;

Vue.config.productionTip = false;

import routes from  '@/routes';
window.Routes = routes;

import * as utils from  '@/utils';
window.Utils = utils;