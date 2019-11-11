<template>
	<img  :src="src" :class="class_name" :style="style_text"
		onerror="this.src='img/icon/noimage_person.png'"
	>
</template>

<script>
	export default {
		name: 'Avatar',
		props: {
			src: {
				type: String,
				default: ''
			},
			class_name: {
				type: String,
				default: ''
			},
			style_text: {
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
