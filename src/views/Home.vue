<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

import { useJobStore } from '../stores/jobStore'
import { useTaskStore } from '../stores/taskStore'
import { useAuthStore } from '../stores/authStore'

import JobCard from '@/components/JobCard.vue'
import UpcommingJobCard from '@/components/UpcommingJobCard.vue'
import CategoryPopup from '@/components/category.vue'


const screenWidth = ref(window.innerWidth)
const showCategory = ref(false)

const handleResize = () => {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  if (taskStore.tasks.length === 0 && !taskStore.isLoading) {
    taskStore.fetchTasks(authStore.user?.id)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const itemsPerPage = computed(() => {
  if (screenWidth.value >= 1536) return 6   // 2xl
  if (screenWidth.value >= 1440) return 5   // xl custom
  return 4
})


const jobStore = useJobStore()
const taskStore = useTaskStore()
const authStore = useAuthStore()

const currentPage = ref(1)
const showFavoritesOnly = ref(false)

const upcomingTasks = computed(() => {
    const now = new Date()
    const in7Days = new Date(now)
    in7Days.setDate(in7Days.getDate() + 7)
    
    now.setHours(0, 0, 0, 0)
    in7Days.setHours(23, 59, 59, 999)

    return taskStore.tasks.filter(task => {
        if (!task.date) return false;
        const taskDate = new Date(task.date)
        return taskDate >= now && taskDate <= in7Days
    }).sort((a, b) => new Date(a.date) - new Date(b.date))
})

const filteredJobs = computed(() => {
  let jobs = jobStore.jobs;
  if (showFavoritesOnly.value) {
     jobs = jobs.filter(j => j.liked);
  }
  return [...jobs];
})

const totalPages = computed(() => {
  return Math.ceil(filteredJobs.value.length / itemsPerPage.value)
})

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredJobs.value.slice(start, end)
})

watch([itemsPerPage, showFavoritesOnly], () => {
  currentPage.value = 1
})

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}




</script>

