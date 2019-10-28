export const removeWhiteSpaces = (strVal) => strVal.replace(/\s/g,'');

export const isSmallScreen = () => window.innerWidth < 991;

export const tryParseInt = (val) => val ? parseInt(val) : 0;

export const isEmptyObject = (obj) => {
   if (obj == null) return true;

   // Assume if it has a length property with a non-zero value
   // that that property is correct.
   if (obj.length > 0)    return false;
   if (obj.length === 0)  return true;

   // If it isn't an object at this point
   // it is empty, but it can't be anything *but* empty
   // Is it empty?  Depends on your application.
   if (typeof obj !== 'object') return true;

   // Otherwise, does it have any properties of its own?
   // Note that this doesn't handle
   // toString and valueOf enumeration bugs in IE < 9
   for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
   }

   return true;
}

export const isTrue = (val) => {
   if (typeof val === 'boolean') return val;
   if (typeof val === 'number') return val > 0;
   if (typeof val === 'string') {
      if (val.toLowerCase() === 'true') return true
      if (val === '1') return true
      return false
   }
   return false
}

export const buildQuery = (url, params) => {
   if(!params || isEmptyObject(params)) return url;
   url += '?';
   for (let field in params) {
      let value = params[field];
      url += `${field}=${value}&`;
   }
   return url.substr(0, url.length - 1);
}

export const getElementId = (id) => `#${id}`;

export const pageNotFound = (name) => {
   throw new Error(`page name: ${name} not found`);
}