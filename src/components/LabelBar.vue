<template>
   <span class="bar-container" style="background-color:deepskyblue;">
      <span class="bar">-</span>
   </span>
</template>

<script>

export default {
   name: 'LabelBar',
} 

</script>

<style lang="scss" scoped>
@import "@/assets/scss/var";

.bar-container {
  background-color: $label-bar-color;
  .bar {
     color: $label-bar-color;
  }
}
</style>
