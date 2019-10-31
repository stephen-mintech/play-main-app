<template>
	
   <div class="mitem">
      <button v-if="false" type="button" style="float:right;z-index:10">
         <i class="fa fa-x fa-trash-o"></i>
      </button>
      <div class="profile-container">
         <img :src="`static/images/avatars/${model.partner.Avatar}`" class="avatar-item" />
         
         <div :style="{color:'black'}" class="name-container">
            <span style="line-height: 20px;">
               {{ model.partner.Name }}
            </span>
            <br>
            <span :class="getGenderStyle(model)" style="padding:0 5px;float:left;line-height:14px">
               <span style="font-size:10px">{{ model.partner.Age }}</span>
            </span>
         </div>
      </div>
      <div class="either-gif-or-video media-container">
         <img class="medis-item" :src="`static/images/photoes/${model.partner.Photo}`">
      </div>
      <p class="content-container">
         <span class="span-content">
            {{ model.content }}
         </span>
         <span style="color:gray;font-size:12px;float:right">

         </span>
      </p>
      <div class="skill-info">
         <span class="skill-label" >
            {{ model.partner.categories[0].title }} {{ model.partner.Fee }}幣/{{ model.partner.Unit }}
         </span>
      </div>
   </div>
   
</template>

<script>
import { Lazyload } from 'vant';
Vue.use(Lazyload);

export default {
	name: 'NewsItem',
	props: {
		model: Object
	},
	methods: {
      onSelected() {
         this.$emit('selected', this.model);
      },
      getGenderStyle(item) {
         if(item.Gender == 'G') return 'ganlabel_g';
         if(item.Gender == 'B') return 'ganlabel_b';
         return 'ganlabel_n';
      }
   }
};
</script>



<style lang="scss" scoped>
$left-space : 2%;
.mitem {
   //width: 95%;
   //padding-left: 2.5%;
   margin-bottom: 30px;
   background-color: rgba(255, 255, 255, 0.6);
   text-align: center;
   padding: px2rem(7px) 0 px2rem(7px);
}
.profile-container {
   width : 100%;
   height : 20px;
   color :gray;
   margin-bottom : 10px;
   position : relative
}
.avatar-item {
   margin :10px 0px 0px 10px;
   width : 30px;
   height : 30px;
   object-fit : cover;
   border-radius : 999em;
   float : left;
}
.name-container {
   padding-left : 10px;
   font-size : 12px;
   max-width : 50%;
   float : left;
   transform:translateY(10%);
}
.media-container {
   max-width : 96%;
   left : $left-space;
   width : 96%;
   height:auto;
   max-height : 600px;
   overflow-y:hidden;
   position : relative;
   padding-bottom: 0px;
   padding-top: 10px
}
.media-item {
   object-fit : cover;
   position : relative;
   left : 50%;
   transform : translateX(-50%);
   width :100%;
   height:100%;
}
.content-container {
   padding-top: 10px;
   text-align: left;
   color: #000000;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
   overflow: hidden;
}
.span-content {
   padding-left: $left-space;
   width : 90%;
   display : inline-block;
   text-overflow : ellipsis;
   overflow : hidden;
   white-space : nowrap
}
.skill-info {
   padding-top : 10px;
   width : 100%;
   text-align : center;
}
.skill-label {
   margin: 0 auto;
   padding: 5px 10px;
   text-align: center;
   font-size: 12px;
   border-radius: 3em;
   background-color: rgb(196, 246, 252);
   color: blue;
   width : 80%;
   display : inline-block;
   text-overflow : ellipsis;
   overflow : hidden;
   white-space : nowrap
}
</style>

 
