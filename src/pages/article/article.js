import '@/main';
import store from '@/store';
import App from './App';

new Vue({
   store,
	render: h => h(App)
}).$mount('#app');
