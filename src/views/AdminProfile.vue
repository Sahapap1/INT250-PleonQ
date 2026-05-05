<template>
  <div class="relative w-full max-w-[850px] mx-auto z-10 transition-all">
    <div class="relative bg-[#FFF8F1]/90 backdrop-blur-xl rounded-[36px] shadow-[0_10px_50px_rgba(0,0,0,0.05)] border border-[#EBEBEB] p-5 md:p-8 flex flex-col gap-6 md:gap-8 z-10 group/wrapper">
      
      <!-- 1. Profile Info Card (คงเดิม) -->
      <div class="relative overflow-hidden bg-[#FFFFFF] rounded-[22px] shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-6 md:p-7 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start group transition-all duration-500 hover:shadow-[0_15px_50px_rgba(239,119,34,0.08)] border border-[#EBEBEB] z-10">
        <div class="relative shrink-0 mt-3 md:mt-2">
          <div class="absolute -inset-2.5 bg-gradient-to-tr from-[#EF7722] to-[#FAA533] rounded-full opacity-40 blur-[15px] group-hover:opacity-60 transition duration-700"></div>
          <div class="relative w-28 h-28 md:w-24 md:h-24 bg-[#FFFFFF] rounded-full shadow-[inset_0_-4px_10px_rgba(239,119,34,0.1)] border-[4px] border-[#FFF8F1] z-10 overflow-hidden flex items-center justify-center transform group-hover:scale-105 transition-all duration-500 ring-4 ring-[#FFFFFF]">
             <img :src="safeProfile.avatar" alt="Profile avatar" class="w-full h-full object-cover" />
             <div class="absolute inset-0 border border-[#EBEBEB]/20 rounded-full"></div>
          </div>
        </div>
        
        <div class="flex flex-col mt-2 gap-1.5 text-center md:text-left flex-grow z-10">
          <div class="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 mt-1">
            <h3 class="text-[20px] font-extrabold text-[#1F2937] tracking-tight">{{ safeProfile.name }}</h3>
            <span class="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1 border border-orange-400">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              Admin
            </span>
          </div>
          <p class="text-[14px] font-medium text-[#6B7280] tracking-wide mt-0.5">{{ safeProfile.university }}</p>
          <p class="text-[13px] text-[#6B7280]/80 mt-1">{{ formattedDob }}</p>
        </div>

        <div class="md:absolute md:bottom-7 md:right-7 flex gap-2.5 mt-4 md:mt-0 z-10">
          <button @click="openEditModal" class="bg-[#FFF8F1] hover:bg-[#FFFFFF] text-[#1F2937] hover:text-[#EF7722] font-bold text-[13px] py-1.5 px-6 rounded-full transition-all duration-300 active:scale-95 shadow-sm border border-[#EBEBEB] hover:border-[#FAA533] flex items-center gap-1.5 cursor-pointer">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            Edit
          </button>
        </div>
      </div>

      <!-- 2. Summary Activity Hours Card (คงเดิม) -->
      <div class="relative overflow-hidden bg-[#FFFFFF] rounded-[22px] shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start group transition-all duration-500 hover:shadow-[0_15px_50px_rgba(239,119,34,0.08)] border border-[#EBEBEB] z-10">
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-[#FFF8F1] rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div class="w-24 h-24 bg-[#FFF8F1] rounded-[28px] shrink-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.03)] border border-[#EBEBEB]/60 relative overflow-hidden group-hover:shadow-[0_4px_15px_rgba(239,119,34,0.1)] group-hover:border-[#FAA533]/30 transition-all duration-500 flex items-center justify-center">
           <div class="relative w-[3.5rem] h-[3.5rem] flex items-center justify-center">
             <svg class="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 64 64">
               <defs>
                 <linearGradient id="orangeProgress" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stop-color="#EF7722" />
                   <stop offset="100%" stop-color="#FAA533" />
                 </linearGradient>
               </defs>
               <circle cx="32" cy="32" r="26" fill="none" stroke="#EBEBEB" stroke-width="6" />
               <circle cx="32" cy="32" r="26" fill="none" stroke="url(#orangeProgress)" stroke-width="6" stroke-linecap="round"
                 stroke-dasharray="163.36" stroke-dashoffset="57.17" class="group-hover:stroke-dashoffset-[30] transition-all duration-1000 ease-out" />
             </svg>
             <span class="text-[14px] font-black text-[#1F2937] group-hover:text-[#EF7722] transition-colors duration-500 tracking-tighter">65%</span>
           </div>
        </div>

        <div class="flex flex-col w-full mt-1.5 text-center md:text-left z-10">
          <h3 class="text-[#1F2937] text-[16px] font-extrabold mb-6 tracking-tight flex items-center gap-2 justify-center md:justify-start">
            Summary Activity Hours
            <span class="w-1.5 h-1.5 rounded-full bg-[#EF7722] shadow-[0_0_5px_rgba(239,119,34,0.8)] animate-pulse"></span>
          </h3>
          <div class="flex flex-wrap justify-center md:justify-start gap-y-6 gap-x-8 md:gap-x-12">
            <!-- (Stat items คงเดิม...) -->
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

      <!-- 3. Camera Scanner Card (อัปเดตใหม่) -->
      <div class="relative overflow-hidden bg-[#FFFFFF] rounded-[22px] shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start group transition-all duration-500 hover:shadow-[0_15px_50px_rgba(239,119,34,0.08)] border border-[#EBEBEB] z-10">
        
        <!-- Scanner Icon Block -->
        <div @click="openScanner" class="w-24 h-24 bg-[#FFF8F1] rounded-[28px] shrink-0 flex items-center justify-center text-[#1F2937]/40 shadow-[inset_0_2px_10px_rgba(0,0,0,0.03)] border border-[#EBEBEB]/60 relative group-hover:border-[#FAA533]/40 transition-all duration-500 z-10 overflow-hidden cursor-pointer hover:scale-105 group/qr">
          
          <!-- Scan Icon -->
          <svg class="w-10 h-10 text-[#EF7722] opacity-80 group-hover/qr:opacity-100 group-hover/qr:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2M16 4h2a2 2 0 012 2v2M16 20h2a2 2 0 002-2v-2" />
            <circle cx="12" cy="12" r="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
          </svg>
          
          <!-- Animated Scan Line -->
          <div class="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#EF7722] to-transparent opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(239,119,34,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
        </div>
        
        <div class="flex flex-col mt-3 gap-1.5 text-center md:text-left flex-grow z-10">
          <h3 class="text-[#1F2937] text-[16px] font-extrabold tracking-tight">Scan Activity QR</h3>
          <p class="text-[13px] text-[#6B7280] font-medium leading-relaxed max-w-[280px]">Tap to open the scanner and check in for the activity.</p>
        </div>

        <div class="md:absolute md:bottom-8 md:right-8 mt-4 md:mt-0 z-10">
          <button @click="openScanner" class="relative overflow-hidden bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-[#FFFFFF] font-bold text-[13px] py-2 px-6 rounded-full shadow-[0_8px_15px_rgba(239,119,34,0.3)] hover:shadow-[0_12px_20px_rgba(239,119,34,0.4)] transition-all duration-300 transform group-hover:scale-105 active:scale-95 group/btn border border-[#EF7722]/40 cursor-pointer">
            <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#FFFFFF]/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></span>
            <span class="relative tracking-wider flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
              Open Scanner
            </span>
          </button>
        </div>
      </div>
    </div>
    

    <div v-if="isScannerModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-[#1F2937]/80 backdrop-blur-md transition-opacity" @click="closeScanner"></div>
      
      <div class="relative w-full max-w-sm bg-[#FFFFFF] rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.3)] border border-[#EBEBEB] p-6 flex flex-col items-center gap-5 animate-[scaleIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FAA533]/20 rounded-full mix-blend-multiply filter blur-[60px] animate-pulse pointer-events-none z-0"></div>
        
        <div class="relative z-10 w-full flex justify-between items-center px-2">
          <h2 class="text-xl font-bold text-[#1F2937] tracking-wide">Scan QR Code</h2>
          <button @click="closeScanner" class="text-[#6B7280] hover:text-[#EF7722] hover:bg-[#FFF8F1] p-2 rounded-full transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Camera Viewport -->
        <div class="relative w-full aspect-square bg-[#000000] rounded-[28px] overflow-hidden z-10 shadow-inner border-[4px] border-[#FFF8F1] ring-1 ring-[#EBEBEB]">
          
          <div v-if="loadingScanner" class="absolute inset-0 flex items-center justify-center text-white text-sm z-20">
            <svg class="animate-spin h-5 w-5 mr-2 text-[#EF7722]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Loading Camera...
          </div>

          <qrcode-stream 
            @detect="onDetect" 
            @camera-on="onCameraReady" 
            :track="paintOutline"
            class="w-full h-full object-cover">
          </qrcode-stream>

          <!-- Scanning overlay UI -->
          <div class="absolute inset-0 border-[40px] border-[#1F2937]/40 pointer-events-none"></div>
          <div class="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#EF7722] to-transparent shadow-[0_0_15px_rgba(239,119,34,1)] animate-[scan_2.5s_ease-in-out_infinite] pointer-events-none"></div>
          
          <!-- Viewfinder corners -->
          <div class="absolute top-10 left-10 w-8 h-8 border-t-[3px] border-l-[3px] border-[#EF7722] rounded-tl-[12px] pointer-events-none"></div>
          <div class="absolute top-10 right-10 w-8 h-8 border-t-[3px] border-r-[3px] border-[#EF7722] rounded-tr-[12px] pointer-events-none"></div>
          <div class="absolute bottom-10 left-10 w-8 h-8 border-b-[3px] border-l-[3px] border-[#EF7722] rounded-bl-[12px] pointer-events-none"></div>
          <div class="absolute bottom-10 right-10 w-8 h-8 border-b-[3px] border-r-[3px] border-[#EF7722] rounded-br-[12px] pointer-events-none"></div>
        </div>

        <p class="text-[#6B7280] text-sm text-center font-medium z-10 px-2 leading-relaxed">
          Align the QR code within the frame to scan automatically.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProfileStore } from '../stores/profileStore';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
