<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="w-64 h-full flex flex-col px-6 py-8 shrink-0 z-20">
    <!-- Logo -->
    <div class="flex items-center justify-center mb-12">
      <img class="h-16 object-contain" src="@/assets/logo.png" alt="PleonQ">
    </div>
    
    <!-- Navigation Links -->
    <div class="flex flex-col gap-2">

      <!-- Home -->
      <router-link to="/"
        class="flex items-center gap-3 px-6 py-3.5 rounded-[16px] transition-all duration-300 font-semibold" 
        active-class="bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-white shadow-[0_8px_20px_rgba(239,119,34,0.3)] scale-[1.02]"
        exact-active-class="bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-white shadow-[0_8px_20px_rgba(239,119,34,0.3)] scale-[1.02]"
        :class="route.path !== '/' ? 'text-gray-700 hover:bg-white/50' : ''">
        <i class="fa-regular fa-house text-lg w-6 flex justify-center transition-all duration-300" :style="route.path === '/' ? 'color: #ffffff;' : 'color: #1F2937'"></i> 
        <span class="text-[15px]">Home</span>
      </router-link>

      <!-- Task Management -->
      <router-link to="/taskManagement"
        class="flex items-center gap-3 px-6 py-3.5 rounded-[16px] transition-all duration-300 font-semibold" 
        active-class="bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-white shadow-[0_8px_20px_rgba(239,119,34,0.3)] scale-[1.02]"
        exact-active-class="bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-white shadow-[0_8px_20px_rgba(239,119,34,0.3)] scale-[1.02]"
        :class="route.path !== '/taskManagement' ? 'text-gray-700 hover:bg-white/50' : ''">
        <i class="fa-solid fa-list text-lg w-6 flex justify-center transition-all duration-300" :style="route.path === '/taskManagement' ? 'color: #ffffff;' : 'color: #1F2937'"></i> 
        <span class="text-[15px]">Task Management</span>
      </router-link>

    </div>
  </div>
</template>

<style scoped></style>
