<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

import { useJobStore } from '../stores/jobStore'

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

const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(jobStore.jobs.length / itemsPerPage.value)
})

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return jobStore.jobs.slice(start, end)
})

watch(itemsPerPage, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value || 1
  }
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
        <div class="flex items-center gap-3 w-full max-w-2xl mx-auto">
            <div
                class="flex items-center bg-[#F9FAFB] rounded-full px-5 py-2.5 shadow-sm border border-[#F3F4F6] transition-all focus-within:bg-white focus-within:border-gray-200 focus-within:shadow-md flex-1">
                <input type="text" placeholder="Search..."
                    class="flex-1 bg-transparent outline-none text-[13px] font-medium text-gray-700 placeholder-gray-400" />
                <svg class="w-4 h-4 text-gray-400 ml-2 cursor-pointer hover:text-gray-600 transition-colors" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <button @click="showCategory = true" class="bg-orange-gradient text-white px-6 py-2.5 rounded-full hover:shadow-lg transition-shadow cursor-pointer">
                Suggest
            </button>


        </div>

        <!-- 📦 Main Layout -->
        <div class="flex flex-col flex-1 h-full pt-5">

            <div class="flex flex-col lg:flex-row gap-6 lg:gap-3 flex-1">

                <!-- 🧾 Left Content -->
                <div class="flex-1 flex flex-col min-h-[73vh]">

                    <!-- 🧾 List -->
                    <div class="flex flex-col gap-2">
                        <JobCard v-for="job in paginatedJobs" :key="job.id" :data="job" />
                    </div>

                    <!-- 📄 Pagination -->
                    <div class="lg:mt-auto mt-4 flex justify-center items-center gap-3 pb-1 lg:pt-2">
                        <button @click="prevPage" :disabled="currentPage === 1"
                            class="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50">
                            Prev
                        </button>

                        <span class="text-sm font-medium">
                            Page {{ currentPage }} / {{ totalPages }}
                        </span>

                        <button @click="nextPage" :disabled="currentPage === totalPages"
                            class="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50">
                            Next
                        </button>
                    </div>

                </div>

                <!-- 📅 Right Sidebar -->
                <div
                    class="w-full lg:w-[320px] bg-[#FFF8F1] rounded-3xl p-5 flex flex-col gap-6 border border-[#EBEBEB]/60 overflow-y-auto mb-13">

                    <!-- Events -->
                    <div class="flex flex-col gap-3">
                        <h3 class="text-[15px] font-bold text-[#1F2937]">
                            My Upcoming Events
                        </h3>

                        <div class="flex flex-col gap-2.5">
                            <UpcommingJobCard />
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
