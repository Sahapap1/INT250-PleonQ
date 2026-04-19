<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

import Nav from '@/components/Nav.vue'
import mobileBg from '@/assets/img/mobile/bg.png'
import desktopBg from '@/assets/img/desktop/bg.png'
import Sidebar from '@/components/Sidebar.vue'


</script>

<template>
  <div class="min-h-screen flex flex-col bg-cover bg-bottom md:bg-center
        items-center
         bg-[url('@/assets/img/mobile/bg.png')]
         md:bg-[url('@/assets/img/desktop/bg.png')]">
    <Nav />
    <div class="flex flex-1 w-full justify-center max-w-7xl relative"> 
      <Sidebar/>
      <main class="flex flex-col gap-16 px-4 pt-12 pb-24">
        
        <!-- <TaskManageStu /> -->
        <!-- <Category /> -->

        <!-- router-view สำหรับแสดงหน้าต่างๆ (เช่น Home) -->
        <!-- <router-view /> -->
      </main>
    </div>
  </div>
</template>

<style scoped></style>
