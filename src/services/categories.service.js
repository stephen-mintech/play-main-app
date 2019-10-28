import BaseService from '@/common/baseService';
import { SITE_URL } from '@/config';
import categories from '@/mock/categories';
//const source =`${SITE_URL}/api/admin/recruits`;
//const source = 'https://newsapi.org/v2/everything';

//const fetch = (params) => BaseService.fetch(source, params);
const fetch = (params) => new Promise((resolve) => {
   setTimeout(() => {
      resolve(categories);
   }, 500);
})

//const get = (id) => BaseService.fetch(`${source}/${id}`);

const get = (id) => new Promise((resolve) => {
   setTimeout(() => {
      let category = categories.find(item => item.id === id);
      resolve(category);
   }, 500);
})

export default { fetch, get };