<template>
   <span :class="getStyle()">{{ age }}</span>
</template>

<script>
   export default {
      name: 'Gender',
      props: {
         age: Number,
         gender: String
      },
      methods: {
         getStyle() {
            return 'ganlabel_g';
         }
      }
   }
</script>


<style scoped>
.ganlabel_g {
   margin: 0 auto;
   padding: 2px 8px;
   text-align: center;
   font-size: 12px;
   line-height: 20px;
   border-radius: 5em;
   background-color: hotpink;
   color: white;
}

.ganlabel_g::before {
      content: "♀";
}

.ganlabel_b {
   margin: 0 auto;
   padding: 2px 8px;
   text-align: center;
   font-size: 12px;
   line-height: 20px;
   border-radius: 5em;
   background-color: rgb(110, 209, 248);
   color: white;
}

.ganlabel_b::before {
      content: "♂";
}

.ganlabel_s {
   margin: 0 auto;
   padding: 2px 8px;
   text-align: center;
   font-size: 12px;
   line-height: 20px;
   border-radius: 5em;
   background-color: rgb(110, 209, 248);
   color: white;
}

.ganlabel_n {
   margin: 0 auto;
   padding: 2px 8px;
   text-align: center;
   font-size: 12px;
   line-height: 20px;
   border-radius: 5em;
   background-color: rgb(196, 59, 255);
   color: white;
}

.ganlabel_n::after {
      content: "y";
}

.ganlabel_star {
   margin: 0 auto;
   padding: 2px 8px;
   text-align: center;
   font-size: 12px;
   line-height: 20px;
   border-radius: 5em;
   background-color: rgb(255, 179, 59);
   color: white;
}

</style>