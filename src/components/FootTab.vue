<template>
	<div>
		<van-tabbar v-model="active" active-color="#07c160" inactive-color="#000">
			<van-tabbar-item v-for="(item, index) in tabPages" :key="index" 
				:icon="item.meta.icon" @click.prevent="onSelected(item)"
			>
				{{ item.meta.title }}
			</van-tabbar-item>
		</van-tabbar>
	</div>
	
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { SELECT_TAB } from '@/store/actions.type';

import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);

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
		onSelected(item) {
			if(item.name === this.activeTab.name) return;
			
			this.$store.dispatch(SELECT_TAB, item);

			//PageManager.switchTab(item.name, this.activeTabName);
			//PageManager.invoke(item.name, 'event_update');
		}
	}
	
}
</script>