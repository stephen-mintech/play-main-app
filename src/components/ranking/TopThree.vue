<template>
   <div class="top" style="height: 38vh; background-size: 100% 30%;">
      <ul class="list_top_wrapper" style="display: flex;">
         <li v-for="(item, index) in models" :key="index" class="list_top_item url_point"
            :style="getContainerStyle(index)"
         >
            <div class="logo_wrapper">
               <Avatar :src="item.src" class_name="logo"
                  style_text="object-fit: contain; object-position: center center; width: 18vw; height: 18vw;"
               />               
               <img class="logo_frame" style="height:auto;width:100%;object-fit:cover;top : 50%;transform : translateY(-50%);" 
                  :src="getCrownImage(index)"
               >
            </div> 
            <span class="text" style="font-size: 2vh; margin-top: 1vh; margin-bottom: 0px;">
               {{ item.name }}
            </span>
            <div>
               <div class="hot_wrapper" style="margin-top: 0px;">
                  <span class="icon" style="height: 2vh; width: 2vh;">
                  </span>
                  <span class="hot_text" style="font-size: 2vh;">
                      {{ item.points }}
                  </span>
               </div>
            </div>
         </li>
      </ul>
   </div>
</template>

<script>

import Avatar from '@/components/Avatar';

export default {
   name: 'RankingTopThree',
   components: {
		Avatar
	},
	props: {
      models: Array
   },
	methods: {
      getContainerStyle(index) {
         index += 1;
         if(index === 1) return 'height: 50%; top: 20%; background-color: transparent; flex: 1 1 0%; width: 33.333%; left: 50%; transform: translateX(-50%); overflow: visible;';
         if(index === 2) return 'height: 50%; top: 25%; background-color: transparent; width: 33.333%; flex: 1 1 0%; left: 0px; overflow: visible;';
         if(index === 3) return 'height: 50%; top: 30%; background-color: transparent; width: 33.333%; flex: 1 1 0%; right: 0px; overflow: visible;';
      },
      getCrownImage(index) {
         index += 1;
         return `static/img/index_v2/ico_num_${index}.png`;
         
      },
   }
};
</script>