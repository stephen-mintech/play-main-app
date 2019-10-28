<template>
	<div class="page-content nav-content">
		<van-nav-bar title="文章" fixed left-arrow @click-left="goBack" />
		<!-- <article v-if="article" v-show="ready" class="content">
			<h2 class="title"> {{ article.title }} </h2>
      	<div v-html="article.content" class="content-html"></div>
		</article> -->
   </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import { GET_NEWS } from '@/store/actions.type';
import mui from 'mui';
import PageManager from 'page-manager';
import { PULL_REFRESH_UI } from '@/config';
import { log } from '@/utils';

import { NavBar, Grid, GridItem, Image, Toast, ImagePreview } from 'vant';

Vue.use(NavBar).use(Grid).use(GridItem).use(Image);

export default {
	name: 'Article',
	props: {
		id: String
	},
   data() {
      return {
         ready: false
         
      };
	},
	watch: {
      id(val) {
			log(val, 'watch id');
         this.fetchData();
      }
   },
   computed: {
      ...mapState({
			article: state => state.news.article
		}),
		...mapGetters(['isPlus'])
   },
   created() {
		if(this.isPlus) {
			PageManager.plusReady(() => {
				let self = plus.webview.currentWebview();
				self.addEventListener('hide', () => {
					this.clear();
				});
			});
		}
	},
	beforeMount() {
		this.fetchData();
	},
   methods: {
      init() {
         
		},
		fetchData() {
			if(!this.id) return;
			
         this.$store.dispatch(GET_NEWS, this.id)
			.then(() => {
				this.ready = true;
			})
			.catch(error => {
				console.error('has-error:',error);
			})
		},
		clear() {
			this.ready = false;
		},
		goBack() {
			mui.back();
		},
      goInfo() {

      }
   }
};
</script>

<style lang="scss" >
@import "@/assets/scss/var";
.content-html {
	word-break: break-all;
	min-height: 100px;
	line-height: 24px;
	font-size: 16px;
	p {
		margin-bottom: 10px;
	}
	pre {
		overflow-x: auto;
	}
	img {
		max-width: 100%;
		height: auto;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-size: 1.17em;
		-webkit-margin-before: 1em;
		-webkit-margin-after: 1em;
	}
}
</style>

<style lang="scss" scoped>
@import "@/assets/scss/var";
@import "@/assets/scss/common";
.content {
	padding: 0 $padding-main 40px;
	font-size: 14px;
	color: $color-gray;
	line-height: 22px;
}

.title {
	font-size: 20px;
	color: #000;
	margin: 10px 0;
	line-height: 24px;
}
</style>