<template>
    <div class="px-1 md:px-4 xl:px-6 2xl:px-0 md:max-w-350 md:mx-auto md:w-full">
        <!-- 🔍 Search -->
        <div class="flex items-center gap-2 sm:gap-3 w-full max-w-2xl mx-auto">
            <div
                class="flex items-center bg-[#F9FAFB] rounded-full px-3 sm:px-5 py-2.5 shadow-sm border border-[#F3F4F6] transition-all focus-within:bg-white focus-within:border-gray-200 focus-within:shadow-md flex-1 min-w-0">
                <input type="text" placeholder="Search..."
                    class="flex-1 bg-transparent outline-none text-[13px] font-medium text-gray-700 placeholder-gray-400" />
                <svg class="w-4 h-4 text-gray-400 ml-2 cursor-pointer hover:text-gray-600 transition-colors" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <button @click="showCategory = true" class="bg-orange-gradient text-white px-4 sm:px-6 py-2.5 rounded-full hover:shadow-lg transition-shadow cursor-pointer text-[14px] font-bold shrink-0 tracking-wide">
                Suggest
            </button>


        </div>

        <!-- 📦 Main Layout -->
        <div class="flex flex-col flex-1 h-full pt-5">

            <div class="flex flex-col lg:flex-row gap-6 lg:gap-3 flex-1">

                <!-- 🧾 Left Content -->
                <div class="flex-1 flex flex-col min-h-[73vh]">

                    <!-- Header with Toggle -->
                    <div class="flex items-center justify-between mb-3 px-1">
                        <h2 class="text-[16px] font-extrabold text-[#1F2937] flex items-center gap-2">
                            <i class="fa-solid fa-briefcase text-[#EF7722]"></i> Available Jobs
                        </h2>
                        
                        <label class="flex items-center gap-2 cursor-pointer group select-none">
                            <span class="text-[13px] font-bold transition-colors" :class="showFavoritesOnly ? 'text-[#EF7722]' : 'text-gray-400 group-hover:text-gray-600'">Favorites</span>
                            <div class="relative w-10 h-[22px] rounded-full p-0.5 transition-colors duration-300 border" :class="showFavoritesOnly ? 'bg-orange-50 border-orange-200' : 'bg-gray-100 border-gray-200'">
                                <input type="checkbox" v-model="showFavoritesOnly" class="hidden">
                                <div class="w-[16px] h-[16px] rounded-full shadow-sm transition-transform duration-300 flex items-center justify-center transform" :class="showFavoritesOnly ? 'translate-x-[18px] bg-[#EF7722]' : 'translate-x-0 bg-white border border-gray-300'">
                                    <svg v-if="showFavoritesOnly" class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                </div>
                            </div>
                        </label>
                    </div>

                    <!-- 🧾 List -->
                    <div class="flex flex-col gap-2">
                        <JobCard v-for="job in paginatedJobs" :key="job.id" :data="job" />
                        
                        <div v-if="paginatedJobs.length === 0" class="flex flex-col items-center justify-center py-12 px-4 bg-[#F9FAFB]/80 rounded-2xl border border-gray-100 text-center">
                            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <i class="fa-solid fa-heart-crack text-gray-400 text-xl"></i>
                            </div>
                            <h3 class="text-gray-600 font-bold mb-1">No Jobs Found</h3>
                            <p class="text-gray-400 text-sm">You haven't added any jobs to your favorites yet.</p>
                        </div>
                    </div>

                    <!-- 📄 Pagination -->
                    <!-- Pagination -->
                    <div class="mt-4 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.02)] border border-[#EBEBEB] flex justify-between items-center transition-all">
                      <button
                        @click="prevPage"
                        :disabled="currentPage === 1"
                        class="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-[13px] transition-all duration-300"
                        :class="currentPage === 1 ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-[#FFF8F1] text-[#EF7722] hover:bg-[#EF7722] hover:text-white hover:shadow-md cursor-pointer active:scale-95 border border-[#EF7722]/20 hover:border-transparent'"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
                        Prev
                      </button>
            
                      <div class="flex items-center gap-1.5 px-2 sm:px-4">
                         <span class="hidden sm:inline text-[13px] font-bold text-gray-400">Page</span>
                         <span class="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-[13px] font-black text-[#1F2937]">{{ currentPage }}</span>
                         <span class="text-[13px] font-bold text-gray-400">/</span>
                         <span class="text-[13px] font-black text-gray-500">{{ totalPages }}</span>
                      </div>
            
                      <button
                        @click="nextPage"
                        :disabled="currentPage === totalPages"
                        class="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-[13px] transition-all duration-300"
                        :class="currentPage === totalPages ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-white hover:shadow-[0_8px_15px_rgba(239,119,34,0.3)] hover:-translate-y-0.5 cursor-pointer active:scale-95 border border-transparent'"
                      >
                        Next
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                    </div>

                </div>

                <!-- 📅 Right Sidebar -->
                <div
                    class="w-full lg:w-[320px] bg-[#FFF8F1] rounded-3xl p-5 flex flex-col gap-6 border border-[#EBEBEB]/60 overflow-y-auto mb-13">

                    <!-- Events -->
                    <div class="flex flex-col gap-3">
                        <h3 class="text-[15px] font-bold text-[#1F2937] leading-snug">
                            My Upcoming Events <span class="text-[12px] font-medium text-gray-400 whitespace-nowrap ml-0.5">(7 days)</span>
                        </h3>

                        <div class="flex flex-col gap-2.5">
                            <UpcommingJobCard v-for="task in upcomingTasks" :key="task.id" :task="task" />
                            <div v-if="upcomingTasks.length === 0" class="text-[13px] text-[#6B7280] bg-white p-4 rounded-[14px] border border-[#EBEBEB]/60 text-center shadow-sm">
                                No upcoming events in the next 7 days.
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </div>

    <!-- Category Popup Overlay -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showCategory" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showCategory = false"></div>
          <!-- Popup Component -->
          <CategoryPopup class="relative z-10 w-full max-w-[650px] popup-content" @close="showCategory = false" />
        </div>
      </Transition>
    </Teleport>

</template>

<style scoped>
/* Fade effect for backdrop and container */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Pop/Bounce effect for the modal box itself */
.fade-enter-active .popup-content {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-leave-active .popup-content {
  transition: opacity 0.3s ease, transform 0.3s ease-in;
}

.fade-enter-from .popup-content,
.fade-leave-to .popup-content {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
