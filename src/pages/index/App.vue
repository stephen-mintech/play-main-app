<template>
	<div id="app" v-show="initCompleted">
		<MaskLoading :loading="socketConnecting" text="伺服器連線中" />
		<MFooter ref="footTab" />
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { INDEX_EVENT, INIT_COMPLETED, INIT_SOCKET, 
	SOCKET_CONNECTING, SOCKET_CONNECTED, SOCKET_SEND,
	SELECT_TAB, ACTIVE_WEBVIEW 	
} from '@/store/actions.type';
import { SOCKET_URL } from '@/config';

import MaskLoading from '@/components/MaskLoading';
import MFooter from '@/components/FootTab';

export default {
	name: 'App',
	components: {
		MaskLoading,
		MFooter
	},
	data() {
		return {
			name: 'index',
			socketInit: 0
		};
	},
	computed: {
		...mapGetters(['initCompleted', 'isPlus', 'uuid',
		'currentUser', 'token', 'isAdminUser', 'socketConnecting'
		]),
		...mapState({
			socketConnecting: state => state.socket.connecting
		})
	},
	created() {
		if(this.isPlus) {
			window.addEventListener(INDEX_EVENT, this.indexEventHandler);
		}
		
		this.init();

		Bus.$on(INIT_COMPLETED, () => {
			this.onInitCompleted();
		});

		Bus.$on(SOCKET_CONNECTING, () => {
			console.log(SOCKET_CONNECTING);
			let all = plus.webview.all();
			console.log(all);
		});

		Bus.$on(SOCKET_CONNECTED, () => {
			
			if(!this.socketInit) {
				let homePage = Routes.findPage('home');	
				this.$store.dispatch(SELECT_TAB, homePage);
				this.$refs.footTab.init();
			}

			this.socketInit += 1;
			
		});
		
	},
	methods: {
		indexEventHandler(e) {
			console.log('indexEventHandler', e);
			let name = e.detail.name;
			let data = e.detail.data;
			if(name === ACTIVE_WEBVIEW) {
				this.onPageActive(data.page);
			}else {
				console.log('other', e);
				this.$store.dispatch(name, data);
			}
			
		},
		init(active = true) {
         if(active) Utils.onPageCreated(this);
      },
		onPageActive(page) {
			if(page.name === this.name) this.init();
			if(page.name === 'login') this.onInitCompleted();
		},
		onInitCompleted() {
			if(this.isPlus) {
				plus.navigator.closeSplashscreen();
				// 关闭全屏
				plus.navigator.setFullscreen(false);
				
			}

			this.initSocket();
		},
		initSocket() {
			let url = SOCKET_URL.client;
			if(this.isAdminUser) url = SOCKET_URL.admin;
			
			this.$store.dispatch(INIT_SOCKET, {
				url,
				uuid: this.uuid,
				token: this.token
			});
		},
		sendSocket() {

		}
	}
};
</script>


<style lang="scss">
@import "@/assets/scss/base.scss";
</style>