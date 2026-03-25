<script setup>
    import Nav from '@/components/Nav.vue'
    import mobileBg from '@/assets/img/mobile/bg.png'
    
</script>

<template>
  <div :style="{ backgroundImage: `url(${mobileBg})` }"
  class="min-h-screen bg-cover bg-bottom">
    <Nav />

    
  </div>
</template>

<style scoped></style>