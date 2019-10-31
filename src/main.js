import Vue from 'vue';

// import './plugins/fontawesome';
//import 'vue-ionicons/ionicons.css';
//import '@/styles/css/app/app.css';

import '@/assets/css/ionicons/ionicons.min.css';

//import AllIosIcon from 'vue-ionicons/dist/ionicons-ios.js'
//Vue.use(AllIosIcon)



window.Bus = new Vue({});
window.Vue = Vue;

Vue.config.productionTip = false;

import routes from  '@/routes';
window.Routes = routes;

import * as utils from  '@/utils';
window.Utils = utils;