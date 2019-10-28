import { FOR_ALL, GUEST_ONLY, USER_ONLY, ADMIN_ONLY } from './route.type';
import { DEFAULT_PAGE_NAME } from '@/config';

var applinks = [
	{
      name: 'home',
      view: 'home.html',
      parent: '',
      meta: {
         order: 0,
         icon: 'home-o',
         title: '首頁',
			tab: true
      } 
   },
   {
      name: 'news',
      view: 'news.html',
      parent: '',
      meta: {
         order: 0,
         icon: 'newspaper-o',
         title: '動態',
			tab: true
      } 
   },
   {
      name: 'notices',
      view: 'notices.html',
      parent: '',
      meta: {
         order: 0,
         icon: 'envelop-o',
         title: '消息',
			tab: true
      } 
   },
   {
      name: 'partners',
      view: 'partners.html',
      parent: 'home',
      meta: {
         order: 0,
         title: '傾聽師',
			tab: false
      } 
   },
   {
      name: 'article',
      view: 'article.html',
      parent: 'news',
      meta: {
         order: 0,
			tab: false
      } 
   },
   {
      name: 'chat',
      view: 'chat.html',
      parent: '',
      meta: {
         order: 0,
         title: '交談',
			tab: false
      } 
   },
   {
      name: 'categories',
      view: 'categories.html',
      parent: '',
      meta: {
         order: 0,
         icon: 'search',
         title: '全部分類',
         tab: false
      } 
	},
	{
      name: 'demo',
      view: 'demo.html',
      parent: '',
      meta: {
         order: 0,
         icon: 'search',
         title: 'Demo',
         tab: false
      } 
	},
	
];

applinks.forEach(item => item.meta.type = FOR_ALL);

var adminlinks = [
   {
      name: 'Dashboard',
      path: '/dashboard',
      view: 'Dashboard',
      parent: '',
      meta: {
         order: 0,
         icon: 'mdi-view-dashboard',
         title: 'Dashboard',
			tab: true
      } 
   }   
];

adminlinks.forEach(item => item.meta.type = ADMIN_ONLY);

var guestLinks = [   
   {
      name: 'login',
      view: 'login.html',
      parent: '',
      meta: {
         order: 0,
         icon: 'manager-o',
         title: '登入',
         tab: true
      } 
   }
];

guestLinks.forEach(item => item.meta.type = GUEST_ONLY);

var userLinks = [
   {
      name: 'my',
      view: 'my.html',
      parent: '',
      meta: {
         order: 0,
         icon: 'manager-o',
         title: '我的',
			tab: true
      } 
   },
	{
      name: 'Profile',
      path: '/profile',
      view: 'profile',
      parent: '',
      meta: {
         order: 0,
         icon: 'mdi-view-dashboard',
         title: 'Profile'
      } 
   }
];

userLinks.forEach(item => item.meta.type = USER_ONLY);

let appRoutes = applinks.concat(adminlinks)
					.concat(userLinks)
					.concat(guestLinks);

// for(let i = 0; i < appRoutes.length; i++){
//    appRoutes[i].meta.order = i;
// }



const getLinks = (user = null) => {
	if(user){
		return applinks.concat(userLinks);
	}else{
		return applinks.concat(guestLinks);
	}
}

const findPage = (name) => appRoutes.find(item => item.name === name);

const getDefaultPage = (user = null) => {
   let links = getLinks(user);
   let name = 'home';
   if(DEFAULT_PAGE_NAME) name = DEFAULT_PAGE_NAME;
	return links.find(item => item.name === name);
}

const getMenuPages = (user = null) => {
	let links = getLinks(user);
	return links.filter(item => item.meta && item.meta.menu);
}

const getTabPages = (user = null) => {
	let links = getLinks(user);
	return links.filter(item => item.meta && item.meta.tab);
}

const getSubPages = (parent, user = null) => {
	let links = getLinks(user);
	return links.filter(item => item.parent && item.parent === parent);
}



const findPageByPath = (path, user = null) => {
	let links = getLinks(user);
	return links.find(item => item.view === path);
}

export default {
   findPage,
   getDefaultPage,
   getSubPages,
   getTabPages,
   findPageByPath,
   getMenuPages
}
