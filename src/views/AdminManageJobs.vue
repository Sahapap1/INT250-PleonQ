<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useJobStore } from '@/stores/jobStore'

const router = useRouter()
const jobStore = useJobStore()

const jobs = computed(() => jobStore.jobs)

const goToApplicants = (jobId) => {
    router.push(`/admin/job/${jobId}/applicants`)
}
</script>

<template>
    <div class="flex-1 flex flex-col animate-[fadeIn_0.4s_ease-out] w-full max-w-5xl mx-auto pt-4 pb-10">
        
        <!-- Header -->
        <div class="flex items-center justify-between mb-8 px-4">
            <div class="flex flex-col">
                <h1 class="text-[22px] md:text-[26px] font-extrabold text-[#1F2937] dark:text-gray-100 tracking-tight leading-tight">Manage Applicants</h1>
                <h2 class="text-[14px] font-semibold text-gray-400 dark:text-gray-500 tracking-wide">Select a job to view applicants</h2>
            </div>
        </div>

        <!-- Job List -->
        <div class="px-4">
            <div v-if="jobs.length === 0" class="text-center py-10 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <p class="text-gray-500 dark:text-gray-400 font-medium">No jobs posted yet.</p>
            </div>
            
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="job in jobs" :key="job.id" 
                     @click="goToApplicants(job.id)"
                     class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-orange-200 dark:hover:border-orange-500/50 transition-all cursor-pointer group flex flex-col h-full">
                    
                    <div class="flex justify-between items-start mb-3">
                        <div class="w-12 h-12 bg-orange-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-[#EF7722] dark:text-orange-400 group-hover:scale-105 transition-transform">
                            <i class="fa-solid fa-briefcase text-xl"></i>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-xs font-bold px-3 py-1 rounded-full border border-gray-100 dark:border-gray-700">
                            {{ job.date }}
                        </div>
                    </div>
                    
                    <h3 class="text-[16px] font-extrabold text-[#1F2937] dark:text-gray-100 leading-snug mb-2 group-hover:text-[#EF7722] transition-colors line-clamp-2">
                        {{ job.title }}
                    </h3>
                    
                    <div class="mt-auto pt-4 flex items-center justify-between border-t border-gray-50 dark:border-gray-700">
                        <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            <i class="fa-solid fa-users text-[#FAA533]"></i>
                            Manage
                        </span>
                        <div class="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center group-hover:bg-[#EF7722] group-hover:text-white text-gray-400 transition-colors">
                            <i class="fa-solid fa-chevron-right text-xs"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
