<template>
<div>
   <div style="margin:6px">
      <LabelBar  />
      {{ category.title }}
      <span @click="more" class="more">更多</span>
   </div>
   
   <div class="list-container">
      <PartnersItem v-for="(item, index) in partners" :key="index"
         :model="item" :width="'45vw'"
      />
   </div>
</div>
</template>

<script>
import PartnersItem from '@/components/partners/Item';
import LabelBar from '@/components/LabelBar';

export default {
   name: 'HomeSlideList',
   props: {
      category: Object,
      title: String,
      partners: Array,
      hideNews: Boolean
   },
   components: {
      LabelBar,
		PartnersItem
	},
   beforeMount() {
      // for(let i=0; i<20; i++){
      //    this.partners.push({
      //       Name: '由達大師',
      //    Age: 25,
      //    Gender: 'B',
      //    Rate: 4.5,
      //    Online: true,
      //    Photo: 'https://img.yzcdn.cn/vant/cat.jpeg',
      //    Color: '',
      //    OrderTimes: 3,
      //    Fee: 50,
      //    Unit: '1小時',
      //    Title: 'Hello world~'
      //    });
      // }
   },
   data() {
      return {
         //partners: []
         
      };
   },
   methods: {
      getAvatarStyle(item) {
         let src = `static/images/avatars/${item.Avatar}`;
         return `background-image: url(${src})`;
      },
      getStarStyle(item, index) {
         let val = item.Rate - (index + 1);
         if(val >= 0) return 'star fa fa-star';
         if(val <-0.5) return 'star fa fa-star-o';
         else return 'star fa fa-star-half-o';  
      },
      getStatusDotStyle(item) {
         if(item.Online) return 'status-dot light_online';
         else return 'status-dot light_offline';
      },
      getGenderStyle(item) {
         if(item.Gender == 'G') return 'ganlabel_g';
         if(item.Gender == 'B') return 'ganlabel_b';
         return 'ganlabel_n';
      },
      more() {
         this.$emit('more', this.category);
      }
   }
} 

</script>

<style scoped>
.menu-container {
   font-size : 16px;
   color:black;
   margin-top:5px;
   padding-left:2%
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
.more {
   float : right;
   color :#576B95;
}

</style>