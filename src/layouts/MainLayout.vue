<script setup>
import Nav from '@/components/Nav.vue'
import desktopBg from '@/assets/img/desktop/bg.png'
</script>

<template>
  <div class="min-h-screen relative flex w-full h-screen overflow-hidden bg-cover bg-center bg-[#FFF5EC]" :style="{ backgroundImage: `url(${desktopBg})` }">
    <!-- Abstract Background Orbs/Waves (Matching the design) -->
    <div class="absolute -left-32 -bottom-32 w-96 h-96 bg-gradient-to-r from-orange-300 to-[#FAA533] rounded-full mix-blend-multiply opacity-20 filter blur-3xl animate-pulse z-0 pointer-events-none"></div>
    <div class="absolute right-0 top-1/2 w-80 h-96 bg-gradient-to-l from-orange-400 to-[#EF7722] rounded-full mix-blend-multiply opacity-15 filter blur-[80px] z-0 pointer-events-none"></div>
    
    <!-- Sidebar -->
    <Nav class="shrink-0" />

    <!-- Main Content Area Wrapper -->
    <main class="flex-1 flex flex-col h-screen relative z-10 p-6 pl-0">
      
      <!-- Top Right Header Icons -->
      <div class="flex justify-end items-center gap-4 h-16 mb-4">
        <button class="bg-gradient-to-b from-[#FAA533] to-[#EF7722] shadow-[0_4px_10px_rgba(239,119,34,0.3)] hover:shadow-[0_6px_15px_rgba(239,119,34,0.4)] transition-all duration-300 rounded-full w-10 h-10 flex items-center justify-center text-white active:scale-95">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
        </button>
        <router-link to="/profile" class="bg-gradient-to-b from-[#FAA533] to-[#EF7722] shadow-[0_4px_10px_rgba(239,119,34,0.3)] hover:shadow-[0_6px_15px_rgba(239,119,34,0.4)] transition-all duration-300 rounded-full w-10 h-10 flex items-center justify-center text-white active:scale-95">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        </router-link>
      </div>
      
      <!-- Content Window (Router View Container) -->
      <div class="flex-1 bg-[#FFFFFF] rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-[#EBEBEB] overflow-hidden flex flex-col">
        <router-view class="w-full h-full" />
      </div>

    </main>
  </div>
</template>

<style scoped></style>