<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobStore } from '@/stores/jobStore'
import { useAuthStore } from '@/stores/authStore'
import { useTaskStore } from '@/stores/taskStore'
import { useNotificationStore } from '@/stores/notificationStore'

const route = useRoute()
const router = useRouter()
const jobStore = useJobStore()
const authStore = useAuthStore()
const taskStore = useTaskStore()
const notificationStore = useNotificationStore()

const isAdmin = computed(() => authStore.user?.role === 'admin')

const job = computed(() =>
    jobStore.jobs.find(j => j.id == route.params.id)
)

const isSuccessModalOpen = ref(false)
const isAlreadyAppliedModalOpen = ref(false)
const isApplying = ref(false)

const isAlreadyApplied = computed(() => {
    return taskStore.tasks.some(t => t.jobId === job.value?.id)
})

// Local state for editing
const editForm = ref({
    title: '',
    description: '',
    location: '',
    date: '',
    positions: 0,
    reward: ''
})

const initializeForm = () => {
    if (job.value) {
        editForm.value = { ...job.value }
    }
}

onMounted(() => {
    initializeForm()
    if (taskStore.tasks.length === 0 && !taskStore.isLoading) {
        taskStore.fetchTasks(authStore.user?.id)
    }
})

watch(job, (newJob) => {
    if (newJob) initializeForm()
})

const saveChanges = () => {
    // Modify job in store or handle API. For mock:
    if (job.value) {
        Object.assign(job.value, editForm.value)
    }
    router.back()
}

const applyForJob = async () => {
    if (!job.value || isApplying.value) return;
    
    // Check duplication
    if (isAlreadyApplied.value) {
        isAlreadyAppliedModalOpen.value = true;
        return;
    }
    
    isApplying.value = true;
    
    await taskStore.addTask({
        jobId: job.value.id,
        title: job.value.title,
        date: job.value.date,
        status: 'Pending'
    });
    
    // Push live notification
    notificationStore.addNotification({
        type: 'jobs',
        jobId: job.value.id,
        subject: `Registration for "${job.value.title.substring(0, 40)}" Successful!`,
        poster: 'PleonQ System',
        icon: 'fa-briefcase',
        body: `You have successfully registered for "${job.value.title}". Your application status is Pending, awaiting admin review.`
    });
    
    isApplying.value = false;
    isSuccessModalOpen.value = true;
}

const proceedToTasks = () => {
    isSuccessModalOpen.value = false;
    router.push('/taskManagement');
}

const goBack = () => {
    router.back()
}

const toggleLike = () => {
    jobStore.toggleLike(job.value.id)
}
</script>