// Import QrcodeStream component
import { QrcodeStream } from 'vue-qrcode-reader';

const profileStore = useProfileStore();
const authStore = useAuthStore();
const router = useRouter();

const isEditProfileOpen = ref(false);
const isScannerModalOpen = ref(false);
const loadingScanner = ref(true);
const fileInput = ref(null);
const editFormData = ref(null);

onMounted(() => {
  profileStore.fetchProfile();
});

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
  editFormData.value = JSON.parse(JSON.stringify(safeProfile.value));
  isEditProfileOpen.value = true;
};

const triggerFileInput = () => {
  if (fileInput.value) fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (editFormData.value) editFormData.value.avatar = e.target.result;
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

// --- Scanner Logic ---
const openScanner = () => {
  loadingScanner.value = true;
  isScannerModalOpen.value = true;
};

const closeScanner = () => {
  isScannerModalOpen.value = false;
};

const onCameraReady = () => {
  loadingScanner.value = false;
};

// ฟังก์ชันทำงานเมื่อสแกนเจอ QR Code
const onDetect = (detectedCodes) => {
  if (detectedCodes.length > 0) {
    const result = detectedCodes[0].rawValue;
    console.log('Scanned Result:', result);
    
    // ตรงนี้สามารถนำ result ไปยิง API เช็คชื่อหรือทำงานต่อได้เลยครับ
    alert('สแกนสำเร็จ ข้อมูลคือ: ' + result);
    
    // สแกนเสร็จให้ปิดหน้าต่างกล้อง
    closeScanner();
  }
};

// ฟังก์ชันวาดกรอบสีส้มรอบๆ QR Code เวลากล้องจับได้
const paintOutline = (detectedCodes, ctx) => {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;
    ctx.strokeStyle = "#EF7722";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y);
    }
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.closePath();
    ctx.stroke();
  }
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