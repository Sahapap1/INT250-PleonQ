<template>
  <div class="relative w-full max-w-[850px] mx-auto z-10 transition-all">
    <!-- Orbs behind UI -->
    <div class="absolute -top-[5%] -left-[10%] w-80 h-80 bg-[#EF7722] rounded-full mix-blend-multiply filter blur-[100px] opacity-15 animate-pulse pointer-events-none z-0"></div>
    <div class="absolute -bottom-[5%] -right-[10%] w-80 h-80 bg-[#FAA533] rounded-full mix-blend-multiply filter blur-[100px] opacity-15 animate-[pulse_4s_ease-in-out_infinite] pointer-events-none z-0"></div>

    <div class="relative bg-[#FFF8F1]/90 backdrop-blur-xl rounded-[36px] shadow-[0_10px_50px_rgba(0,0,0,0.05)] border border-[#EBEBEB] p-5 md:p-8 flex flex-col gap-6 md:gap-8 z-10 group/wrapper">
      
      <!-- 1. Profile Info Card -->
      <div class="relative overflow-hidden bg-[#FFFFFF] rounded-[22px] shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-6 md:p-7 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start group transition-all duration-500 hover:shadow-[0_15px_50px_rgba(239,119,34,0.08)] border border-[#EBEBEB] z-10">
        
        <!-- Avatar Block matching the image exactly -->
        <div class="relative shrink-0 mt-3 md:mt-2">
          <!-- Intense ambient glow reflecting the image -->
          <div class="absolute -inset-2.5 bg-gradient-to-tr from-[#EF7722] to-[#FAA533] rounded-full opacity-40 blur-[15px] group-hover:opacity-60 transition duration-700"></div>
          
          <div class="relative w-28 h-28 md:w-24 md:h-24 bg-[#FFFFFF] rounded-full shadow-[inset_0_-4px_10px_rgba(239,119,34,0.1)] border-[4px] border-[#FFF8F1] z-10 overflow-hidden flex items-center justify-center transform group-hover:scale-105 transition-all duration-500 ring-4 ring-[#FFFFFF]">
             <img :src="safeProfile.avatar" alt="Profile avatar" class="w-full h-full object-cover" />
             <!-- Subtle inner border overlay to simulate the clean rim -->
             <div class="absolute inset-0 border border-[#EBEBEB]/20 rounded-full"></div>
          </div>
        </div>
        
        <div class="flex flex-col mt-2 gap-1.5 text-center md:text-left flex-grow z-10">
          <h3 class="text-[20px] font-extrabold text-[#1F2937] tracking-tight mt-1">{{ safeProfile.name }}</h3>
          <p class="text-[14px] font-medium text-[#6B7280] tracking-wide mt-0.5">{{ safeProfile.university }}</p>
          <p class="text-[13px] text-[#6B7280]/80 mt-1">{{ formattedDob }}</p>
        </div>

        <div class="md:absolute md:bottom-7 md:right-7 flex gap-2.5 mt-4 md:mt-0 z-10">
          <button @click="openEditModal" class="bg-[#FFF8F1] hover:bg-[#FFFFFF] text-[#1F2937] hover:text-[#EF7722] font-bold text-[13px] py-1.5 px-6 rounded-full transition-all duration-300 active:scale-95 shadow-sm border border-[#EBEBEB] hover:border-[#FAA533] flex items-center gap-1.5 cursor-pointer">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            Edit
          </button>
          <button class="relative bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-[#FFFFFF] font-bold text-[13px] py-1.5 px-7 rounded-full shadow-[0_8px_15px_rgba(239,119,34,0.3)] hover:shadow-[0_12px_20px_rgba(239,119,34,0.4)] border border-[#EF7722]/50 transition-all duration-300 active:scale-95 group/btn overflow-hidden cursor-pointer">
            <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></span>
            <span class="relative tracking-wider">Save</span>
          </button>
        </div>
      </div>

      <!-- 2. Summary Activity Hours Card -->
      <div class="relative overflow-hidden bg-[#FFFFFF] rounded-[22px] shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start group transition-all duration-500 hover:shadow-[0_15px_50px_rgba(239,119,34,0.08)] border border-[#EBEBEB] z-10">
        
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-[#FFF8F1] rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <!-- Smooth Squircle Progress block matching the image -->
        <div class="w-24 h-24 bg-[#FFF8F1] rounded-[28px] shrink-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.03)] border border-[#EBEBEB]/60 relative overflow-hidden group-hover:shadow-[0_4px_15px_rgba(239,119,34,0.1)] group-hover:border-[#FAA533]/30 transition-all duration-500 flex items-center justify-center">
           
           <div class="relative w-[3.5rem] h-[3.5rem] flex items-center justify-center">
             <!-- SVG Circular Progress Bar -->
             <svg class="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 64 64">
               <defs>
                 <linearGradient id="orangeProgress" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stop-color="#EF7722" />
                   <stop offset="100%" stop-color="#FAA533" />
                 </linearGradient>
               </defs>
               <!-- Background Track -->
               <circle cx="32" cy="32" r="26" fill="none" stroke="#EBEBEB" stroke-width="6" />
               <!-- Foreground Progress (e.g. 65% filled) -->
               <circle cx="32" cy="32" r="26" fill="none" stroke="url(#orangeProgress)" stroke-width="6" stroke-linecap="round"
                 stroke-dasharray="163.36" stroke-dashoffset="57.17" class="group-hover:stroke-dashoffset-[30] transition-all duration-1000 ease-out" />
             </svg>
             <!-- Inner Percentage Label -->
             <span class="text-[14px] font-black text-[#1F2937] group-hover:text-[#EF7722] transition-colors duration-500 tracking-tighter">65%</span>
           </div>

        </div>

        <div class="flex flex-col w-full mt-1.5 text-center md:text-left z-10">
          <h3 class="text-[#1F2937] text-[16px] font-extrabold mb-6 tracking-tight flex items-center gap-2 justify-center md:justify-start">
            Summary Activity Hours
            <span class="w-1.5 h-1.5 rounded-full bg-[#EF7722] shadow-[0_0_5px_rgba(239,119,34,0.8)] animate-pulse"></span>
          </h3>
          <div class="flex flex-wrap justify-center md:justify-start gap-y-6 gap-x-8 md:gap-x-12">
            <div class="flex flex-col gap-1 group/stat min-w-[100px]">
              <span class="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest group-hover/stat:text-[#EF7722] transition-colors">Today</span>
              <div class="flex items-baseline gap-1.5 mt-1">
                <span class="text-[20px] font-black text-[#1F2937]">05</span>
                <span class="text-[12px] font-medium text-[#6B7280]">/ 12 hrs.</span>
              </div>
              <div class="w-full h-[5px] bg-[#EBEBEB]/60 rounded-full mt-1 overflow-hidden">
                <div class="h-full bg-gradient-to-r from-[#EF7722] to-[#FAA533] w-[41%] rounded-full relative overflow-hidden group-hover/stat:animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
            <div class="flex flex-col gap-1 group/stat min-w-[100px]">
              <span class="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest group-hover/stat:text-[#EF7722] transition-colors">This month</span>
              <div class="flex items-baseline gap-1.5 mt-1">
                <span class="text-[20px] font-black text-[#1F2937]">23</span>
                <span class="text-[12px] font-medium text-[#6B7280]">/ 48 hrs.</span>
              </div>
              <div class="w-full h-[5px] bg-[#EBEBEB]/60 rounded-full mt-1 overflow-hidden">
                <div class="h-full bg-gradient-to-r from-[#EF7722] to-[#FAA533] w-[47%] rounded-full relative overflow-hidden group-hover/stat:animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
            <div class="flex flex-col gap-1 group/stat min-w-[100px]">
              <span class="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest group-hover/stat:text-[#EF7722] transition-colors">This semester</span>
              <div class="flex items-baseline gap-1.5 mt-1">
                <span class="text-[20px] font-black text-[#1F2937]">23</span>
                <span class="text-[12px] font-medium text-[#6B7280]">/ 25 hrs.</span>
              </div>
              <div class="w-full h-[5px] bg-[#EBEBEB]/60 rounded-full mt-1 overflow-hidden">
                <div class="h-full bg-gradient-to-r from-[#EF7722] to-[#FAA533] w-[92%] rounded-full relative overflow-hidden group-hover/stat:animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. QR Code Card -->
      <div class="relative overflow-hidden bg-[#FFFFFF] rounded-[22px] shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start group transition-all duration-500 hover:shadow-[0_15px_50px_rgba(239,119,34,0.08)] border border-[#EBEBEB] z-10">
        
        <!-- QR Code Block matching the image -->
        <div @click="isQrModalOpen = true" class="w-24 h-24 bg-[#FFF8F1] rounded-[28px] shrink-0 flex items-center justify-center font-bold text-[13px] text-[#1F2937]/40 shadow-[inset_0_2px_10px_rgba(0,0,0,0.03)] border border-[#EBEBEB]/60 relative group-hover:border-[#FAA533]/40 transition-all duration-500 z-10 overflow-hidden cursor-pointer hover:scale-105 group/qr">
          
          <!-- Authentic QR Code Image Placeholder -->
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=StudentProfile" alt="Scan me" class="w-[65%] h-[65%] object-contain opacity-85 group-hover/qr:opacity-100 mix-blend-multiply transition-opacity duration-300" />
          
          <div class="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#EF7722] to-transparent opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(239,119,34,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
          
          <!-- Hover Icon Overlay -->
          <div class="absolute inset-0 bg-[#FFF8F1]/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <svg class="w-7 h-7 text-[#EF7722] drop-shadow-sm transform scale-50 group-hover/qr:scale-100 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
          </div>
        </div>
        
        <div class="flex flex-col mt-3 gap-1.5 text-center md:text-left flex-grow z-10">
          <h3 class="text-[#1F2937] text-[16px] font-extrabold tracking-tight">QR For your Profile</h3>
          <p class="text-[13px] text-[#6B7280] font-medium leading-relaxed max-w-[280px]">Scan the QR code to check in for the activity.</p>
        </div>

        <div class="md:absolute md:bottom-8 md:right-8 mt-4 md:mt-0 z-10">
          <button @click="isQrModalOpen = true" class="relative overflow-hidden bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-[#FFFFFF] font-bold text-[13px] py-2 px-6 rounded-full shadow-[0_8px_15px_rgba(239,119,34,0.3)] hover:shadow-[0_12px_20px_rgba(239,119,34,0.4)] transition-all duration-300 transform group-hover:scale-105 active:scale-95 group/btn border border-[#EF7722]/40 cursor-pointer">
            <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#FFFFFF]/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></span>
            <span class="relative tracking-wider flex items-center gap-2">
              Generated
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFFFFF] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-[#FFFFFF]"></span>
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Edit Profile Modal -->
    <div v-if="isEditProfileOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-[#1F2937]/60 backdrop-blur-md transition-opacity" @click="isEditProfileOpen = false"></div>
      
      <div class="relative w-full max-w-md bg-[#FFFFFF] rounded-[36px] shadow-[0_20px_70px_rgba(0,0,0,0.15)] border border-[#EBEBEB] p-8 flex flex-col gap-6 animate-[scaleIn_0.3s_cubic-bezier(0.16,1,0.3,1)]">
        
        <div class="flex items-center justify-between">
          <h2 class="text-[22px] font-extrabold text-[#1F2937] tracking-tight">Edit Profile</h2>
          <button @click="isEditProfileOpen = false" class="text-[#6B7280] hover:text-[#EF7722] hover:bg-[#FFF8F1] p-2 rounded-full transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div class="flex flex-col gap-5">
          <!-- Quick Image Edit Field -->
          <div class="flex items-center gap-4 bg-[#FFF8F1]/50 p-4 rounded-3xl border border-[#EBEBEB] group/editimg">
             <div @click="triggerFileInput" class="relative w-16 h-16 rounded-full bg-[#FFFFFF] shadow-sm border-[3px] border-[#FFF8F1] overflow-hidden shrink-0 cursor-pointer ring-2 ring-[#EBEBEB] group-hover/editimg:ring-[#FAA533] transition-colors">
               <img v-if="editFormData" :src="editFormData.avatar" class="w-full h-full object-cover">
               <!-- Hover Camera Icon -->
               <div class="absolute inset-0 bg-[#1F2937]/50 opacity-0 group-hover/editimg:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <svg class="w-6 h-6 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
               </div>
               <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileUpload" />
             </div>
             <div class="flex flex-col">
               <span class="text-[14px] font-bold text-[#1F2937]">Profile Picture</span>
               <span class="text-[12px] text-[#6B7280]">Click the image to change.</span>
             </div>
          </div>

          <div class="flex flex-col gap-1.5 relative group/input">
            <label class="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest pl-1">Full Name</label>
            <input v-if="editFormData" v-model="editFormData.name" type="text" class="w-full bg-[#FFF8F1] border border-[#EBEBEB] rounded-2xl px-5 py-3.5 text-sm font-medium text-[#1F2937] focus:outline-none focus:ring-[3px] focus:ring-[#FAA533]/30 focus:border-[#EF7722] focus:bg-[#FFFFFF] transition-all shadow-sm" />
          </div>
          <div class="flex flex-col gap-1.5 relative group/input">
            <label class="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest pl-1">University</label>
            <input v-if="editFormData" v-model="editFormData.university" type="text" class="w-full bg-[#FFF8F1] border border-[#EBEBEB] rounded-2xl px-5 py-3.5 text-sm font-medium text-[#1F2937] focus:outline-none focus:ring-[3px] focus:ring-[#FAA533]/30 focus:border-[#EF7722] focus:bg-[#FFFFFF] transition-all shadow-sm" />
          </div>
          <div class="flex flex-col gap-1.5 relative group/input">
            <label class="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest pl-1">Date of Birth</label>
            <input v-if="editFormData" v-model="editFormData.dob" type="date" class="w-full bg-[#FFF8F1] border border-[#EBEBEB] rounded-2xl px-5 py-3.5 text-sm font-medium text-[#1F2937] focus:outline-none focus:ring-[3px] focus:ring-[#FAA533]/30 focus:border-[#EF7722] focus:bg-[#FFFFFF] transition-all shadow-sm cursor-pointer hover:border-[#FAA533]/50" />
          </div>
        </div>
        <div class="flex justify-end gap-3 mt-4 pt-2 border-t border-[#EBEBEB]">
          <button @click="isEditProfileOpen = false" class="px-6 py-2.5 rounded-full text-sm font-bold text-[#6B7280] hover:text-[#1F2937] hover:bg-[#FFF8F1] transition-colors active:scale-95">Cancel</button>
          <button @click="saveProfile" class="bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-[#FFFFFF] px-8 py-2.5 rounded-full text-sm font-bold shadow-[0_8px_15px_rgba(239,119,34,0.3)] hover:shadow-lg hover:shadow-[#EF7722]/40 transition-all active:scale-95 border border-[#EF7722]/40 tracking-wide">Save</button>
        </div>
      </div>
    </div>
    
    <!-- Enlarge QR Modal -->
    <div v-if="isQrModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-[#1F2937]/80 backdrop-blur-md transition-opacity" @click="isQrModalOpen = false"></div>
      <div class="relative w-full max-w-sm bg-[#FFFFFF] rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.3)] border border-[#EBEBEB] p-8 flex flex-col items-center gap-6 animate-[scaleIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FAA533]/20 rounded-full mix-blend-multiply filter blur-[60px] animate-pulse pointer-events-none z-0"></div>
        <div class="relative z-10 w-full flex justify-between items-center mb-2">
          <h2 class="text-xl font-bold text-[#1F2937] tracking-wide">Your Profile QR</h2>
          <button @click="isQrModalOpen = false" class="text-[#6B7280] hover:text-[#EF7722] hover:bg-[#FFF8F1] p-2 rounded-full transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="relative w-64 h-64 bg-[#FFF8F1] rounded-[32px] p-4 shadow-inner border border-[#EBEBEB] z-10 group overflow-hidden flex items-center justify-center">
            <div class="w-full h-full border-4 border-dashed border-[#EBEBEB] rounded-[24px] flex flex-col items-center justify-center overflow-hidden relative bg-[#FFFFFF]/50 backdrop-blur-sm">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=StudentProfile" alt="Large Profile QR Code" class="w-[85%] h-[85%] object-contain mix-blend-multiply opacity-90" />
              <div class="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-[#EF7722] to-transparent opacity-80 shadow-[0_0_15px_rgba(239,119,34,1)] animate-[scan_2.5s_ease-in-out_infinite]"></div>
            </div>
            <div class="absolute top-3 left-3 w-6 h-6 border-t-4 border-l-4 border-[#EF7722] rounded-tl-[18px]"></div>
            <div class="absolute top-3 right-3 w-6 h-6 border-t-4 border-r-4 border-[#EF7722] rounded-tr-[18px]"></div>
            <div class="absolute bottom-3 left-3 w-6 h-6 border-b-4 border-l-4 border-[#EF7722] rounded-bl-[18px]"></div>
            <div class="absolute bottom-3 right-3 w-6 h-6 border-b-4 border-r-4 border-[#EF7722] rounded-br-[18px]"></div>
        </div>
        <p class="text-[#6B7280] text-sm text-center font-medium z-10 mt-2 px-4 leading-relaxed">
          Show this QR code at the event entrance to check in.
        </p>
        <button @click="isQrModalOpen = false" class="relative z-10 bg-[#FFF8F1] hover:bg-[#FFFFFF] border border-[#EBEBEB] text-[#1F2937] hover:text-[#EF7722] font-bold text-sm py-3 px-10 rounded-full transition-all active:scale-95 shadow-sm w-full mt-2 tracking-wider">
          Close Window
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProfileStore } from '../stores/profileStore';

const profileStore = useProfileStore();

const isEditProfileOpen = ref(false);
const isQrModalOpen = ref(false);
const fileInput = ref(null);

// Form clone for editing safely without two-way binding the store instantly
const editFormData = ref(null);

onMounted(() => {
  profileStore.fetchProfile();
});

// Helper getter to avoid null errors while loading
const safeProfile = computed(() => {
  return profileStore.profile || {
    avatar: '',
    name: 'Loading...',
    university: 'Loading...',
    dob: ''
  };
});

const formattedDob = computed(() => {
  if (!safeProfile.value.dob) return 'Date not set';
  const date = new Date(safeProfile.value.dob);
  if (isNaN(date.getTime())) return safeProfile.value.dob;
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
});

const openEditModal = () => {
  // Deep clone current store profile to edit locally
  editFormData.value = JSON.parse(JSON.stringify(safeProfile.value));
  isEditProfileOpen.value = true;
};

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Update local form avatar preview
      if (editFormData.value) {
        editFormData.value.avatar = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }
};

const saveProfile = async () => {
  if (editFormData.value) {
    await profileStore.updateProfile(editFormData.value);
  }
  isEditProfileOpen.value = false;
};
</script>

<style scoped>
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
@keyframes scan {
  0% { top: -10%; }
  50% { top: 110%; }
  100% { top: -10%; }
}
@keyframes scaleIn {
  0% { transform: scale(0.95) translateY(10px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}
</style>
