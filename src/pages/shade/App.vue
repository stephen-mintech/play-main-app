<template>
  <div id="app">
    <Shade />
  </div>
</template>

<script>
//import "vant/lib/vant-css/icon-local.css";
import Shade from "./components/Shade";

export default {
	name: 'App',
	components: {
		Shade
	},
	data() {
		return {
			
		};
	},
	mounted() {}
};
</script>

<style lang="scss">
@import "../../assets/scss/base.scss";
</style>
