<template>
	<div class="page-content">
		<van-tabs v-model="active" @change="onTabChanged">
         <van-tab v-for="(item, index) in categories" :key="index" :name="item.name" :title="item.title">
         </van-tab>
      </van-tabs>
      <section>
         <div class="bottom_wrapper">
            <div class="rankings_wrapper" style="width: 100%;">
               <div class="left rankings_item" style="height: auto; width: 100%; background-color: white;">
                  <div class="tab_wrapper" style="padding-bottom: 0px;">
                     <div class="tab_content" style="width: 50%; height: 3.5vh; display: flex; margin: 2vh auto;">
                        <div v-for="(item, index) in periods" :key="index" style="width: 100%; flex: 1 1 0%; line-height: 3.5vh; font-size: 2vh;"
                           @click="onPeriodSelected(item.name)" :class="{ 'tab_item': true, on: isActivePeriod(item.name) }" 
                        >
                           {{ item.title }}
                        </div>
                     </div>
                  </div>
                  <div class="list_wrapper" style="padding-top: 2px; background-color: white; height: auto;">
                     <div class="list_item">
                        <TopThree :models="topThree" />
                        <div class="bottom" style="height: auto;">
                           <ul class="list_bottom_wrapper">
                              <Item v-for="(item, index) in otherItems" :key="index" 
                                 :model="item"
                              />
                              
                           </ul>
                        </div>                    
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>  
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import TopThree from '@/components/ranking/TopThree';
import Item from '@/components/ranking/Item';

import { NavBar, Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);

export default {
   name: 'Ranking',
   components: {
      TopThree,
      Item
	},
   data() {
      return {
         active: 0,
         categories: [{
            name: 'hot', title: '人氣榜'
         },{
            name: 'rich', title: '富豪榜'
         },{
            name: 'gift', title: '禮物榜'
         },{
            name: 'red', title: '紅人榜'
         }],

         periods:[{
            name: 'week',
            title: '週榜'
         },{
            name: 'month',
            title: '月榜'
         },{
            name: 'total',
            title: '總榜'
         }],

         selectedPeriod: '',

         topThree: [{
            name: '朵滅🖤',
            src: 'https://hotfix.7cplay.com/zuzucustom/titleimg/729dd1af-6b02-4998-bae9-2d2196be3366.jpg_s',
            points: '1,713,950'
         },{
            name: '愛璃💕存單冠名',
            src: 'https://hotfix.7cplay.com/zuzucustom/titleimg/5cabf351-6788-49f7-9e0a-fcdb04178946.jpg_s',
            points: '1,323,389'
         },{
            name: '單雙菁英妃妃❤',
            src: 'https://hotfix.7cplay.com/zuzucustom/titleimg/729dd1af-6b02-4998-bae9-2d2196be3366.jpg_s',
            points: '1,263,179'
         }],

         otherItems: [{
            order: 4,
            name: '朵滅🖤',
            src: 'https://hotfix.7cplay.com/zuzucustom/titleimg/729dd1af-6b02-4998-bae9-2d2196be3366.jpg_s',
            points: '1,713,950'
         },{
            order: 5,
            name: '愛璃💕存單冠名',
            src: 'https://hotfix.7cplay.com/zuzucustom/titleimg/5cabf351-6788-49f7-9e0a-fcdb04178946.jpg_s',
            points: '1,323,389'
         },{
            order: 6,
            name: '單雙菁英妃妃❤',
            src: 'https://hotfix.7cplay.com/zuzucustom/titleimg/729dd1af-6b02-4998-bae9-2d2196be3366.jpg_s',
            points: '1,263,179'
         },{
            order: 4,
            name: '朵滅🖤',
            src: 'https://hotfix.7cplay.com/zuzucustom/titleimg/729dd1af-6b02-4998-bae9-2d2196be3366.jpg_s',
            points: '1,713,950'
         },{
            order: 5,
            name: '愛璃💕存單冠名',
            src: 'https://hotfix.7cplay.com/zuzucustom/titleimg/5cabf351-6788-49f7-9e0a-fcdb04178946.jpg_s',
            points: '1,323,389'
         },{
            order: 6,
            name: '單雙菁英妃妃❤',
            src: 'https://hotfix.7cplay.com/zuzucustom/titleimg/729dd1af-6b02-4998-bae9-2d2196be3366.jpg_s',
            points: '1,263,179'
         },{
            order: 4,
            name: '朵滅🖤',
            src: 'https://hotfix.7cplay.com/zuzucustom/titleimg/729dd1af-6b02-4998-bae9-2d2196be3366.jpg_s',
            points: '1,713,950'
         },{
            order: 5,
            name: '愛璃💕存單冠名',
            src: 'https://hotfix.7cplay.com/zuzucustom/titleimg/5cabf351-6788-49f7-9e0a-fcdb04178946.jpg_s',
            points: '1,323,389'
         },{
            order: 6,
            name: '單雙菁英妃妃❤',
            src: 'https://hotfix.7cplay.com/zuzucustom/titleimg/729dd1af-6b02-4998-bae9-2d2196be3366.jpg_s',
            points: '1,263,179'
         }],
      };
   },
   computed: {
      
   },
   created() {
      
   },
   mounted() {
      this.$nextTick(() => {
         this.init();
      });
   },
   methods: {
      init() {
         this.selectedPeriod = this.periods[0];
      },
      isActivePeriod(name) {
         return name === this.selectedPeriod.name;
      },
      onPeriodSelected(name) {
         this.selectedPeriod = this.periods.find(item => item.name === name)
      },
      onTabChanged() {

      }
   }
};
</script>



<style lang="scss" scoped>
@import '@/assets/scss/var';

.van-tabs.van-tabs--line {
   padding-top: $padding-main;
}

.rankings_wrapper {
   position : relative;
   font-size : 0;
}
</style>


