
import variables from '@/assets/scss/var.scss';

const mainColor = variables.colorMain;
const barHeight = variables.barHeight;

export const APP_UI = {
   barHeight: barHeight,
   top: '0px', //设置距离顶部的距离
   bottom: '49px', //设置距离底部的距离
   statusbarColor: '#000000',
   mainColor: mainColor,
   aniShow : 'pop-in',
};

export const NAVBAR_UI = {
   height: barHeight,
   backgroundColor: mainColor
};

export const PULL_REFRESH_UI = {
   style: 'circle',
   offset: '44px', // 可选 默认0px,下拉刷新控件的起始位置
   color: '#eb2000'
};

export const LOADING_UI = {
   color: '#1989fa'
};

export const NAME_COLORS = [
   { SN: 0, color: 'black' },
   { SN: 1, color: '#009f8b' },
   { SN: 2, color: '#00FF00' },
   { SN: 3, color: '#0000FF' },
   { SN: 4, color: '#ff8224' },
   { SN: 5, color: '#ff249a' },
   { SN: 6, color: '#00abc0' },
   { SN: 7, color: '#045f00' },
   { SN: 8, color: '#7f34da' },
];