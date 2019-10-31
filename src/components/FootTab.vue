<template>
	<div>
		<van-tabbar v-model="active" active-color="#07c160" inactive-color="#000" class="tabbg">
			<!-- <van-tabbar-item info="3">
				<span>自定义</span>
				<van-icon class-prefix="ion-ios" name="briefcase-outline" slot="icon"/>
			</van-tabbar-item> -->
			<van-tabbar-item v-for="(item, index) in tabPages" :key="index" :info="getInfoCount(item)"
				@click.prevent="onSelected(item)"
			>
				{{ item.meta.title }}
				<van-icon class-prefix="ion-ios" :name="item.meta.icon" size="1.2em" slot="icon"/>
				
			</van-tabbar-item>
		</van-tabbar>
	</div>
	
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { SELECT_TAB } from '@/store/actions.type';

import { Tabbar, TabbarItem, Icon } from 'vant';
Vue.use(Tabbar).use(TabbarItem).use(Icon);

export default {
	name: 'FootTab',
	data() {
		return {
			active: 0
		};
	},
	computed: {
		...mapState({
			tabPages: state => state.app.tabPages,
			activeTab: state => state.app.activeTab
		}),
	},
	created() {
		
	},
	beforeMount(){
		this.active = this.tabPages.findIndex(item => item.name === this.activeTab.name);
	},
	methods: {
		getInfoCount(item) {
			if(item.name === 'notices') return 3;
			return '';
		},
		onSelected(item) {
			if(item.name === this.activeTab.name) return;
			
			this.$store.dispatch(SELECT_TAB, item);

			//PageManager.switchTab(item.name, this.activeTabName);
			//PageManager.invoke(item.name, 'event_update');
		}
	}
	
}
</script>


<style scoped>
.tabbg {
	background: rgb(255,255,255);
	background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgb(200, 200, 200) 99%);
	background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgb(200, 200, 200) 99%);
	background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(200, 200, 200,1) 99%);
	color: #3e3e3e !important;
	box-shadow: 0px -2px 12px rgba(80,80,80,0.4);
}
</style>