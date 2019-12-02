<template>
	<div id="app" v-if="initCompleted">
		<MFooter />
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { INDEX_EVENT, INIT_COMPLETED, 
	GO_TO_PAGE, ACTIVE_WEBVIEW 
} from '@/store/actions.type';


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
      ...mapGetters(['initCompleted', 'isPlus'])
   },
	created() {
		if(this.isPlus) {
         window.addEventListener(INDEX_EVENT, this.indexEventHandler);
		}
		
		Utils.onPageCreated(this);

		Bus.$on(INIT_COMPLETED, () => {
				
			this.$store.dispatch(GO_TO_PAGE, { name: 'home'});

			this.onInitCompleted();
		});

		
	},
	methods: {
		indexEventHandler(e) {
			console.log('indexEventHandler', e);
			let name = e.detail.name;
			let data = e.detail.data;
			if(name === ACTIVE_WEBVIEW) {
				this.onPageActive(data.page);
				
			}else this.$store.dispatch(name, data);
			
		},
		onPageActive(page) {
			if(page.name === 'login') this.onInitCompleted();
		},
		onInitCompleted() {
			if(this.isPlus) {
				plus.navigator.closeSplashscreen();
				// 关闭全屏
				plus.navigator.setFullscreen(false);
			}
		}
	}
};
</script>


<style lang="scss">
@import "@/assets/scss/base.scss";
</style>