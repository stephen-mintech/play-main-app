<template>
	<div class="color-picker-container">
      <div v-for="(item, index) in colors" :key="index" style="flex: 0 0 30px; position: relative;">
         <div 
         :class="{ 'namecolor': true, 'color-item': true, on: item.SN === selected_color.SN}"
         :style="`background-color: ${item.color};`"
         @click="onSelected(item)"
         >
         </div>
      </div>
   </div>
</template>

<script>

export default {
   name: 'ColorPicker',
   props: {
      colors: Array,
      selected_color: Object
   },
   methods: {
      onSelected(item) {
			this.$emit('selected', item)
		},
      
   }
};
</script>

<style scoped>
.color-picker-container {
   overflow-x : auto;
   display : flex;
   flex-wrap : nowrap;
   padding : 0px 5px;
}
.color-item {
   margin : 5px 0px;
   height : 15px;
   width : 15px;
   border-radius : 999em;
   background-color: black;
}
.namecolor.on:before {
   position: absolute;
   border-radius: 999em;
   width: 19px;
   height: 19px;
   border: 2px solid gray;
   content: " ";
   left: -4px;
   top: 1px;
   z-index: 2;
}
</style>
