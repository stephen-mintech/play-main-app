<template>
   <div class="model-container" :style="`width:${width}`">
      <div class="model-box">
         <div class="cover" :style="getAvatarStyle(model)" >
            <div class="T_R"></div>
            <div class="T_Free1"></div>
            <div class="status-bar">
               <span class="rate-container">
                  <i v-for="(va,inx) in 5" :key="inx" :class="getStarStyle(model, inx)"></i>
                  {{ model.Rate }}     
               </span>
               <span :class="getStatusDotStyle(model)" style="float: right;">
               </span>
               <span v-if="model.Online" class="status-text" style="color:greenyellow;" >
                  線上
               </span>
               <span v-else class="status-text" style="color:white;" >
                  離線
               </span>
            </div>
         </div>
         <div class="name-container" binfo="name">
            <span :style="{color:(model.Color||'black')}" class="dot" :class="{nameshadow:(model.Color||'black' != 'black')}" style="max-width:70%;">
               {{ model.Name }}
            </span>  
            <span v-if="(hideNews) ? false : true" id="genderlab"
               :class="getGenderStyle(model)" style="padding:0 5px;line-height:14px"
            >
               <span style="font-size:10px">{{ model.Age }}</span>
            </span>
         </div>
         <div v-if="(hideNews) ? false : true" class="price-board">
            接單 {{ model.OrderTimes }}次
            <span class="price-text" > {{ model.Fee }}幣/ {{ model.Unit }}</span>
         </div>
         <div style="clear:both"></div>
         <div class="intro-board"> 
            <span v-if="!model.Title" style="visibility: hidden;">-</span>
            
            {{ model.Title }} 
         </div>
      </div>
   </div>
</template>

<script>

export default {
	name: 'PartnerItem',
	props: {
      model: Object,
      hideNews: Boolean,
      width: String
   },
	methods: {
      onSelected() {
         this.$emit('selected', this.model);
      },
      getAvatarStyle(model) {
         let src = `static/images/avatars/${model.Avatar}`;
         return `background-image: url(${src})`;
      },
      getStarStyle(model, index) {
         let val = model.Rate - (index + 1);
         if(val >= 0) return 'star fa fa-star';
         if(val <-0.5) return 'star fa fa-star-o';
         else return 'star fa fa-star-half-o';  
      },
      getStatusDotStyle(model) {
         if(model.Online) return 'status-dot light_online';
         else return 'status-dot light_offline';
      },
      getGenderStyle(model) {
         if(model.Gender == 'G') return 'ganlabel_g';
         if(model.Gender == 'B') return 'ganlabel_b';
         return 'ganlabel_n';
      }
   }
};
</script>


<style scoped>
.model-container {
   /* width : 45vw; */
   /* width : 50%; */
   padding-left:1%;
   display : inline-block;
   padding-bottom : 10px;
   position : relative
}
.model-box {
   width : 98%;
   background-color:white;
   border-radius : 10px;
   position : relative;
   overflow : hidden;
   padding-bottom : 5px
}
.rate-container {
   float : left;
   font-size : 1vh;
   line-height :2vh;
   color:white;
   padding-left : 5px
}
.name-container {
   padding-left : 10px;
   font-size : 12px;
   width : 100%;
   position : relative;
   white-space : nowrap
}

.list-container::-webkit-scrollbar { 
  display: none;
}

.list-container {
   width : 100%;
   overflow-x : auto;
   overflow-y : hidden;
   white-space : nowrap;
   padding-left : 1vw;
}
.cover {
   object-fit : cover;
   width : 100%;
   height : 22vh;
   border-radius : 10px;
   position : relative;
   background-position : top;
   background-size : cover;
}
.status-bar {
   overflow : hidden;
   position : relative;
   width : 100%;
   top : 20vh;
   height : 2vh;
   background-color:rgba(0,0,0,.3)
}

.status-dot {
   display : inline-block;   
   width : 1.2vh;
   height : 1.2vh;
   margin-top : 0.4vh;
   margin-right : 3px;
   border-radius : 999em;
}

