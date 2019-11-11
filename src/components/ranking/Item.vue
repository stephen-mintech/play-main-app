<template>
   <li class="list_bottom_item url_point" style="display: flex; width: 100%;">
      <i class="num_wrapper" style="flex: 0 0 7vw; height: 7vw; margin: 0px; top: 50%; position: relative; transform: translateY(-50%);">
         <i class="num_item" style="width: 80%; font-size: 4vw; margin: 0px; height: 80%; top: 50%; transform: translateY(-50%); position: relative;">
            <i class="num" style="line-height: 5.6vw; font-size: 4vw;">
              {{ model.order }}  
            </i>
         </i>  
      </i>
      <div class="logo_wrapper" style="flex: 0 0 7vh; height: 7vh; margin: 0px; transform: translateY(-50%); top: 50%; position: relative;">
         <Avatar :src="model.src" class_name="logo"
            style_text="object-fit: contain; object-position: center center; width: 100%; height: 100%;"
         />
      </div>
      <div class="info_wrapper" style="flex: 1 1 0%;">
         <span class="nick_name" style="margin: 0px; height: 100%; line-height: 5vh; width: 100%; font-size: 2vh;">
         凱蒂🎀下單私窗呦
         </span>
      </div>
      <div class="right_wrapper" style="flex: 0 0 30vw; display: block; float: none; line-height: 5vh; margin: 0px;">
         <div class="right_box" style="width: 100%;">
            <div class="right_content">
               <div class="hot_wrapper" style="text-align: right;">
                  <span class="hot_text" style="font-size: 2vh;">163,249</span>
                  <span class="icon" style="font-size: 2vh;"> 人氣值</span>
               </div>
            </div>
         </div>
      </div>
   </li>
</template>

<script>

import Avatar from '@/components/Avatar';

export default {
   name: 'RankingItem',
   components: {
		Avatar
	},
	props: {
      model: Object
   },
	methods: {
      
   }
};
</script>