<script setup>
import { ref, computed } from "vue";
import { useJobStore } from "../stores/jobStore";
import JobCard from "@/components/JobCard.vue";
import UpcommingJobCard from "@/components/UpcommingJobCard.vue";

const jobStore = useJobStore();

// 📊 ดึงข้อมูลจริงจาก jobStore
const stats = computed(() => [
  {
    label: "Total Job",
    count: jobStore.jobs.length,
  },
  {
    label: "Active Job",
    count: jobStore.jobs.filter(
      (job) => job.status === "active" || job.status === "Open",
    ).length,
  },
]);

// Pagination Logic
const currentPage = ref(1);
const itemsPerPage = 4;

const totalPages = computed(() =>
  Math.ceil(jobStore.jobs.length / itemsPerPage),
);
const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return jobStore.jobs.slice(start, start + itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
</script>

<template>
  <div class="px-4 xl:px-6 2xl:px-0 max-w-350 mx-auto w-full pt-4">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full mb-2"
    >
      <h1 class="text-[24px] font-bold text-[#1F2937]">Admin Dashboard</h1>
      <div
        class="flex items-center bg-[#F9FAFB] rounded-full px-5 py-2.5 shadow-sm border border-[#F3F4F6] w-full max-w-md focus-within:bg-white focus-within:border-gray-200 transition-all"
      >
        <input
          type="text"
          placeholder="Search..."
          class="flex-1 bg-transparent outline-none text-[13px] font-medium text-gray-700 placeholder-gray-400"
        />
        <svg
          class="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-6 lg:gap-4 flex-1 pt-4">
      <div class="flex-1 flex flex-col min-h-[73vh]">

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-white p-6 rounded-[24px] border border-[#EBEBEB] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-center items-center text-center"
          >
            <p class="text-gray-500 text-[13px] font-semibold tracking-tight">
              {{ stat.label }}: {{ stat.count }}
            </p>
          </div>

          <button @click="$router.push('/admin/create-job')"
            class="bg-orange-gradient hover:opacity-90 transition-all rounded-[24px] p-4 flex flex-col items-center justify-center text-white gap-1 shadow-lg shadow-orange-100 active:scale-95"
          >
            <div
              class="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center mb-1"
            >
              <span class="text-xl font-bold">+</span>
            </div>
            <span class="text-[14px] font-bold">Create New Job</span>
          </button>
        </div>

        <div class="flex flex-col gap-3">
          <JobCard
            v-for="job in paginatedJobs"
            :key="job.id"
            :data="job"
            :isAdmin="true"
          />
        </div>

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

          <div class="hidden sm:flex items-center gap-1.5 px-4">
             <span class="text-[13px] font-bold text-gray-400">Page</span>
             <span class="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-[13px] font-black text-[#1F2937]">{{ currentPage }}</span>
             <span class="text-[13px] font-bold text-gray-400">of</span>
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

      <div
        class="w-full lg:w-[320px] bg-[#FFF8F1] rounded-3xl p-5 flex flex-col gap-6 border border-[#EBEBEB]/60 overflow-y-auto mb-13"
      >
        <div class="flex flex-col gap-4">
          <h3 class="text-[16px] font-bold text-[#1F2937]">
            My Upcoming Events
          </h3>
          <div class="flex flex-col gap-3">
            <UpcommingJobCard v-for="n in 4" :key="n" />
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