<template>
    <div class="min-h-screen pb-2">

        <!--  Header -->
        <div class="flex justify-between items-center p-4">

            <button @click="goBack"
                class="bg-orange-gradient text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 cursor-pointer transition-transform hover:-translate-x-1 active:scale-95 shadow-sm hover:shadow-md">
                ← Go back
            </button>

            <button @click="toggleLike"
                class="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-orange-400">
                <svg class="w-5 h-5" :fill="job?.liked ? 'currentColor' : 'none'" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>

        </div>

        <!--  Image -->
        <div class="px-4">
            <div class="rounded-2xl overflow-hidden">
                <img src="@/assets/img/card_img.jpg" class="w-full h-48 object-cover" />
            </div>
        </div>

        <!--  Content -->
        <div class="px-4 mt-4 flex flex-col h-full">

            <!-- Title -->
            <div v-if="isAdmin" class="mb-3">
                <input v-model="editForm.title" type="text" class="text-xl font-bold text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-orange-400" placeholder="Job Title" />
            </div>
            <h1 v-else class="text-[20px] sm:text-[24px] font-extrabold text-[#1F2937] mb-3 tracking-tight leading-snug">
                {{ job?.title }}
            </h1>

            <!-- Info Labels -->
            <div class="flex flex-wrap gap-2 mb-5">
                <!-- Location -->
                <div class="flex items-center gap-1.5 bg-[#FFF8F1] text-[#EF7722] px-3 py-1.5 rounded-xl text-[12px] font-bold border border-[#FAA533]/30 shadow-sm transition-all hover:shadow-md">
                    <i class="fa-solid fa-location-dot"></i>
                    <input v-if="isAdmin" v-model="editForm.location" type="text" class="bg-white border border-[#FAA533]/50 rounded px-2 py-0.5 w-full focus:outline-none text-[#EF7722]" placeholder="Location" />
                    <span v-else>{{ job?.location }}</span>
                </div>

                <!-- Date -->
                <div class="flex items-center gap-1.5 bg-[#FFF8F1] text-[#EF7722] px-3 py-1.5 rounded-xl text-[12px] font-bold border border-[#FAA533]/30 shadow-sm transition-all hover:shadow-md">
                    <i class="fa-solid fa-calendar-days"></i>
                    <input v-if="isAdmin" v-model="editForm.date" type="date" class="bg-white border border-[#FAA533]/50 rounded px-2 py-0.5 w-full focus:outline-none text-[#EF7722] cursor-pointer" placeholder="Date" />
                    <span v-else>{{ job?.date }}</span>
                </div>

                <!-- Positions -->
                <div class="flex items-center gap-1.5 bg-[#FFF8F1] text-[#EF7722] px-3 py-1.5 rounded-xl text-[12px] font-bold border border-[#FAA533]/30 shadow-sm transition-all hover:shadow-md">
                    <i class="fa-solid fa-users"></i>
                    <div v-if="isAdmin" class="flex items-center gap-1">
                       <input v-model="editForm.positions" type="number" class="bg-white border border-[#FAA533]/50 rounded px-2 py-0.5 w-16 focus:outline-none text-[#EF7722]" placeholder="Positions" />
                       <span>คน</span>
                    </div>
                    <span v-else>{{ job?.positions }} คน</span>
                </div>

                <!-- Reward -->
                <div class="flex items-center gap-1.5 bg-[#FFF8F1] text-[#EF7722] px-3 py-1.5 rounded-xl text-[12px] font-bold border border-[#FAA533]/30 shadow-sm transition-all hover:shadow-md">
                    <i class="fa-solid fa-clock"></i>
                    <select v-if="isAdmin" v-model="editForm.reward" class="bg-white border border-[#FAA533]/50 rounded px-2 py-0.5 w-full focus:outline-none text-[#EF7722] cursor-pointer appearance-none">
                        <option value="ชั่วโมงกิจกรรม">ชั่วโมงกิจกรรม</option>
                    </select>
                    <span v-else>{{ job?.reward }}</span>
                </div>
            </div>

            <!-- Description -->
            <div v-if="isAdmin" class="flex flex-col gap-2 mb-4">
                <label class="text-[14px] font-extrabold text-[#EF7722] uppercase tracking-widest flex items-center gap-2 px-1">
                   <i class="fa-solid fa-circle-info"></i> About This Job
                </label>
                <textarea v-model="editForm.description" class="w-full bg-[#F9FAFB] border border-gray-200 rounded-[28px] px-5 py-4 text-[14px] font-medium text-gray-600 leading-relaxed focus:outline-none focus:border-orange-400 focus:bg-white focus:shadow-sm transition-all shadow-inner resize-none h-32" placeholder="Job Description"></textarea>
            </div>
            <div v-else class="flex flex-col gap-2 mb-4">
                <label class="text-[14px] font-extrabold text-[#EF7722] uppercase tracking-widest flex items-center gap-2 px-1">
                   <i class="fa-solid fa-circle-info"></i> About This Job
                </label>
                <div class="w-full bg-[#F9FAFB] border border-gray-200 rounded-[28px] px-5 py-4 text-[13px] sm:text-[14px] leading-relaxed font-medium text-[#4B5563] shadow-inner min-h-[8rem] whitespace-pre-wrap">
                    {{ job?.description }}
                </div>
            </div>

            <!-- Action Button -->
            <div class="mt-auto pt-6 pb-4 justify-end flex">
                <button v-if="isAdmin" @click="saveChanges"
                    class="bg-orange-gradient hover:shadow-lg transition-shadow text-white px-8 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:-translate-y-0.5 active:scale-95">
                    <i class="fa-solid fa-check"></i>
                    Save Changes
                </button>
                <div v-else>
                    <button v-if="isAlreadyApplied" @click="isAlreadyAppliedModalOpen = true"
                        class="bg-gray-200 text-gray-400 px-8 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-inner cursor-not-allowed border border-gray-300">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        Already Registered
                    </button>
                    <button v-else @click="applyForJob" :disabled="isApplying"
                        class="bg-orange-gradient hover:shadow-lg transition-shadow text-white px-8 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                        {{ isApplying ? 'Registering...' : 'Register' }}
                    </button>
                </div>
            </div>

        </div>

        <!-- Success Modal -->
        <Teleport to="body">
          <Transition name="modal">
            <div v-if="isSuccessModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" @click="proceedToTasks"></div>
              
              <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center gap-4 transform transition-all border border-[#EBEBEB] text-center">
                <div class="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-2 shadow-inner border border-green-100">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 class="text-[20px] font-extrabold text-[#1F2937] tracking-tight">Registration Successful!</h3>
                <p class="text-[14px] text-[#6B7280] font-medium leading-relaxed">
                  You have successfully registered for this event. Admin will review your information shortly.
                </p>
                <button @click="proceedToTasks" class="mt-4 w-full bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-[#EF7722]/30 transition-all active:scale-95 text-[15px]">
                  OK
                </button>
              </div>
            </div>
          </Transition>
        </Teleport>

        <!-- Duplication Warning Modal -->
        <Teleport to="body">
          <Transition name="modal">
            <div v-if="isAlreadyAppliedModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" @click="isAlreadyAppliedModalOpen = false"></div>
              
              <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center gap-4 transform transition-all border border-[#EBEBEB] text-center">
                <div class="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mb-2 shadow-inner border border-orange-100">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                </div>
                <h3 class="text-[20px] font-extrabold text-[#1F2937] tracking-tight">Already Registered</h3>
                <p class="text-[14px] text-[#6B7280] font-medium leading-relaxed">
                  You have already registered for this event. You cannot register again.
                </p>
                <button @click="isAlreadyAppliedModalOpen = false" class="mt-4 w-full bg-[#FFF8F1] border border-gray-200 text-[#1F2937] hover:text-[#EF7722] hover:bg-[#FFFFFF] hover:border-[#FAA533] px-8 py-3 rounded-xl font-bold transition-all active:scale-95 text-[15px]">
                  Close
                </button>
              </div>
            </div>
          </Transition>
        </Teleport>

    </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95) translateY(10px);
}
</style>