<template>
	<div id="app">
		<Article ref="article" :id="id" />
	</div>
</template>

<script>
import { getQuery, log } from '@/utils';
import Article from './components/Article';

export default {
	name: 'App',
	components: {
		Article
	},
	data() {
		return {
			id: ''
		};
	},
	created() {
		// 订阅更新事件
      window.addEventListener('event_update', event => {
			// 获得事件参数
			let detail = event.detail;
			// 触发子组件更新
			log(detail, 'event_update with detail');
			this.id = detail.id;
    	});
	},
	beforeMount() {
		let query = getQuery();
		if(query && query.id) this.id = query.id;
	},
	mounted() {
		
	}
};
</script>


<style lang="scss" >
@import "@/assets/scss/base.scss";
</style>
