<template>
   <div>
      <div class="skill-bg" style="background: url('http://hotfix.7cplay.com/zuzucustom/certificationimg/fb10b706-5d45-49f6-9897-5e5491e204ef/6.jpg') center center / cover no-repeat;">

      </div>
      <div style="height: 222px; top: -222px; margin-bottom: -222px;">
         <div class="player-titlebar" style="display: flex; width: 85%; height: 60px; color: white; text-align: left; position: relative; bottom: 80px; overflow-y: hidden; padding: 5px 15px;">
            <div style="flex: 1 1 0%;">
               <p style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap; padding-bottom: 5px;">
                 英雄聯盟
               </p>
               <h4 style="position: relative; padding-top: 0px;">
                  <i alt="" class="fa fa-2x  fa-star-o" style="font-size: 18px; color: gold;"></i>
                  <i alt="" class="fa fa-2x  fa-star-o" style="font-size: 18px; color: gold;"></i>
                  <i alt="" class="fa fa-2x  fa-star-o" style="font-size: 18px; color: gold;"></i>
                  <i alt="" class="fa fa-2x  fa-star-o" style="font-size: 18px; color: gold;"></i>
                  <i alt="" class="fa fa-2x  fa-star-o" style="font-size: 18px; color: gold;"></i>

                  (0)
               </h4>
            </div>
            <div style="flex: 1 1 0%; text-align: right;">
               <p class="weui-media-box__desc" style="color: white; padding-top: 10px;">
                            接單 0 次
               </p>
               <p style="color: gold; padding-top: 10px;">
                            150幣/單
               </p>
            </div>
         </div>
         <img class="skillbghide" style="max-width: 100%; height: auto; max-height: 500px; visibility: hidden; object-fit: cover; display: none;" src="http://hotfix.7cplay.com/zuzucustom/certificationimg/fb10b706-5d45-49f6-9897-5e5491e204ef/6.jpg" alt="">
      </div>
      <van-panel>
         <a class="media-box media-box_appmsg" >
         
            <div class="media-box__hd" style="margin: 0;">
               <img src="http://hotfix.7cplay.com/zuzucustom/titleimg/390da882-6ecf-4d87-bf09-83b018b79447.jpg" style="object-fit: cover; border-radius: 999em; width: 50px; height: 50px;">
            </div>
            <div style="flex: 1;min-width: 0;">
               <h4 class="media-box__title" style="color: rgb(0, 0, 255);">涵涵❤️鏡瓜好可愛
                  <span style="font-size: 12px; color: lightgreen;">正在線上</span>
               </h4>
               <p class="media-box__desc">
                  <Gender :age="26" gender="g" />
               </p>
            </div>
            <div class="media-box__ft" >
               <van-button size="small" plain type="primary" round>關注</van-button>
            </div>
         </a>
      </van-panel>
      <van-panel>
         <div style="padding: 14px 15px 10px;">
            <div style="color: #808080;">          
            周一、二、三、四、五、六、日 | 全天可接單
            </div>            
            <br>
            <!-- <div> -->
              <p  style="color: black; font-size: 14px; line-height: 18px;">
                 S2開始打的玩家
               </p>
               <p style="color: black; font-size: 14px; line-height: 18px;">
                  最愛打JG跟SUP  本尊 單雙鑽石三 彈性鑽四
               </p>
               <p  style="color: black; font-size: 14px; line-height: 18px;">
                  全部牌位都能夠陪打~ 
               </p>
            <!-- </div> -->
         </div>
      </van-panel>
   </div>
</template>

<script>
import { INIT_SOCKET } from '@/store/actions.type';

import Gender from '@/components/Gender';
import { Panel, Button } from 'vant';
Vue.use(Panel).use(Button);

export default {
   name: 'Skill',
   components: {
      Gender
	},
   data() {
      return {
         name: 'Skill'
      };
   },
   beforeMount() {
       this.$store.dispatch(INIT_SOCKET)
   },
   methods: {

   }
}
</script>


<style lang="scss" scoped>
@import '@/assets/scss/media';
.van-cell {
 padding-top : 0;
}
.skill-bg {
   height : 222px;
   position : static;
   top : 0px;
   left : 0px;
}
.player-titlebar {
   background-color: rgba(100,100,100, 0.3);
}

</style>