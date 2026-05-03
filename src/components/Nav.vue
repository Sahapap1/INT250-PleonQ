<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NotificationDropdown from './NotificationDropdown.vue'
import NotificationModal from './NotificationModal.vue'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const isAdmin = computed(() => auth.user?.role === 'admin')

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

const showNotifDropdown = ref(false)
const showFullNotificationModal = ref(false)

const closeDropdowns = (e) => {
  const container = document.getElementById('nav-bell-container')
  if (container && !container.contains(e.target)) {
    showNotifDropdown.value = false
  }
}

onMounted(() => document.addEventListener('click', closeDropdowns))
onBeforeUnmount(() => document.removeEventListener('click', closeDropdowns))
</script>

<template>
  <div class="flex flex-col items-center gap-4 w-full">
    <div class="w-full max-w-7xl h-20 py-4 px-4 flex justify-between items-center">
      <div>
        <button class="cursor-pointer" @click="isAdmin?router.push('/admin'):router.push('/')"><img class="w-12 md:w-16" src="@/assets/logo.png" alt=""></button>
      </div>
      <div class="flex justify-between gap-4 md:gap-6">
        <div class="relative z-50" id="nav-bell-container">
          <button @click="showNotifDropdown = !showNotifDropdown"
            class="bg-orange-gradient rounded-full size-10 flex items-center justify-center cursor-pointer transition-all duration-300 relative shadow-sm hover:scale-105 active:scale-95 group">
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center border-2 border-white shadow-sm z-10 animate-bounce">
              2
            </span>
            <i class="text-white text-lg transition-all duration-300" :class="showNotifDropdown ? 'fa-solid fa-bell' : 'fa-regular fa-bell group-hover:fa-solid'"></i>
          </button>
          
          <transition name="fade">
            <NotificationDropdown v-if="showNotifDropdown" @close="showNotifDropdown = false" @openFullModal="showFullNotificationModal = true" />
          </transition>
        </div>
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
      <button @click="activeTab = 'home'; router.push(isAdmin ? '/admin' : '/')"
        class="flex items-center gap-2 px-12 py-2 rounded-full transition-all duration-300" :class="activeTab === 'home'
          ? 'bg-orange-gradient text-white shadow-md scale-105'
          : 'text-gray-700 hover:bg-gray-300'">
        <i class="fa-regular fa-house transition-all duration-300"
          :style="activeTab === 'home' ? 'color: #ffffff;' : 'color: #1F2937'"></i> <span
          class="text-sm font-medium whitespace-nowrap">{{ isAdmin ? 'Dashboard' : 'Home' }}</span>
      </button>

      <!-- Task -->
      <button v-if="!isAdmin" @click="activeTab = 'task'; router.push('/taskManagement')"
        class="flex items-center gap-2 px-8 py-2 rounded-full transition-all duration-300" :class="activeTab === 'task'
          ? 'bg-orange-gradient text-white shadow-md scale-105'
          : 'text-primary hover:bg-gray-300'">
        <i class="fa-solid fa-list-check transition-all duration-300"
          :style="activeTab === 'home' ? 'color: #1F2937;' : 'color: #ffffff'"></i> <span
          class="text-sm font-medium whitespace-nowrap">Task Management</span>
      </button>

    </div>
    
    <!-- Full Screen Notification Modal -->
    <NotificationModal :isOpen="showFullNotificationModal" @close="showFullNotificationModal = false" />
  </div>
</template>

<style scoped></style>
