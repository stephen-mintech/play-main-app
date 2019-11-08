<template>
   <div  v-if="position === 'left'" @click="selected" style="position: absolute;top: 0px;left: 0px;width: 50px;height: 50px;margin: 0px auto;">
      <i :class="icon" style="font-size: 30px; color: white; position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%);"></i>
   </div>
   <div v-else @click="selected" style="position: absolute; top: 0px; right: 0px; width: 50px; height: 50px; vertical-align: middle; text-align: center;">
      <i :class="icon" style="font-weight: bold; font-size: 30px; color: white; position: relative; line-height: 50px;"></i>
   </div>
</template>

<script>
   export default {
      name: 'TopButton',
      props: {
         position: String,
         icon: String
      },
      methods: {
         selected() {
            this.$emit('selected');
         }
      }
   }
</script>