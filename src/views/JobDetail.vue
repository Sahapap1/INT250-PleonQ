<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useJobStore } from "@/stores/jobStore";
import { useAuthStore } from "@/stores/authStore";
import { useTaskStore } from "@/stores/taskStore";

const route = useRoute();
const router = useRouter();
const jobStore = useJobStore();
const authStore = useAuthStore();
const taskStore = useTaskStore();

const isAdmin = computed(() => authStore.user?.role === "admin");

const job = computed(() => jobStore.jobs.find((j) => j.id == route.params.id));

const isSuccessModalOpen = ref(false);
const isAlreadyAppliedModalOpen = ref(false);

const isAlreadyApplied = computed(() => {
  return taskStore.tasks.some((t) => t.jobId === job.value?.id);
});

// Local state for editing
const editForm = ref({
  title: "",
  description: "",
  location: "",
  date: "",
  positions: 0,
  reward: "",
});

const initializeForm = () => {
  if (job.value) {
    editForm.value = { ...job.value };
  }
};

onMounted(() => {
  initializeForm();
  if (taskStore.tasks.length === 0 && !taskStore.isLoading) {
    taskStore.fetchTasks();
  }
});

watch(job, (newJob) => {
  if (newJob) initializeForm();
});

const saveChanges = () => {
  // Modify job in store or handle API. For mock:
  if (job.value) {
    Object.assign(job.value, editForm.value);
  }
  router.back();
};

const applyForJob = async () => {
  if (!job.value) return;

  // Check duplication
  if (isAlreadyApplied.value) {
    isAlreadyAppliedModalOpen.value = true;
    return;
  }

  await taskStore.addTask({
    jobId: job.value.id,
    title: job.value.title,
    date: job.value.date,
    status: "Pending",
  });
  isSuccessModalOpen.value = true;
};

const proceedToTasks = () => {
  isSuccessModalOpen.value = false;
  router.push("/taskManagement");
};

const goBack = () => {
  router.back();
};

const toggleLike = () => {
  jobStore.toggleLike(job.value.id);
};
</script>

