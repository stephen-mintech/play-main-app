import BaseService from '@/common/baseService';
import { SITE_URL } from '@/config';
import fakePartners from '@/mock/partners';

//const fetch = (params) => BaseService.fetch(source, params);
const fetch = (params) => new Promise((resolve) => {
   setTimeout(() => {
      if(params && params.category){
         let partners = fakePartners.filter(partner => partner.CategoryIds.includes(params.category));
         resolve(partners);
      }else resolve(fakePartners);
   }, 500);
})

//const get = (id) => BaseService.fetch(`${source}/${id}`);

const get = (id) => new Promise((resolve) => {
   setTimeout(() => {
      let partner = fakePartners.find(item => item._id === id);
      resolve(partner);
   }, 500);
})

export default { fetch, get };