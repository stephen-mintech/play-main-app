import { FOR_ALL, GUEST_ONLY, USER_ONLY, ADMIN_ONLY } from './route.type';
const DEFAULT_PAGE_NAME = 'home';

var applinks = [
   {
      name: 'album',
      view: 'album.html',
      parent: 'my',
      meta: {
         order: 0,
         icon: 'bookmarks-outline',
         title: '我的相簿',
			tab: false
      } 
   },
   {
      name: 'skill',
      view: 'skill.html',
      parent: '',
      meta: {
         order: 0,
         title: '',
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
      parent: [],
      meta: {
         order: 0,
         icon: 'mdi-view-dashboard',
         title: 'Dashboard',
			tab: true
      } 
   },
     
];

adminlinks.forEach(item => item.meta.type = ADMIN_ONLY);

var guestLinks = [   
   {
      name: 'login',
      view: 'login.html',
      parent: '',
      meta: {
         order: 0,
         icon: 'person-outline',
         title: '登入',
         tab: false
      } 
   }
];

guestLinks.forEach(item => item.meta.type = GUEST_ONLY);

var userLinks = [
   {
      name: 'index',
      view: 'index.html',
      parent: '',
      meta: {
         order: 0
      } 
   },
	{
      name: 'home',
      view: 'home.html',
      parent: '',
      meta: {
         order: 0,
         icon: 'home-outline',
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
         icon: 'game-controller-a-outline',
         title: '動態',
			tab: true
      } 
   },
   {
      name: 'ranking',
      view: 'ranking.html',
      parent: '',
      meta: {
         order: 0,
         icon: 'heart',
         title: '排行',
			tab: true
      } 
   },
   {
      name: 'notices',
      view: 'notices.html',
      parent: '',
      meta: {
         order: 0,
         icon: 'email-outline',
         title: '消息',
			tab: true
      } 
   },
   {
      name: 'my',
      view: 'my.html',
      parent: '',
      subpages: ['profile'],
      meta: {
         order: 0,
         icon: 'person-outline',
         title: '我的',
			tab: true
      } 
   },
   {
      name: 'bulletin',
      view: 'bulletin.html',
      parent: 'notices',
      meta: {
         order: 0,
         icon: 'bell-outline',
         title: '官方公告',
			tab: false
      } 
   },
   {
      name: 'partners',
      view: 'partners.html',
      parent: '',
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
      parent: 'home',
      meta: {
         order: 0,
         icon: 'search',
         title: 'Demo',
         tab: false
      } 
   },
   {
      name: 'auth',
      view: 'auth.html',
      parent: '',
      meta: {
         order: 0,
         title: 'Auth',
         tab: false
      } 
	},
   
   {
      name: 'profile',
      view: 'profile.html',
      parent: 'my',
      meta: {
         order: 0,
         icon: '',
         title: '個人資料',
			tab: false
      } 
   },
   {
      name: 'bind-phone',
      view: 'bind-phone.html',
      parent: 'my',
      meta: {
         order: 0,
         title: '手機號碼綁定',
			tab: false
      } 
   },
   {
      name: 'bank-account',
      view: 'bank-account.html',
      parent: 'my',
      meta: {
         order: 0,
         icon: 'calculator-outline',
         title: '銀行帳戶',
			tab: false
      } 
   },
	{
      name: 'contact-us',
      view: 'contact-us.html',
      parent: 'my',
      meta: {
         order: 0,
         icon: 'briefcase-outline',
         title: '聯繫客服',
			tab: false
      } 
   },
   {
      name: 'join-partner',
      view: 'join-partner.html',
      parent: 'my',
      meta: {
         order: 0,
         icon: 'game-controller-b-outline',
         title: '加入陪練',
			tab: false
      } 
   },
   {
      name: 'orders',
      view: 'orders.html',
      parent: 'my',
      meta: {
         order: 0,
         icon: 'list-outline',
         title: '訂單中心',
			tab: false
      } 
   },
   {
      name: 'wallet',
      view: 'wallet.html',
      parent: 'my',
      meta: {
         order: 0,
         icon: 'briefcase-outline',
         title: '我的錢包',
			tab: false
      } 
   },
   
   
   {
      name: 'tutorial',
      view: 'tutorial.html',
      parent: 'my',
      meta: {
         order: 0,
         icon: 'book-outline',
         title: '新手教學',
			tab: false
      } 
   },
   {
      name: 'settings',
      view: 'settings.html',
      parent: 'my',
      meta: {
         order: 0,
         icon: 'gear-outline',
         title: '設置',
			tab: false
      } 
   },
   
];

userLinks.forEach(item => item.meta.type = USER_ONLY);

let appRoutes = applinks.concat(adminlinks)
					.concat(userLinks)
					.concat(guestLinks);

// for(let i = 0; i < appRoutes.length; i++){
//    appRoutes[i].meta.order = i;
// }
const getAllPages = () => appRoutes;


const getLinks = (user = null) => {
	if(user){
		return applinks.concat(userLinks);
	}else{
		return applinks.concat(guestLinks);
	}
}

const findPage = (name) => appRoutes.find(item => item.name.toLowerCase() === name.toLowerCase());

const getDefaultPage = (user = null) => {
   let links = getLinks(user);
   let name = 'home';
   if(DEFAULT_PAGE_NAME) name = DEFAULT_PAGE_NAME;
	return links.find(item => item.name === name);
}
const getRootPages = (user = null) => {
	let links = getLinks(user);
	return links.filter(item => item.parent.includes('index'));
}
const getMenuPages = (user = null) => {
	let links = getLinks(user);
	return links.filter(item => item.meta && item.meta.menu);
}

const getTabPages = (user = null) => {
   
	let links = getLinks(user);
	return links.filter(item => isTabPage(item));
}

const isTabPage = (page) => {
   if(page.meta && page.meta.tab) return page.meta.tab;
   else return false;
}

const getRouteType = (page) => page.meta.type;

const getSubPages = (parentPage, user = null) => {
   if(!parentPage.subpages) return [];
	let links = getLinks(user);
	return links.filter(item => parentPage.subpages.includes(item.name));
}

const getChildrenLinks = (parentPage, user = null) => {
   let links = getLinks(user);
	return links.filter(item => item.parent && item.parent === parentPage.name);
}



const findPageByPath = (path, user = null) => {
	let links = getLinks(user);
	return links.find(item => item.view === path);
}

export default {
   getAllPages, 
   findPage,
   getDefaultPage,
   getRootPages,
   getChildrenLinks,
   getSubPages,
   getTabPages,
   isTabPage,
   findPageByPath,
   getMenuPages,
   getRouteType
}
