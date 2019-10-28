<template>
	<div class='page-content'>
		<div class='content'>
			<van-icon name='close' class='icon-close' color='#fff' size='20' @click='close' />
			<span>全局webview弹层</span>
		</div>
	</div>
</template>

<script>
import mui from 'mui';
import PageManager from 'page-manager';
import { Icon } from 'vant';

Vue.use(Icon);

export default {
	name: 'Shade',
	data() {
		return {
			lastime: new Date().getTime()
		}
	},
	created() {},
	methods: {
		close() {
			PageManager.plusReady(() => {
				let self = plus.webview.currentWebview();
				if (self) plus.webview.close(self);
			})
		}
	}
}
</script>

<style lang='scss'>
html,
body {
  background: none !important;
  height: 100%;
}
.page-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  color: #fff;
  font-size: 18px;
}
.icon-close {
  position: fixed;
  top: 18px;
  right: 18px;
  color: #fff;
  font-size: 18px;
  padding: 5px;
}
</style>
