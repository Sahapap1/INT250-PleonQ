<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const activeTab = ref('home')
const isProfile = ref(false)
const previousRoute = ref(null)
const showSidebar = ref(true)

const handleClick = () => {
  if (!isProfile.value) {
    
    previousRoute.value = route.fullPath

    isProfile.value = true
    showSidebar.value = false

    router.push('/profile')
  } else {
   
    isProfile.value = false
    showSidebar.value = true

    
    if (!previousRoute.value || previousRoute.value === '/profile') {
      router.push('/')
    } else {
      router.push(previousRoute.value)
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-4 w-full">
    <div class="w-full max-w-7xl h-20 py-4 px-4 flex justify-between items-center">
      <div>
        <img class="w-12 md:w-16" src="@/assets/logo.png" alt="">
      </div>
      <div class="flex justify-between gap-4 md:gap-6">
        <button class="bg-orange-gradient rounded-full size-10 cursor-pointer"><i class="fa-regular fa-bell"
            style="color: rgb(255, 255, 255);"></i></button>
        <button @click="handleClick"
          class="bg-orange-gradient rounded-full size-10 flex items-center justify-center cursor-pointer transition-all duration-300"><i
            :class="[
              'text-white text-lg transition-all duration-300',
              isProfile
                ? 'fa-solid fa-xmark rotate-180 scale-110'
                : 'fa-regular fa-user rotate-0 scale-100']" style="color: rgb(255, 255, 255);"></i></button>
      </div>
    </div>

    <div v-if="showSidebar" class="bg-gray-200 p-1 rounded-full inline-flex gap-1 md:hidden">

      <!-- Home -->
      <button @click="activeTab = 'home'"
        class="flex items-center gap-2 px-12 py-2 rounded-full transition-all duration-300" :class="activeTab === 'home'
          ? 'bg-orange-gradient text-white shadow-md scale-105'
          : 'text-gray-700 hover:bg-gray-300'">
        <i class="fa-regular fa-house transition-all duration-300"
          :style="activeTab === 'home' ? 'color: #ffffff;' : 'color: #1F2937'"></i> <span
          class="text-sm font-medium">Home</span>
      </button>

      <!-- Task -->
      <button @click="activeTab = 'task'"
        class="flex items-center gap-2 px-8 py-2 rounded-full transition-all duration-300" :class="activeTab === 'task'
          ? 'bg-orange-gradient text-white shadow-md scale-105'
          : 'text-primary hover:bg-gray-300'">
        <i class="fa-solid fa-list-check transition-all duration-300"
          :style="activeTab === 'home' ? 'color: #1F2937;' : 'color: #ffffff'"></i> <span
          class="text-sm font-medium">Task Management</span>
      </button>

    </div>
  </div>
</template>

<style scoped></style>
