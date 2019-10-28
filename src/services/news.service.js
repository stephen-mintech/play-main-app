import BaseService from '@/common/baseService';
import { SITE_URL } from '@/config';
import fakeNews from '@/mock/news';
import fakePartners from '@/mock/partners';
import categories from '@/mock/categories';
//const source =`${SITE_URL}/api/admin/recruits`;
//const source = 'https://newsapi.org/v2/everything';

//const fetch = (params) => BaseService.fetch(source, params);
const fetch = (params) => new Promise((resolve) => {
   setTimeout(() => {
      fakeNews.forEach(item => {
         let partner = fakePartners.find(partner => partner.id === item.partnerId);
         if(partner){
            partner.categories = categories.filter(category => partner.CategoryIds.includes(category.id));
         }
         item.partner = partner;
      });
      resolve(fakeNews);
   }, 500);
})

//const get = (id) => BaseService.fetch(`${source}/${id}`);

const get = (id) => new Promise((resolve) => {
   setTimeout(() => {
      let article = fakeNews.find(item => item._id === id);
      resolve(article);
   }, 500);
})

export default { fetch, get };