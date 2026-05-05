<script setup>
import { ref, computed, watch } from "vue";
import { useJobStore } from "../stores/jobStore";
import JobCard from "@/components/JobCard.vue";
import UpcommingJobCard from "@/components/UpcommingJobCard.vue";

const jobStore = useJobStore();

// 📊 ดึงข้อมูลจริงจาก jobStore
const stats = computed(() => {
  const closedCount = jobStore.jobs.filter(
    (job) => job.status === "Closed" || job.status === "Inactive",
  ).length;

  return [
    {
      label: "Total Jobs",
      count: jobStore.jobs.length,
      icon: "fa-solid fa-briefcase",
      bg: "bg-orange-50",
      color: "text-[#EF7722]",
    },
    {
      label: "Closed Jobs",
      count: closedCount,
      icon: "fa-solid fa-lock",
      bg: "bg-gray-100",
      color: "text-gray-500",
    },
  ];
});

// Management Filters
const searchQuery = ref('');
const filterStatus = ref('All');
const sortBy = ref('Newest');

const filteredJobs = computed(() => {
  let result = [...jobStore.jobs];
  
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(job => 
      job.title.toLowerCase().includes(q) || 
      (job.description && job.description.toLowerCase().includes(q))
    );
  }
  
  if (filterStatus.value !== 'All') {
    if (filterStatus.value === 'Active') {
       result = result.filter(job => job.status !== 'Closed' && job.status !== 'Inactive');
    } else {
       result = result.filter(job => job.status === filterStatus.value);
    }
  }
  
  if (sortBy.value === 'Newest') {
    result.sort((a, b) => b.id - a.id);
  } else if (sortBy.value === 'Oldest') {
    result.sort((a, b) => a.id - b.id);
  }
  
  return result;
});

// Pagination Logic
const currentPage = ref(1);
const itemsPerPage = 4;

const totalPages = computed(() => Math.ceil(filteredJobs.value.length / itemsPerPage) || 1);
const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredJobs.value.slice(start, start + itemsPerPage);
});

