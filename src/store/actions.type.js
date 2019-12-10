//app.module
export const INIT = 'init';
export const SELECT_TAB = 'selectTab';

//plus.module
export const INIT_PLUS = 'initPlus';
export const PLUS_READY = 'plusReady';
export const INIT_WEBVIEW = 'initWebview';
export const INIT_COMPLETED = 'initCompleted';
export const ACTIVE_WEBVIEW = 'activeWebview';
export const UN_ACTIVE_WEBVIEW = 'unActiveWebview';
export const INDEX_EVENT = 'indexEvent';
export const PAGE_EVENT = 'pageEvent';
export const PRE_LOAD_WEBVIEW = 'preLoadWebview';
export const UNLOAD_WEBVIEW = 'unloadWebview';
export const PLUS_SELECT_TAB = 'plusSelectTab';
export const PLUS_TO_PAGE = 'plusToPage';
export const PLUS_OPEN_CHILD_PAGE = 'plusOpenChildPage';
export const PLUS_GO_BACK = 'plusGoBack';
export const SHOW_INDEX = 'showIndex';

//socket.module
export const SOCKET_CONNECTING = 'socketConnecting';
export const SOCKET_CONNECTED = 'socketConnected';
export const INIT_SOCKET = 'initSocket';
export const SOCKET_SEND = 'socketSend';
export const CLOSE_SOCKET = 'closeSocket';
export const BBIM_ACTION = 'bbimAction';
export const BBIM_MESSAGE = 'bbimMessage';

//auth.module
export const CHECK_AUTH = 'checkAuth';
export const OAUTH_LOGIN = 'oauthLogin';
export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const REFRESH_TOKEN = 'refreshToken';

//route.module
export const GO_TO_PAGE = 'goToPage';
export const GO_BACK = 'goBack';
export const TO_BIND_PHONE_PAGE = 'toBindPhonePage';
export const OPEN_CHILD_PAGE = 'openChildPage';

//bbim
export const GET_BANK_INFO = 'getBankInfo';
export const GET_MY_CERT = 'getMyCert';

//news.module
export const FETCH_NEWS = 'fetchNews';
export const GET_NEWS = 'getNews';

//notices.module
export const FETCH_NOTICES = 'fetchNotices';
export const GET_NOTICE = 'getNotice';

//phone.module
export const FETCH_AREA = 'fetchArea';
export const SEND_VCODE = 'sendVCode';
export const SUBMIT_PHONE_BIND = 'submitPhoneBind';

//bank.module
export const FETCH_BANK_INFOES = 'fetchBankInfoes';
export const BANK_INFOES_FETCHED = 'bankInfoesFetched';

//cert.module
export const FETCH_CERT_INFOES = 'fetchCertInfoes';
export const CERT_INFOES_FETCHED = 'certInfoesFetched';

export const FETCH_CATEGORIES = 'fetchCategories';
export const GET_CATEGORY = 'getCategory';

export const FETCH_PARTNERS = 'fetchPartners';
export const GET_PARTNER = 'getPartners';