<template>
  <div class="min-h-screen pb-2">
    <!--  Header -->
    <div class="flex justify-between items-center p-4">
      <button
        @click="goBack"
        class="bg-orange-gradient text-white px-4 py-2 rounded-full text-sm flex items-center gap-2"
      >
        ← Go back
      </button>

      <button
        @click="toggleLike"
        class="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-orange-400"
      >
        <svg
          class="w-5 h-5"
          :fill="job?.liked ? 'currentColor' : 'none'"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
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
      <!--  Content -->
      <div v-if="isAdmin" class="flex flex-col gap-3">
        <input
          v-model="editForm.title"
          type="text"
          class="text-xl font-bold text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-orange-400"
          placeholder="Job Title"
        />
        <textarea
          v-model="editForm.description"
          class="text-gray-500 text-sm leading-relaxed bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full h-24 focus:outline-none focus:border-orange-400 resize-none"
          placeholder="Job Description"
        ></textarea>
      </div>
      <div v-else>
        <h1 class="text-xl font-bold text-gray-800 mb-2">
          {{ job?.title }}
        </h1>

        <p class="text-gray-500 text-sm leading-relaxed mb-4">
          {{ job?.description }}
        </p>
      </div>

      <!--  Info -->
      <div class="flex flex-col gap-3 mt-4 text-sm text-gray-600">
        <div class="flex items-center gap-3">
          <i
            class="fa-solid fa-location-dot text-orange-400 w-4 text-center"
          ></i>
          <input
            v-if="isAdmin"
            v-model="editForm.location"
            type="text"
            class="bg-gray-50 border border-gray-200 rounded-md px-2 py-1 w-full focus:outline-none focus:border-orange-400"
            placeholder="Location"
          />
          <span v-else>{{ job?.location }}</span>
        </div>

        <div class="flex items-center gap-3">
          <i
            class="fa-solid fa-calendar-days text-orange-400 w-4 text-center"
          ></i>
          <input
            v-if="isAdmin"
            v-model="editForm.date"
            type="text"
            class="bg-gray-50 border border-gray-200 rounded-md px-2 py-1 w-full focus:outline-none focus:border-orange-400"
            placeholder="Date"
          />
          <span v-else>{{ job?.date }}</span>
        </div>

        <div class="flex items-center gap-3">
          <i class="fa-solid fa-users text-orange-400 w-4 text-center"></i>
          <div v-if="isAdmin" class="flex items-center gap-2 w-full">
            <input
              v-model="editForm.positions"
              type="number"
              class="bg-gray-50 border border-gray-200 rounded-md px-2 py-1 w-20 focus:outline-none focus:border-orange-400"
              placeholder="Positions"
            />
            <span>คน</span>
          </div>
          <span v-else>{{ job?.positions }} คน</span>
        </div>

        <div class="flex items-center gap-3">
          <i class="fa-solid fa-gift text-orange-400 w-4 text-center"></i>
          <input
            v-if="isAdmin"
            v-model="editForm.reward"
            type="text"
            class="bg-gray-50 border border-gray-200 rounded-md px-2 py-1 w-full focus:outline-none focus:border-orange-400"
            placeholder="Reward"
          />
          <span v-else>{{ job?.reward }}</span>
        </div>
        <div
          v-if="isAdmin"
          class="relative overflow-hidden bg-[#FFFFFF] rounded-[22px] shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start group transition-all duration-500 hover:shadow-[0_15px_50px_rgba(239,119,34,0.08)] border border-[#EBEBEB] z-10"
        >
          <!-- Scanner Icon Block -->
          <div 
            @click="openScanner"
            class="w-24 h-24 bg-[#FFF8F1] rounded-[28px] shrink-0 flex items-center justify-center text-[#1F2937]/40 shadow-[inset_0_2px_10px_rgba(0,0,0,0.03)] border border-[#EBEBEB]/60 relative group-hover:border-[#FAA533]/40 transition-all duration-500 z-10 overflow-hidden cursor-pointer hover:scale-105 group/qr"
          >
            <!-- Scan Icon -->
            <svg
              class="w-10 h-10 text-[#EF7722] opacity-80 group-hover/qr:opacity-100 group-hover/qr:scale-110 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2M16 4h2a2 2 0 012 2v2M16 20h2a2 2 0 002-2v-2"
              />
              <circle
                cx="12"
                cy="12"
                r="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
              />
            </svg>
          </div>

          <div
            class="flex flex-col mt-3 gap-1.5 text-center md:text-left flex-grow z-10"
          >
            <h3
              class="text-[#1F2937] text-[16px] font-extrabold tracking-tight"
            >
              Scan Activity QR
            </h3>
            <p
              class="text-[13px] text-[#6B7280] font-medium leading-relaxed max-w-[280px]"
            >
              Tap to open the scanner and check in for the activity.
            </p>
          </div>

          <div class="md:absolute md:bottom-8 md:right-8 mt-4 md:mt-0 z-10">
            <button
              @click="openScanner"
              class="relative overflow-hidden bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-[#FFFFFF] font-bold text-[13px] py-2 px-6 rounded-full shadow-[0_8px_15px_rgba(239,119,34,0.3)] hover:shadow-[0_12px_20px_rgba(239,119,34,0.4)] transition-all duration-300 transform group-hover:scale-105 active:scale-95 group/btn border border-[#EF7722]/40 cursor-pointer"
            >
              <span
                class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#FFFFFF]/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"
              ></span>
              <span class="relative tracking-wider flex items-center gap-2">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  ></path>
                </svg>
                Open Scanner
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div class="mt-auto pt-6 pb-4 justify-end flex">
        <button
          v-if="isAdmin"
          @click="saveChanges"
          class="bg-green-500 hover:bg-green-600 transition-colors text-white px-8 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-md"
        >
          <i class="fa-solid fa-check"></i>
          Save Changes
        </button>
        <div v-else>
          <button
            v-if="isAlreadyApplied"
            @click="isAlreadyAppliedModalOpen = true"
            class="bg-gray-200 text-gray-400 px-8 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-inner cursor-not-allowed border border-gray-300"
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
            ท่านได้ลงทะเบียนแล้ว
          </button>
          <button
            v-else
            @click="applyForJob"
            class="bg-orange-gradient hover:shadow-lg transition-shadow text-white px-8 py-2.5 rounded-full text-sm font-bold flex items-center gap-2"
          >
            Apply
          </button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isSuccessModalOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div
            class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            @click="proceedToTasks"
          ></div>

          <div
            class="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center gap-4 transform transition-all border border-[#EBEBEB] text-center"
          >
            <div
              class="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-2 shadow-inner border border-green-100"
            >
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3
              class="text-[20px] font-extrabold text-[#1F2937] tracking-tight"
            >
              ลงทะเบียนสำเร็จ!
            </h3>
            <p class="text-[14px] text-[#6B7280] font-medium leading-relaxed">
              คุณได้สมัครงานนี้เรียบร้อยแล้ว
              แอดมินจะทำการตรวจสอบข้อมูลของคุณเร็วๆ นี้
            </p>
            <button
              @click="proceedToTasks"
              class="mt-4 w-full bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-[#EF7722]/30 transition-all active:scale-95 text-[15px]"
            >
              ตกลง (OK)
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Duplication Warning Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isAlreadyAppliedModalOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div
            class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            @click="isAlreadyAppliedModalOpen = false"
          ></div>

          <div
            class="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center gap-4 transform transition-all border border-[#EBEBEB] text-center"
          >
            <div
              class="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mb-2 shadow-inner border border-orange-100"
            >
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </div>
            <h3
              class="text-[20px] font-extrabold text-[#1F2937] tracking-tight"
            >
              ลงทะเบียนซ้ำ
            </h3>
            <p class="text-[14px] text-[#6B7280] font-medium leading-relaxed">
              คุณได้ลงทะเบียนสำหรับงานนี้ไปเรียบร้อยแล้ว
              ไม่สามารถสมัครซ้ำได้ครับ
            </p>
            <button
              @click="isAlreadyAppliedModalOpen = false"
              class="mt-4 w-full bg-[#FFF8F1] border border-gray-200 text-[#1F2937] hover:text-[#EF7722] hover:bg-[#FFFFFF] hover:border-[#FAA533] px-8 py-3 rounded-xl font-bold transition-all active:scale-95 text-[15px]"
            >
              รับทราบ
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
  transition:
    opacity 0.3s ease,
    transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
