<template>
	<div :class="{ 'article-item md-item-border' : true, 'item-cover' : model.cover }"
		@click="onSelected"
	>
		<h4 class="article-title"> {{ model.title }} </h4>
		<article class="article-body">
		</article>
		<aside class="aside">
			{{ model.who }}
			<span> {{ model.site && model.site.name }}</span>
		</aside>
		<div class="cover-wrap">
			<img class="cover-img" v-if="model.cover" v-lazy="model.cover">
		</div>
	</div>
</template>

<script>
import { Lazyload } from 'vant';
Vue.use(Lazyload);

export default {
	name: 'ArticleItem',
	props: {
		model: Object
	},
	methods: {
      onSelected() {
         this.$emit('selected', this.model);
      }
   }
};
</script>


<style lang="scss" scoped>

@import '@/assets/scss/var';
@import '@/assets/scss/common';

.article-item {
  	position: relative;
	padding-bottom: 7px;
	margin-bottom: $padding-main;
	padding-right: $padding-main;
	.cover-wrap {
		width: 100px;
		height: 78px;
		position: absolute;
		right: 0;
		top: 0;
		overflow: hidden;
		border-radius: 5px;
		background: #ddd;
		display: none;
	}
	&.item-cover {
		padding-right: 115px;
		.cover-wrap {
			display: block;
			.cover-img {
				border-radius: 5px;
				position: absolute;
				top: 0;
				left: 0;
				width: auto;
				height: 100%;
			}
		}
	}
	&:last-child {
		border-bottom: 0 !important;
	}
}
.article-title {
	font-weight: normal;
	color: #000;
	font-size: 16px;
	line-height: 18px;
	@include clamp(2);
}
.article-body {
	color: $color-tip;
	height: 38px;
	overflow: hidden;
	font-size: 12px;
	@include clamp(2);
}
.aside {
	margin-top: 4px;
	font-size: 12px;
	color: $color-border;
}
</style>

 
