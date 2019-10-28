<template>
   <div style="display:flex;">
      <div style="margin-right:16px;">
         <img src="static/images/avatars/1.jpg" style="width:50px;height:50px;object-fit:cover;border-radius:999em;float:left" />
      </div>
      <div>
         <h4>萌王♥神神💗</h4>
         <div class="van-multi-ellipsis--l2">這行是歷史訊息這行是歷史訊息這行是歷史訊息這行是歷史訊息這行是歷史訊息這行是歷史訊息這行是歷史訊息這行是歷史訊息這行是歷史訊息</div>                    
      </div>
   </div>
</template>

<script>
export default {
   name: 'MessageItem',
   props: {
      model: Object
   },
   methods: {
      onSelected() {
         this.$emit('selected', this.model);
      }
   }
}
</script>

<style scoped>

</style>