<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobStore } from '@/stores/jobStore'
import { useAuthStore } from '@/stores/authStore'
import tasksData from '@/data/tasks.json'
import profileData from '@/data/profile.json'

const route = useRoute()
const router = useRouter()
const jobStore = useJobStore()
const authStore = useAuthStore()

const isAdmin = computed(() => authStore.user?.role === 'admin')

const job = computed(() =>
    jobStore.jobs.find(j => j.id == route.params.id)
)

const applicants = ref([])

const fetchApplicants = () => {
    applicants.value = [];
    if (!isAdmin.value || !job.value) return;

    const applicantsKey = `job_applicants_${job.value.id}`;
    let jobApplicants = JSON.parse(sessionStorage.getItem(applicantsKey));

    if (!jobApplicants) {
        jobApplicants = [];
        const allUserIds = Object.keys(tasksData);
        allUserIds.forEach(userId => {
            const userTasks = tasksData[userId];
            const task = userTasks.find(t => t.jobId == job.value.id);
            if (task) {
                const userProfile = profileData.find(p => p.userId == userId);
                jobApplicants.push({
                    userId: userId,
                    taskId: task.id,
                    name: userProfile ? userProfile.name : `Student ${userId}`,
                    avatar: userProfile ? userProfile.avatar : null,
                    status: task.status,
                    date: task.date,
                    role: task.role || (job.value.roles && job.value.roles.length > 0 ? job.value.roles[0].name : 'N/A')
                });
            }
        });
        sessionStorage.setItem(applicantsKey, JSON.stringify(jobApplicants));
    } else {
        // Update existing mock data that might have missing roles or wrong names
        let updated = false;
        jobApplicants.forEach(app => {
            const userProfile = profileData.find(p => p.userId == app.userId);
            if (userProfile && app.name !== userProfile.name) {
                app.name = userProfile.name;
                app.avatar = userProfile.avatar;
                updated = true;
            }

            if (!app.role || app.role === 'N/A') {
                const userTasks = tasksData[app.userId] || [];
                const task = userTasks.find(t => t.jobId == job.value.id);
                if (task && task.role) {
                    app.role = task.role;
                    updated = true;
                } else if (job.value.roles && job.value.roles.length > 0) {
                    app.role = job.value.roles[0].name;
                    updated = true;
                }
            }
        });
        if (updated) {
            sessionStorage.setItem(applicantsKey, JSON.stringify(jobApplicants));
        }
    }

    applicants.value = jobApplicants;
}

const updateApplicantStatus = (app, newStatus) => {
    const applicantsKey = `job_applicants_${job.value.id}`;
    let jobApplicants = JSON.parse(sessionStorage.getItem(applicantsKey)) || [];
    const appIndex = jobApplicants.findIndex(a => a.userId == app.userId);
    if (appIndex !== -1) {
        jobApplicants[appIndex].status = newStatus;
        sessionStorage.setItem(applicantsKey, JSON.stringify(jobApplicants));
    }

    app.status = newStatus;

    const userTasksKey = `pleonq_tasks_${app.userId}`;
    let userTasks = [];
    if (sessionStorage.getItem(userTasksKey)) {
        userTasks = JSON.parse(sessionStorage.getItem(userTasksKey));
    } else if (tasksData[app.userId]) {
        userTasks = tasksData[app.userId];
    }
    
    if (userTasks) {
        const taskIndex = userTasks.findIndex(t => t.jobId == job.value.id);
        if (taskIndex !== -1) {
            userTasks[taskIndex].status = newStatus;
            sessionStorage.setItem(userTasksKey, JSON.stringify(userTasks));
        }
    }
}

onMounted(() => {
    if (!isAdmin.value) {
        router.push('/');
        return;
    }
    fetchApplicants()
})

watch(job, (newJob) => {
    if (newJob) {
        fetchApplicants()
    }
})

const goBack = () => {
    router.back()
}
</script>

<template>
    <div class="min-h-screen pb-2 max-w-5xl mx-auto w-full">

        <!--  Header -->
        <div class="flex justify-between items-center p-4">
            <button @click="goBack"
                class="bg-orange-gradient text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 cursor-pointer transition-transform hover:-translate-x-1 active:scale-95 shadow-sm hover:shadow-md">
                ← Back to Job Detail
            </button>
        </div>

        <div class="px-4 mt-6 flex flex-col h-full pb-10">
            <h1 class="text-[20px] sm:text-[24px] font-extrabold text-[#1F2937] dark:text-gray-100 mb-2 tracking-tight leading-snug">
                Manage Applicants
            </h1>
            <p class="text-gray-500 dark:text-gray-400 text-sm mb-6 font-medium">Job: {{ job?.title }}</p>

            <!-- Applicants Section -->
            <div class="flex flex-col gap-4">
                <div v-if="applicants.length === 0" class="w-full bg-[#F9FAFB] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[28px] px-5 py-8 text-center text-sm text-gray-500 dark:text-gray-400 italic shadow-inner">
                    No one has applied for this job yet.
                </div>
                <div v-else class="flex flex-col gap-4">
                    <div v-for="app in applicants" :key="app.userId" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-sm gap-4 transition-all hover:shadow-md">
                        <div class="flex items-center gap-4">
                            <img v-if="app.avatar" :src="app.avatar" class="w-12 h-12 rounded-full object-cover border border-orange-200 dark:border-gray-600 shadow-inner shrink-0" alt="Avatar" />
                            <div v-else class="w-12 h-12 rounded-full bg-orange-100 dark:bg-gray-700 flex items-center justify-center text-orange-600 dark:text-orange-400 font-extrabold text-lg shrink-0 border border-orange-200 dark:border-gray-600 shadow-inner">
                                {{ app.name.charAt(0) }}
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <span class="font-bold text-[#1F2937] dark:text-gray-100 text-[16px] tracking-tight">{{ app.name }}</span>
                                <div class="flex items-center gap-2 flex-wrap">
                                    <span v-if="app.role && app.role !== 'N/A'" class="text-[12px] bg-orange-50 dark:bg-[#EF7722]/10 text-[#EF7722] px-2 py-0.5 rounded-md border border-orange-100 dark:border-orange-500/30 font-bold flex items-center gap-1"><i class="fa-solid fa-user-tag text-[10px]"></i> {{ app.role }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-2.5 w-full sm:w-auto" v-if="app.status === 'Requested'">
                            <button @click="updateApplicantStatus(app, 'Active')" class="flex-1 sm:flex-none bg-[#EF7722] hover:bg-[#FAA533] text-white px-6 py-2.5 rounded-full text-[13px] font-bold transition-all active:scale-95 shadow-sm hover:shadow-[#EF7722]/30 hover:shadow-lg">Accept</button>
                            <button @click="updateApplicantStatus(app, 'Rejected')" class="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-full text-[13px] font-bold transition-all active:scale-95 shadow-sm hover:shadow-red-500/30 hover:shadow-lg">Reject</button>
                        </div>
                        <div class="flex w-full sm:w-auto" v-else>
                            <span :class="{
                                'text-yellow-500': app.status === 'Requested',
                                'text-green-500': app.status === 'Active' || app.status === 'Finished',
                                'text-red-500': app.status === 'Rejected'
                            }" class="text-[13px] font-bold bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-full border border-gray-100 dark:border-gray-700">
                                {{ app.status }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
