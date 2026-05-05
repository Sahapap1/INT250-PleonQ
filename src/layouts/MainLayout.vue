<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

import Nav from "@/components/Nav.vue";
import mobileBg from "@/assets/img/mobile/bg.png";
import desktopBg from "@/assets/img/desktop/bg.png";
import Sidebar from "@/components/Sidebar.vue";
import ToastNotification from "@/components/ToastNotification.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-cover bg-center items-center bg-[url('@/assets/img/desktop/abstract-waves.svg')] overflow-x-hidden"
  >
    <Nav class="animate-fade-in-down" />
    <div class="flex flex-1 w-full max-w-7xl mx-auto gap-8 xl:gap-0">
      <Sidebar class="animate-fade-in-left" />
      <div
        class="flex flex-col flex-1 min-w-0 bg-white rounded-4xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-[#EBEBEB] xl:px-4 py-4 mx-2 xl:mx-4 xl:mx-0 xl:p-2 xl:mr-4 mt-11 mb-6"
      >
        <router-view class="flex-1 flex flex-col min-w-0" />
      </div>
    </div>
    <Footer class="animate-fade-in-up" />
    <ToastNotification />
  </div>
</template>

<style scoped></style>
