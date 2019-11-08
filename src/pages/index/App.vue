<template>
	<div id="app" v-if="ready">
		
		<MFooter />
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { PLUS_READY, INIT_WEBVIEW, GO_TO_PAGE } from '@/store/actions.type';
import MFooter from '@/components/FootTab';

export default {
	name: 'App',
	components: {
		MFooter
	},
	data() {
		return {
			name: 'index'
		};
	},
	computed: {
      ...mapGetters(['isPlus', 'initComplete', 'plusReady']),
      ready() {
         if(this.isPlus) return this.plusReady;
         return this.initComplete;
      }
   },
	created() {
		window.addEventListener('bus', this.busEventHandler);

		Utils.onPageCreated(this);


		Bus.$on(PLUS_READY, () => {
			let showWebviewName = 'home';
			this.$store.dispatch(INIT_WEBVIEW, showWebviewName);

			plus.navigator.closeSplashscreen();
			// 关闭全屏
			plus.navigator.setFullscreen(false);
		});
		
	},
	methods: {
		busEventHandler(e) {
			console.log('payload in vue', e.detail	);
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
