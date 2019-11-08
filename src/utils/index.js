import Qs from 'qs';

export const isPlus = () => navigator.userAgent.indexOf('Html5Plus') >= 0;


export const resolveErrorData = (error) => {
   console.error(error);
   if(!error) return null;
   if(error.status && error.status === 400) return error.data;
   return null; 
}

export const onError = (error) => {
   console.error(error);
   Bus.$emit('errors');
}

export const log = (data, name = '') => {
   if(name) console.log(`${name}: `, JSON.stringify(data));
   else console.log(JSON.stringify(data));
}

export const resolvePathName = () => {
   let pathname = window.location.pathname || '';
   
   if(pathname) return pathname.substr(pathname.lastIndexOf('/') + 1);
   return '';
}

export const getQuery = str => {
   if (typeof str !== 'string' || !str) {
     str = window.location.href;
   }
   return Qs.parse(str.substr(str.indexOf('?') + 1));
};

export * from './helper';
export * from './global';