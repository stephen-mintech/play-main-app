import { FOR_ALL, GUEST_ONLY, USER_ONLY, ADMIN_ONLY } from './route.type';

const applinks = [{
   name: 'Auth',
   path: '/auth',
   view: 'Auth',
   parent: '',
   meta: {
      type: FOR_ALL,
      menu: false
   } 
},{
   name: 'Forbidden',
   path: '/forbidden',
   view: 'Forbidden',
   parent: '',
   meta: {
      type: FOR_ALL,
      menu: false
   }
}];

const adminlinks = [
   {
      name: 'Dashboard',
      path: '/dashboard',
      view: 'Dashboard',
      parent: '',
      meta: {
         order: 0,
         icon: 'mdi-view-dashboard',
         title: 'Dashboard',
         type: ADMIN_ONLY,
         menu: true
      } 
   },
   {
      name: 'SubDashboard',
      path: '/subdashboard',
      view: 'SubDashboard',
      parent: 'Dashboard',
      meta: {
         order: 0,
         icon: 'mdi-city-variant-outline',
         title: 'SubDashboard',
         type: ADMIN_ONLY,
         menu: true
      } 
   },
   {
      name: 'Subjects',
      path: '/subjects',
      view: 'Subjects',
      parent: '',
      meta: {
         order: 0,
         icon: 'mdi-view-dashboard',
         title: '科目',
         type: ADMIN_ONLY,
         menu: true
      } 
   },
   {
      name: 'Terms',
      path: '/terms',
      view: 'Terms',
      parent: 'Subjects',
      meta: {
         order: 0,
         icon: 'mdi-city-variant-outline',
         title: '條文內容',
         type: ADMIN_ONLY,
         menu: true
      } 
   },
   {
      name: 'Questions',
      path: '/questions',
      view: 'Questions',
      parent: '',
      meta: {
         order: 0,
         icon: 'mdi-city-variant-outline',
         title: '題庫',
         type: ADMIN_ONLY,
         menu: true
      } 
   },
      
];

const guestLinks = [{
   name: 'Login',
   path: '/login',
   view: 'Login',
   parent: 'Dashboard',
   meta: {
      icon: 'mdi-cloud-outline',
      title: 'Login',
      type: GUEST_ONLY,
      menu: true
   } 
}];

const userLinks = [];

let appRoutes = applinks.concat(adminlinks).concat(guestLinks);

for(let i = 0; i < appRoutes.length; i++){
   appRoutes[i].meta.order = i;
}

export default appRoutes;