<template>
   <div :style="getStyle()">
   </div>
</template>

<script>
   export default {
      name: 'Spacer',
      props: {
         height: Number
      },
      methods: {
         getStyle() {
            let height = this.height ? this.height : 10;
            return `height: ${height}px`;
         }
      }
   }
</script>