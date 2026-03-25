<script setup>
import { ref } from 'vue'

const activeTab = ref('home')
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <div class="w-screen h-20 py-4 px-6 flex justify-between">
      <div>
        <img class="w-15" src="@/assets/logo.png" alt="">
      </div>
      <div class="flex justify-between gap-6.5">
        <button class="bg-orange-gradient rounded-full size-10"><i class="fa-regular fa-bell"
            style="color: rgb(255, 255, 255);"></i></button>
        <button class="bg-orange-gradient rounded-full size-10"><i class="fa-regular fa-user"
            style="color: rgb(255, 255, 255);"></i></button>
      </div>
    </div>
    
    <div class="bg-gray-200 p-1 rounded-full inline-flex gap-1 ">

      <!-- Home -->
      <button @click="activeTab = 'home'"
        class="flex items-center gap-2 px-12 py-2 rounded-full transition-all duration-300" :class="activeTab === 'home'
          ? 'bg-orange-gradient text-white shadow-md scale-105'
          : 'text-gray-700 hover:bg-gray-300'">
        <i class="fa-regular fa-house transition-all duration-300" :style="activeTab === 'home' ? 'color: #ffffff;' : 'color: #1F2937'"></i> <span class="text-sm font-medium">Home</span>
      </button>

      <!-- Task -->
      <button @click="activeTab = 'task'"
        class="flex items-center gap-2 px-8 py-2 rounded-full transition-all duration-300" :class="activeTab === 'task'
          ? 'bg-orange-gradient text-white shadow-md scale-105'
          : 'text-primary hover:bg-gray-300'">
        <i class="fa-solid fa-list-check transition-all duration-300" :style="activeTab === 'home' ? 'color: #1F2937;' : 'color: #ffffff'"></i> <span class="text-sm font-medium">Task Management</span>
      </button>

    </div>
  </div>
</template>

<style scoped></style>
