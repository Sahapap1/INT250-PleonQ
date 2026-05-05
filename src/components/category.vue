<template>
  <div class="relative w-full z-20 flex items-center justify-center py-4 sm:py-6 px-4 md:px-0">
    <!-- Pop-up Container -->
    <div class="relative w-full max-w-[650px] bg-[#FFFFFF] rounded-[24px] sm:rounded-[28px] shadow-[0_20px_60px_-15px_rgba(239,119,34,0.15)] overflow-hidden flex flex-col border border-[#EBEBEB] transform transition-all">
      
      <!-- Header -->
      <div class="bg-gradient-to-br from-[#FFF8F1] to-white px-5 sm:px-8 py-4 sm:py-[22px] border-b border-[#EBEBEB] relative overflow-hidden flex justify-between items-center">
        <h2 class="relative text-xl sm:text-2xl font-bold text-[#1F2937] tracking-tight drop-shadow-sm">Job Suggestion</h2>
        <button @click="handleCancel" class="relative w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-all z-10 hover:shadow-sm border border-transparent hover:border-gray-200" title="Close">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <!-- Body -->
      <div class="px-5 sm:px-8 pt-6 sm:pt-7 pb-6 sm:pb-8 flex flex-col relative bg-[#FFFFFF]">
        <h3 class="text-[15px] sm:text-[18px] text-[#6B7280] mb-6 sm:mb-8 font-medium">What type of jobs are you interested in?</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 sm:gap-y-5">
          <div 
            v-for="(role, index) in jobRoles" 
            :key="role.name" 
            class="flex items-center gap-3 cursor-pointer group"
            @click="toggleCategory(role.name)"
          >
            <!-- Icon/Indicator block (3D effect + Checkmark) -->
            <div 
              class="relative w-12 h-[42px] rounded-[12px] shrink-0 transition-all duration-300 group-hover:scale-105 shadow-sm ring-1 ring-[#EBEBEB] flex items-center justify-center text-[#FFFFFF]"
              :class="Math.floor(index / 2) % 2 === 0 ? 'bg-[#FAA533]' : 'bg-[#EF7722]'"
            >
              <i v-if="!categoryStore.selectedCategories.includes(role.name)" :class="role.icon" class="text-[18px]"></i>
              <!-- Checkmark SVG -->
              <svg 
                v-else
                class="w-6 h-6 animate-[scaleIn_0.25s_ease-out]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <!-- Text block (Floating effect & Active state) -->
            <div 
              class="flex-grow h-[42px] rounded-[12px] flex items-center px-[18px] transition-all duration-300 shadow-sm border group-hover:-translate-y-[2px]"
              :class="[
                Math.floor(index / 2) % 2 === 0 ? 'bg-[#FFF8F1] border-[#EBEBEB] group-hover:border-[#FAA533]' : 'bg-[#FFF8F1]/50 border-transparent group-hover:border-[#EF7722] group-hover:bg-[#FFF8F1]',
                categoryStore.selectedCategories.includes(role.name) ? 'border-[#EF7722] ring-1 ring-[#EF7722] shadow-md transform -translate-y-[1px]' : ''
              ]"
            >
              <span 
                class="text-[13px] font-bold tracking-wide transition-colors duration-200"
                :class="categoryStore.selectedCategories.includes(role.name) ? 'text-[#EF7722]' : 'text-[#1F2937]'"
              >
                {{ role.name }}
              </span>
            </div>
          </div>
        </div>

        <!-- Action Area -->
        <div class="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
          <!-- Save Button -->
          <button 
            @click="saveCategories"
            class="relative w-full sm:w-auto bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-[#FFFFFF] font-bold text-[15px] py-[10px] px-10 rounded-full shadow-[0_8px_20px_rgba(239,119,34,0.3)] transition-all duration-300 active:scale-95 group overflow-hidden tracking-wider border border-[#EF7722]/40"
            :class="categoryStore.selectedCategories.length > 0 && !categoryStore.isLoading ? 'hover:shadow-[0_12px_25px_rgba(239,119,34,0.4)] cursor-pointer' : 'opacity-70 grayscale-[30%] cursor-not-allowed'"
          >
            <!-- Button shine effect -->
            <span v-if="categoryStore.selectedCategories.length > 0 && !categoryStore.isLoading" class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
            <span class="relative">{{ categoryStore.isLoading ? 'Saving...' : 'Save' }}</span>
          </button>

          <!-- Clear Button -->
          <button 
            @click="handleCancel"
            class="relative w-full sm:w-auto bg-white text-[#6B7280] hover:text-[#1F2937] font-bold text-[15px] py-[10px] px-8 rounded-full transition-all duration-300 active:scale-95 border border-[#EBEBEB] hover:border-[#D1D5DB] hover:bg-gray-50"
          >
            Clear
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCategoryStore } from '../stores/categoryStore';

const categoryStore = useCategoryStore();

const jobRoles = [
  { name: 'Workshop', icon: 'fa-solid fa-users' },
  { name: 'Welfare', icon: 'fa-solid fa-hand-holding-heart' },
  { name: 'Teacher Assistant', icon: 'fa-solid fa-chalkboard-teacher' },
  { name: 'Core Team', icon: 'fa-solid fa-users-cog' },
  { name: 'Marketing', icon: 'fa-solid fa-bullhorn' },
  { name: 'IT / Technical', icon: 'fa-solid fa-laptop-code' },
  { name: 'Photo', icon: 'fa-solid fa-camera' }
]

onMounted(() => {
  categoryStore.fetchCategories();
});

const toggleCategory = (category) => {
  categoryStore.toggleCategory(category);
};

const saveCategories = async () => {
  if (categoryStore.selectedCategories.length === 0) return;
  await categoryStore.saveCategories();
  // Usually this would close the modal or notify success.
  emit('close');
};

const handleCancel = () => {
  categoryStore.selectedCategories = [];
  localStorage.setItem('selectedCategories', JSON.stringify([]));
  emit('close');
};

const emit = defineEmits(['close'])
</script>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
