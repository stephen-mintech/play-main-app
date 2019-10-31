<template>
	<div class="page-content">
      <van-nav-bar title="Demo" fixed />
		<!-- <section class="cell-wrap">
			
		</section> -->
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { FETCH_NEWS } from '@/store/actions.type';
import mui from 'mui';
import PageManager from 'page-manager';
import { PULL_REFRESH_UI } from '@/config';

import { NavBar, Grid, GridItem, Image, Toast, ImagePreview } from 'vant';

Vue.use(NavBar).use(Grid).use(GridItem).use(Image).use(ImagePreview);

export default {
   name: 'Demo',
   data() {
      return {
         
         
      };
   },
   computed: {
      ...mapState({
			newsList: state => state.news.list
		}),
		...mapGetters(['isPlus'])
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
         
      },
      showShade() {
			PageManager.floatWebview('shade.html')
		},
		showToast() {
			Toast('泥融飞燕子，沙暖睡鸳鸯。')
		},
		showActionSheet() {
			let options = {
				cancel: '取消',
				buttons: [{ title: '选项一' }, { title: '选项二' }]
			};
			plus.nativeUI.actionSheet(options, e => {
				console.log(e);
				Toast(`已选${e.index}`)
			});
		},
		viewImg() {
			ImagePreview({
				images: [
					'https://img.yzcdn.cn/vant/apple-1.jpg',
					'https://img.yzcdn.cn/vant/apple-2.jpg'
				],
				startPosition: 0,
				onClose() {
					Toast('closed');
				}
			});
		},
      goInfo() {

      }
   }
};
</script>

<style lang="scss" scoped>

@import '@/assets/scss/var';
@import '@/assets/scss/common';
.page-content {
  padding-bottom: 20px;
  position: relative;
}
.cell-wrap {
	padding: $padding-main;
	.list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-between;
	}
}
.title-text {
	padding-bottom:1em
}
</style>