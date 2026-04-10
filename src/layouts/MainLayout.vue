<script setup>
    import Nav from '@/components/Nav.vue'
    import mobileBg from '@/assets/img/mobile/bg.png'
    import Profile from '@/components/Profile.vue'
    import TaskManageStu from '@/components/taskmanagestu.vue'
    import Category from '@/components/category.vue'
</script>

<template>
  <div :style="{ backgroundImage: `url(${mobileBg})` }"
  class="min-h-screen bg-cover bg-bottom flex flex-col">
    <Nav />

    <main class="flex flex-col gap-16 px-4 pt-12 pb-24">
      <Profile />
      <TaskManageStu />
      <Category />
      
      <!-- router-view สำหรับแสดงหน้าต่างๆ (เช่น Home) -->
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>