.status-text {
   float : right;
   font-size : 1vh;
   line-height : 2vh;
   margin-right : 3px;
}
.price-board {
   padding-left : 10px;
   font-size : 10px;
   position : relative;
   color:gray;
   line-height:15px
}
.price-text {
   color:red;
   font-size : 10px;
   float :right;
   padding-right : 5px
}
.intro-board {
   padding-left : 10px;
   font-size : 10px;
   position : relative;
   color:gray;
   overflow : hidden;
   text-overflow : ellipsis;
   white-space : nowrap;
}

.dot {
   text-overflow : ellipsis;
   overflow : hidden;
   white-space : nowrap;
}
.T_R {
   position: absolute;
   top: 5px;
   right: -15px;
   /* 擺放位置 */
   width: 50px;
   height: 10px;
   background-color: #4084f6;
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
   /* 尺寸大小、顏色、陰影 */
   color: #fff;
   line-height: 10px;
   text-align: center;
   font-size: 8px;
   letter-spacing: 1.5px;
   /* 文字設定 */
   transform: rotate(45deg); /* 轉45度 */
}

.T_R:after {
   content: "推薦";
}

.T_T {
   position: absolute;
   top: 5px;
   right: -15px;
   /* 擺放位置 */
   width: 50px;
   height: 10px;
   background-color: #E53935;
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
   /* 尺寸大小、顏色、陰影 */
   color: #fff;
   line-height: 10px;
   text-align: center;
   font-size: 8px;
   letter-spacing: 1.5px;
   /* 文字設定 */
   transform: rotate(45deg); /* 轉45度 */
}

.T_T:after {
   content: "置頂";
}
.T_Free1 {
   position: absolute;
   top: 0px;
   left: -15px;
   /* 擺放位置 */
   width: 50px;
   height: 20px;
   background-color: #e32fc0;
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
   /* 尺寸大小、顏色、陰影 */
   color: #fff;
   line-height: 28px;
   vertical-align: bottom;
   text-align: center;
   font-size: 8px;
   letter-spacing: 1.5px;
   /* 文字設定 */
   transform: rotate(-45deg); /* 轉45度 */
}

.T_Free1:after {
      content: "可體驗";
}
.star {
   font-size : 10px;
   color:gold
}
.nameshadow {
   text-shadow : 2px 1px 0px rgba(0,0,0,0.25);
}


.light_online {
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#b4ddb4+0,83c783+17,52b152+33,008a00+67,005700+83,002400+100;Green+3D+%231 */
   background: rgb(180,221,180); /* Old browsers */
   background: -moz-radial-gradient(center, ellipse cover, rgba(180,221,180,1) 0%, rgba(131,199,131,1) 17%, rgba(82,177,82,1) 33%, rgba(0,138,0,1) 67%, rgba(0,87,0,1) 83%, rgba(0,36,0,1) 100%); /* FF3.6-15 */
   background: -webkit-radial-gradient(center, ellipse cover, rgba(180,221,180,1) 0%,rgba(131,199,131,1) 17%,rgba(82,177,82,1) 33%,rgba(0,138,0,1) 67%,rgba(0,87,0,1) 83%,rgba(0,36,0,1) 100%); /* Chrome10-25,Safari5.1-6 */
   background: radial-gradient(ellipse at center, rgba(180,221,180,1) 0%,rgba(131,199,131,1) 17%,rgba(82,177,82,1) 33%,rgba(0,138,0,1) 67%,rgba(0,87,0,1) 83%,rgba(0,36,0,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
   filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b4ddb4', endColorstr='#002400',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}
.light_offline {
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#cedce7+0,596a72+100;Grey+3D+%231 */
   background: rgb(206,220,231); /* Old browsers */
   background: -moz-radial-gradient(center, ellipse cover, rgba(206,220,231,1) 0%, rgba(89,106,114,1) 100%); /* FF3.6-15 */
   background: -webkit-radial-gradient(center, ellipse cover, rgba(206,220,231,1) 0%,rgba(89,106,114,1) 100%); /* Chrome10-25,Safari5.1-6 */
   background: radial-gradient(ellipse at center, rgba(206,220,231,1) 0%,rgba(89,106,114,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
   filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#cedce7', endColorstr='#596a72',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}
</style>