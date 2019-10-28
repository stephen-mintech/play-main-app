<template>
	<wv-header title="wevue" @headerClick="onHeaderClick" background-color="#2196f3">
</wv-header>
</template>

<script>
	export default {
		name: 'TopNav',
		props: {
			title: {
				type: String,
				default: ''
			},
			icon: {
				type: String,
				default: ''
			},
		},
		methods: {
			onSelected() {
				
			},
			onHeaderClick(){
				
			}
		}
	}
</script>
