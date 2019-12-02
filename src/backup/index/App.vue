<template>
	<div id="app" v-if="ready">
		
		<MFooter />
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { INDEX_EVENT, PLUS_READY, INIT_WEBVIEW,
	GO_TO_PAGE 
} from '@/store/actions.type';

import { isPlus } from '@/utils';
import MFooter from '@/components/FootTab';

export default {
	name: 'App',
	components: {
		MFooter
	},
	data() {
		return {
			name: 'index',
			isPlus: isPlus()			
		};
	},
	computed: {
      ...mapGetters(['initCompleted', 'plusReady']),
      ready() {
         if(this.isPlus) return this.plusReady;
         return this.initCompleted;
      }
   },
	created() {
		if(this.isPlus) {
			window.addEventListener(INDEX_EVENT, this.indexEventHandler);

			Bus.$on(PLUS_READY, () => {
				let homePage = { name: 'home' };
				this.$store.dispatch(INIT_WEBVIEW, homePage.name);
				
				this.$store.dispatch(GO_TO_PAGE, homePage);

				plus.navigator.closeSplashscreen();
				// 关闭全屏
				plus.navigator.setFullscreen(false);
			});
		}

		Utils.onPageCreated(this);
	},
	methods: {
		indexEventHandler(e) {
			let name = e.detail.name;
			this.$store.dispatch(name, e.detail.data);
		},
		goPage(e){
			console.log('goPage in vue', e);
			//e.detail
		}
	}
};
</script>


<style lang="scss">
@import "@/assets/scss/base.scss";
</style>