<template>
   <div style="display:flex">
      <img class="icon" src="http://hotfix.7cplay.com/zuzucustom/titleimg/8c829d86-9dd0-43bd-a008-a960dedf3d7e.jpg_s">
      <div class="input-container">
         <p class="text-input">我要發表動態...</p>
      </div>
      <div style="width: 40px; height: 40px; border-radius: 999em;">
         <i alt="" class="fa fa-2x ion-ios-drag" style="position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%);"></i>
      </div>
   </div>
</template>

<script>

export default {
	name: 'NewsAdd',
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
.icon {
   width : 30px;
   height : 30px;
   object-fit : cover;
   border-radius : 999em;
   position : relative;
   margin: 5px 0px 5px 5px;
}
.input-container {
   flex : 1;
   border : 1px solid lightgray;
   color : lightgray;
   border-radius : 99em;
   margin : 5px;
}

.text-input {
   padding-left : 14px;
   font-size : 14px;
   position : relative;
   top : 50%;
   transform : translateY(-50%);
}
</style>

 
