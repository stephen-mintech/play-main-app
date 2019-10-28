<template>
   <div v-show="!loading" id="app" class="page bdbg js_show">
		<van-nav-bar :title="categoryTitle" fixed left-arrow @click-left="goBack" />
		<Partners ref="partners" />
   </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { GET_CATEGORY } from '@/store/actions.type';
import { log } from '@/utils';
import mui from 'mui';
import { NavBar } from 'vant';
Vue.use(NavBar);

  
import Partners from './components/Partners';
export default {
	name: 'App',
	components: {
		Partners
	},
	computed: {
      ...mapState({
			loading: state => state.app.loading,
			category: state => state.categories.category
		}),
		categoryTitle() {
			if(this.category) {
				return this.category.title + ' 頃聽師';
			}else {
				return '頃聽師';
			}
		}
	},
	created() {
		window.addEventListener('event_update', event => {
			let detail = event.detail;
			log(detail, 'event.detail');
			this.$store.dispatch(GET_CATEGORY, detail.id)
			.then(() => this.$refs.partners.update())
		});
   },
	beforeMount() {
      
   },
	methods: {
		goBack() {
			mui.back();
		}
	}
};
</script>

<style lang="scss">
@import "@/assets/scss/base.scss";
</style>
