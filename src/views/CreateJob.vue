<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useJobStore } from '@/stores/jobStore'

const jobRoles = [
  { name: 'Workshop', icon: 'fa-solid fa-users-viewfinder' },
  { name: 'Welfare', icon: 'fa-solid fa-hand-holding-heart' },
  { name: 'Teacher Assistant', icon: 'fa-solid fa-person-chalkboard' },
  { name: 'Core Team', icon: 'fa-solid fa-users-gear' },
  { name: 'Marketing', icon: 'fa-solid fa-bullhorn' },
  { name: 'IT / Technical', icon: 'fa-solid fa-laptop-code' },
  { name: 'Photo', icon: 'fa-solid fa-camera' }
]

const router = useRouter()
const jobStore = useJobStore()

const formData = ref({
    title: '',
    description: '',
    category: 'Staff',
    date: '',
    location: '',
    suggestions: [],
    reward: 'Activity'
})

const goBack = () => {
    router.back()
}

const createJob = () => {
    if(!formData.value.title || !formData.value.date) {
        alert("Please fill in the required fields (Title and Date)");
        return;
    }
    
    // Simulate ID generation
    const newId = jobStore.jobs.length > 0 ? Math.max(...jobStore.jobs.map(j => j.id)) + 1 : 1;
    
    const newJob = {
        id: newId,
        ...formData.value,
        liked: false
    };

    jobStore.addJob(newJob);
    router.push('/admin');
}
</script>

<template>
    <div class="flex-1 flex flex-col animate-[fadeIn_0.4s_ease-out] w-full max-w-4xl mx-auto pt-2 pb-10">
        
        <!-- Header -->
        <div class="flex items-center gap-4 mb-4 md:mb-8 px-4">
            <button @click="goBack" class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 hover:opacity-90 hover:bg-[#EF7722] hover:text-white transition-all active:scale-95 z-10 shrink-0 cursor-pointer">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <div class="flex flex-col">
                <h1 class="text-[22px] md:text-[26px] font-extrabold text-[#1F2937] tracking-tight leading-tight">Create New Job</h1>
                <h2 class="text-[14px] font-semibold text-gray-400 tracking-wide">(Announce Job)</h2>
            </div>
        </div>

        <!-- Form Canvas -->
        <div class="flex flex-col flex-1 relative w-full px-4 md:px-10">
            
            <div class="relative z-10 flex flex-col gap-6 w-full flex-1">
                
                <!-- Title -->
                <div class="flex flex-col gap-2">
                    <label class="text-[14px] font-bold text-gray-700">Job Title</label>
                    <input v-model="formData.title" type="text" class="w-full bg-[#F9FAFB] border border-gray-200 rounded-full px-5 py-3 text-[14px] font-medium focus:outline-none focus:border-orange-400 focus:bg-white focus:shadow-sm transition-all shadow-inner" />
                </div>

                <!-- Description -->
                <div class="flex flex-col gap-2">
                    <label class="text-[14px] font-bold text-gray-700">Description</label>
                    <textarea v-model="formData.description" rows="5" class="w-full bg-[#F9FAFB] border border-gray-200 rounded-[28px] px-5 py-4 text-[14px] font-medium focus:outline-none focus:border-orange-400 focus:bg-white focus:shadow-sm transition-all shadow-inner resize-none"></textarea>
                </div>

                <!-- Row: Date -->
                <div class="flex flex-col gap-6 mt-2">
                    
                    <div class="flex flex-col gap-2">
                        <label class="text-[14px] font-bold text-gray-700">Date</label>
                        <div class="flex flex-col sm:flex-row gap-3">
                            <input v-model="formData.date" type="date" class="w-full sm:w-44 bg-[#F9FAFB] border border-gray-200 rounded-full px-5 py-3 text-[14px] font-medium text-gray-600 focus:outline-none focus:border-orange-400 focus:bg-white focus:shadow-sm transition-all shadow-inner" />
                        </div>
                    </div>
                </div>

                <!-- Job Suggestion (Roles needed) -->
                <div class="flex flex-col gap-3 mt-2">
                    <label class="text-[14px] font-bold text-gray-700">Job Suggestion (ต้องการสายไหนมาช่วยงาน)</label>
                    <div class="flex flex-wrap gap-3 mt-1">
                        <label 
                            v-for="role in jobRoles" 
                            :key="role.name"
                            class="flex items-center gap-2.5 cursor-pointer group px-4 py-2 rounded-full border transition-all text-[13px] font-bold"
                            :class="formData.suggestions.includes(role.name) ? 'bg-orange-50 border-orange-300 text-[#EF7722] shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-orange-200 hover:bg-white'"
                        >
                            <input 
                                type="checkbox" 
                                :value="role.name" 
                                v-model="formData.suggestions" 
                                class="hidden"
                            />
                            <div class="w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors shrink-0"
                                :class="formData.suggestions.includes(role.name) ? 'bg-[#EF7722] border-[#EF7722]' : 'bg-white border-gray-300 group-hover:border-orange-300'"
                            >
                                <svg v-if="formData.suggestions.includes(role.name)" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <i class="text-[14px] transition-colors shrink-0"
                               :class="[role.icon, formData.suggestions.includes(role.name) ? 'text-[#EF7722]' : 'text-gray-400 group-hover:text-orange-400']"></i>
                            <span>{{ role.name }}</span>
                        </label>
                    </div>
                </div>

                <!-- Reward -->
                <div class="flex flex-col gap-3 mt-2">
                    <label class="text-[14px] font-bold text-gray-700">Reward</label>
                    <div class="flex items-center gap-6 mt-1">
                        <label class="flex items-center gap-3 cursor-pointer group bg-gray-50 border border-gray-100 hover:border-orange-200 px-5 py-2.5 rounded-full transition-all" :class="formData.reward === 'Activity' ? 'shadow-sm bg-orange-50/50 border-orange-200' : ''">
                            <div class="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center transition-colors" :class="formData.reward === 'Activity' ? 'bg-[#EF7722] border-[#EF7722]' : 'bg-white group-hover:border-orange-300'">
                                <div v-if="formData.reward === 'Activity'" class="w-2 h-2 bg-white rounded-full shadow-sm"></div>
                            </div>
                            <input type="radio" v-model="formData.reward" value="Activity" class="hidden" />
                            <span class="text-[14px] font-semibold text-gray-700">Activity</span>
                        </label>
                    </div>
                </div>

            </div>

            <!-- Footer Action -->
            <div class="mt-12 pt-6 border-t border-gray-100 flex justify-end gap-3 w-full">
                <button @click="goBack" class="w-32 py-3 rounded-xl font-bold text-[14px] text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors">
                    Cancel
                </button>
                <button @click="createJob" class="w-36 py-3 rounded-xl font-bold text-[15px] text-white bg-gradient-to-r from-[#EF7722] to-[#FAA533] hover:shadow-lg hover:shadow-[#EF7722]/30 transition-all active:scale-95 flex items-center justify-center gap-2">
                    Submit
                </button>
            </div>

        </div>
    </div>
</template>