watch([searchQuery, filterStatus, sortBy], () => {
  currentPage.value = 1;
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const upcomingJobs = computed(() => {
  const now = new Date();
  const in7Days = new Date(now);
  in7Days.setDate(in7Days.getDate() + 7);

  now.setHours(0, 0, 0, 0);
  in7Days.setHours(23, 59, 59, 999);

  return jobStore.jobs
    .filter((job) => {
      if (!job.date) return false;
      const jobDate = new Date(job.date);
      return jobDate >= now && jobDate <= in7Days;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
});
</script>

<template>
  <div class="px-4 xl:px-6 2xl:px-0 max-w-350 mx-auto w-full pt-4">
    <div
      class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full mb-2"
    >
      <h1 class="text-[24px] font-bold text-[#1F2937]">Manage Jobs</h1>
      
      <div class="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
        <!-- Search -->
        <div class="flex items-center bg-[#F9FAFB] rounded-full px-5 py-2 shadow-sm border border-[#F3F4F6] w-full sm:w-[220px] focus-within:bg-white focus-within:border-gray-200 transition-all">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search jobs..."
            class="flex-1 bg-transparent outline-none text-[13px] font-medium text-gray-700 placeholder-gray-400"
          />
          <i class="fa-solid fa-magnifying-glass text-gray-400 text-sm"></i>
        </div>
        
        <!-- Filter & Sort -->
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <select v-model="filterStatus" class="bg-[#F9FAFB] border border-[#F3F4F6] text-gray-700 text-[13px] font-medium rounded-full px-4 py-2.5 shadow-sm outline-none focus:border-gray-300 w-1/2 sm:w-auto cursor-pointer transition-all">
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>
          
          <select v-model="sortBy" class="bg-[#F9FAFB] border border-[#F3F4F6] text-gray-700 text-[13px] font-medium rounded-full px-4 py-2.5 shadow-sm outline-none focus:border-gray-300 w-1/2 sm:w-auto cursor-pointer transition-all">
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </div>

        <!-- Create Button -->
        <button
          @click="$router.push('/admin/create-job')"
          class="bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-white px-5 py-2.5 rounded-full font-bold text-[13px] hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap flex items-center justify-center gap-2 shrink-0 active:scale-95 border border-[#EF7722]/20 w-full sm:w-auto"
        >
          <i class="fa-solid fa-plus"></i>
          <span class="inline">Create Job</span>
        </button>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-6 lg:gap-4 flex-1 pt-4">
      <div class="flex-1 flex flex-col min-h-[73vh]">
        <div class="grid grid-cols-2 gap-4 mb-8">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-white p-5 sm:p-6 rounded-[24px] border border-[#EBEBEB] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div
              :class="`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`"
            >
              <i :class="`${stat.icon} text-xl`"></i>
            </div>
            <div>
              <p
                class="text-[#6B7280] text-[12px] sm:text-[13px] font-bold uppercase tracking-wider mb-0.5"
              >
                {{ stat.label }}
              </p>
              <h3 class="text-2xl sm:text-3xl font-black text-[#1F2937]">
                {{ stat.count }}
              </h3>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <div v-if="paginatedJobs.length === 0" class="flex flex-col items-center justify-center py-10 bg-white rounded-2xl border border-[#EBEBEB] shadow-sm">
             <i class="fa-solid fa-inbox text-4xl text-gray-300 mb-3"></i>
             <p class="text-gray-500 font-medium">No jobs found matching your criteria</p>
          </div>
          <JobCard
            v-for="job in paginatedJobs"
            :key="job.id"
            :data="job"
            :isAdmin="true"
          />
        </div>

        <!-- Pagination -->
        <div
          class="mt-4 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.02)] border border-[#EBEBEB] flex justify-between items-center transition-all"
        >
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-[13px] transition-all duration-300"
            :class="
              currentPage === 1
                ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                : 'bg-[#FFF8F1] text-[#EF7722] hover:bg-[#EF7722] hover:text-white hover:shadow-md cursor-pointer active:scale-95 border border-[#EF7722]/20 hover:border-transparent'
            "
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Prev
          </button>

          <div class="hidden sm:flex items-center gap-1.5 px-4">
            <span class="text-[13px] font-bold text-gray-400">Page</span>
            <span
              class="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-[13px] font-black text-[#1F2937]"
              >{{ currentPage }}</span
            >
            <span class="text-[13px] font-bold text-gray-400">of</span>
            <span class="text-[13px] font-black text-gray-500">{{
              totalPages
            }}</span>
          </div>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-[13px] transition-all duration-300"
            :class="
              currentPage === totalPages
                ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-white hover:shadow-[0_8px_15px_rgba(239,119,34,0.3)] hover:-translate-y-0.5 cursor-pointer active:scale-95 border border-transparent'
            "
          >
            Next
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        class="w-full lg:w-[320px] bg-[#FFF8F1] rounded-3xl p-5 flex flex-col gap-6 border border-[#EBEBEB]/60 overflow-y-auto mb-13"
      >
        <div class="flex flex-col gap-4">
          <h3 class="text-[16px] font-bold text-[#1F2937] leading-snug">
            Upcoming Events
            <span
              class="text-[12px] font-medium text-gray-400 whitespace-nowrap ml-0.5"
              >(7 days)</span
            >
          </h3>
          <div class="flex flex-col gap-3">
            <UpcommingJobCard
              v-for="job in upcomingJobs"
              :key="job.id"
              :task="job"
            />
            <div
              v-if="upcomingJobs.length === 0"
              class="text-[13px] text-[#6B7280] bg-white p-4 rounded-[14px] border border-[#EBEBEB]/60 text-center shadow-sm"
            >
              No upcoming events in the next 7 days.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-orange-gradient {
  background: linear-gradient(135deg, #f27f21 0%, #faa533 100%);
}
</style>
