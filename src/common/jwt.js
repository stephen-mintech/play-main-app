import { IS_PLUS } from '@/config';

const ID_TOKEN_KEY = 'id_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const getStorage = () => {
   if(IS_PLUS) return plus.storage;
   else return window.localStorage;
}

const getToken = () => getStorage().getItem(ID_TOKEN_KEY);


const getRefreshToken = () => getStorage().getItem(REFRESH_TOKEN_KEY);

const saveToken = (token, refreshToken) => {
   getStorage().setItem(ID_TOKEN_KEY, token);
   getStorage().setItem(REFRESH_TOKEN_KEY, refreshToken);
};

const destroyToken = () => {
   getStorage().removeItem(ID_TOKEN_KEY);
   getStorage().removeItem(REFRESH_TOKEN_KEY);
};

const tokenStatus = () => {
   let token = getToken();
   if(!token) return -1;

   // let claims = jwtDecode(token);
   // let exp = moment.unix(claims.exp);
   // let now = moment.utc();
   // let diff = exp.diff(now, 'minutes');

   // if(diff <= 0) return -1;  //過期
   // if(diff < 30) return 0; //即將到期
   return 1;
};


export default { 
   getToken, 
   getRefreshToken, 
   saveToken, 
   destroyToken, 
   tokenStatus
};
