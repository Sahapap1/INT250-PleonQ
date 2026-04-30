<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

import Nav from '@/components/Nav.vue'
import mobileBg from '@/assets/img/mobile/bg.png'
import desktopBg from '@/assets/img/desktop/bg.png'
import Sidebar from '@/components/Sidebar.vue'


</script>

<template>
  <div class="min-h-screen flex flex-col bg-cover bg-center items-center bg-[url('@/assets/img/desktop/abstract-waves.svg')]">
    <Nav />
    <div class="flex min-h-screen w-full max-w-7xl mx-auto gap-8 lg:gap-0">
      <Sidebar />
      <div class="flex flex-col flex-1 bg-white rounded-4xl shadow-[0_10px_40px_rgba(0,0,0,0.05)]
           border border-[#EBEBEB]
           xl:px-4 py-4 mx-2 xl:mx-4 lg:mx-0 lg:p-2 lg:mr-4 mt-11 mb-6">
        <router-view class="flex-1 flex flex-col" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
