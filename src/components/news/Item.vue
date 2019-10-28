<template>
	
   <div class="mitem">
      <button v-if="false" type="button" style="float:right;z-index:10" class="weui-btn weui-btn_mini weui-btn_default">
         <i class="fa fa-x fa-trash-o"></i>
      </button>
      <div style="width:100%;height:20px;color:gray;margin-bottom:10px;position:relative">
         <img :src="`static/images/avatars/${model.partner.Avatar}`" style="margin:10px 0px 0px 10px;width:30px;height:30px;object-fit:cover;border-radius:999em;float:left" />
         
         <div :style="{color:'black'}" class="name-container">
            {{ model.partner.Name }}
            <br>
            <span :class="getGenderStyle(model)" style="padding:0 5px;float:left;line-height:14px">
               <span style="font-size:10px">{{ model.partner.Age }}</span>
            </span>
         </div>
      </div>
      <div class="either-gif-or-video" style="max-width:96%;left:2%;width:96%;height:auto;max-height:600px;overflow-y:hidden;position : relative;padding-bottom:0px;padding-top:10px">
         
         <img :src="`static/images/photoes/${model.partner.Photo}`" style="object-fit:cover;position:relative;left:50%;transform:translateX(-50%);width:100%;height:100%">
      </div>
      <p class="weui-grid__label2">
         <span class="span-content">
            {{ model.content }}
         </span>
         <span style="color:gray;font-size:12px;float:right">

         </span>
      </p>
      <div class="skillinfo" style="width:100%;text-align:center;">
         <span class="skilllabel" style="width:80%;display:inline-block;text-overflow: ellipsis;overflow:hidden;white-space:nowrap">
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
@import "@/assets/scss/var";

.mitem {
   //width: 95%;
   //padding-left: 2.5%;
   margin-bottom: 30px;
   background-color: rgba(255, 255, 255, 0.6);
   text-align: center;
   padding: px2rem(7px) 0 px2rem(7px);
}
.weui-grid__label2 {
   text-align: left;
   color: #000000;
   font-size: 14px;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
   overflow: hidden;
}
.name-container {
   padding-top : 5px;
   padding-left : 10px;
   font-size : 12px;
   max-width : 50%;
   float : left;
   transform:translateY(10%);
}
.span-content {
   padding-left: 2%;
   width : 90%;
   display : inline-block;
   text-overflow : ellipsis;
   overflow : hidden;
   white-space : nowrap
}
.skilllabel {
   margin: 0 auto;
   padding: 5px 10px;
   text-align: center;
   font-size: 12px;
   border-radius: 3em;
   background-color: rgb(196, 246, 252);
   color: blue;
}
</style>

 
