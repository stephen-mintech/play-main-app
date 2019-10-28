<template>
	<div id="app">
		<MFooter />
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import MFooter from '@/components/FootTab';
import PageManager from 'page-manager';

export default {
	name: 'App',
	components: {
		MFooter
	},
	data() {
		return {
			
		};
	},
	computed: {
		...mapGetters(['currentUser', 'activeTabName']),
		...mapState({
			tabPages: state => state.app.tabPages,
			activeTab: state => state.app.activeTab
      }),
   },
	created() {
		PageManager.plusReady(() => {
			if(PageManager.isPlus) {
				
				let subPages = this.tabPages;
				PageManager.initWebview(subPages);

				// 关闭splash页面；
				plus.navigator.closeSplashscreen();
				// 关闭全屏
				plus.navigator.setFullscreen(false);
				
			}else {
				window.location.href = 'home.html';
			}

		});
	},
	methods: {
		
	}
};
</script>


<style lang="scss">
@import "@/assets/scss/base.scss";
</style>
