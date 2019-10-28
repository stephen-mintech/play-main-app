<template>
   <div id="app">
		<Login />
   </div>
</template>

<script>
import PageManager from 'page-manager';
import Login from './components/Login';
export default {
	name: "App",
	components: {
		Login
	},
	data() {
		return {
			showFooter: false
		};
	},
	created() {
		
	},
	methods: {

	}
};
</script>

<style lang="scss">
@import "@/assets/scss/base.scss";
</style>
