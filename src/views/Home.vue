<template>
  <div class="flex w-full h-full p-2 gap-2">
    
    <!-- Left Column: Search & Project Cards -->
    <div class="flex-1 flex flex-col p-4 overflow-y-auto border-r border-[#EBEBEB]/50 pr-5">
      
      <!-- Search Bar & Suggest Button -->
      <div class="flex items-center gap-3 w-full max-w-2xl mx-auto">
        <!-- Search Input -->
        <div class="flex items-center bg-[#F9FAFB] rounded-full px-5 py-2.5 shadow-sm border border-[#F3F4F6] transition-all focus-within:bg-white focus-within:border-gray-200 focus-within:shadow-md flex-1">
          <input
            type="text"
            placeholder="Search..."
            class="flex-1 bg-transparent outline-none text-[13px] font-medium text-gray-700 placeholder-gray-400"
          />
          <svg class="w-4 h-4 text-gray-400 ml-2 cursor-pointer hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        
        <!-- Suggest Button -->
        <button 
          @click="isCategoryOpen = true"
          class="bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-white px-6 py-2.5 rounded-full shadow-sm font-bold flex items-center justify-center gap-2 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all text-[13px] shrink-0 border border-[#EF7722]/50">
          ✨ Suggest
        </button>
      </div>

      <!-- Project Cards List -->
      <div class="flex flex-col gap-4 mt-5 w-full max-w-3xl mx-auto">
        
        <div 
          v-for="i in 3" 
          :key="i"
          class="w-full bg-[#FFFFFF] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#EBEBEB] p-2 pr-4 flex relative group hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300"
        >
          <!-- Heart Outline Button -->
          <button class="absolute top-3 right-3 w-7 h-7 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#FAA533] hover:bg-[#FAA533] hover:text-white transition-colors z-10 active:scale-95">
            <svg class="w-3.5 h-3.5" :fill="i===1 ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </button>

          <!-- Left Image Box -->
          <div class="w-44 h-28 rounded-[16px] bg-gradient-to-br from-[#FFD1A9] to-[#FFECD2] shrink-0 relative overflow-hidden flex items-center justify-center">
             <!-- Wavy shape placeholders mimicking the image illustration -->
             <div class="absolute bottom-0 left-0 w-full h-1/2 bg-[#FFB57A] rounded-t-[100%] opacity-40"></div>
             <!-- Icon/Illustration placeholder -->
             <div class="w-12 h-9 bg-[#EF7722] rounded-md shadow-sm flex items-center justify-center relative scale-90">
                <div class="absolute -top-1.5 w-3 h-3 rounded-full bg-[#1F2937]"></div>
                <div class="absolute -left-2 w-2 h-6 bg-white/40 rounded-sm"></div>
                <div class="absolute -right-2 w-2 h-6 bg-white/40 rounded-sm"></div>
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
             </div>
          </div>

          <!-- Right Content -->
          <div class="flex flex-col py-1.5 px-4 flex-grow">
            <!-- Title -->
            <h2 class="text-[17px] font-bold text-[#1F2937] tracking-tight mb-1">Project Title</h2>
            
            <!-- Description -->
            <p class="text-[11px] text-gray-500 font-medium leading-relaxed max-w-[220px] mb-2 line-clamp-2">
              This is a brief description of the project. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lo...
            </p>
            
            <!-- Bottom Tags & Action -->
            <div class="flex items-center justify-between mt-auto">
              <span class="bg-[#3B82F6] text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider shadow-sm">
                graphic
              </span>
              
              <button class="bg-[#EF7722] hover:bg-[#FAA533] text-white text-[11px] font-bold px-5 py-1 rounded-full shadow-sm transition-colors cursor-pointer">
                View
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Right Column: Dashboard Sidebar (Calendar + Events) -->
    <div class="w-[300px] bg-[#FFF8F1] rounded-[24px] p-5 flex flex-col gap-6 shrink-0 border border-[#EBEBEB]/60 overflow-y-auto">
      
      <!-- Calendar Widget -->
      <div class="flex flex-col gap-3">
        <h3 class="text-[15px] font-bold text-[#1F2937]">March 2026</h3>
        
        <!-- Days Header -->
        <div class="grid grid-cols-7 text-center gap-y-2">
          <span v-for="day in ['Su','Mo','Tu','We','Th','Fr','Sa']" :key="day" class="text-[10px] font-bold text-gray-500 uppercase">{{day}}</span>
          
          <!-- Calendar Days (Static matching the reference) -->
          <span class="text-[11px] font-bold text-gray-400 py-1">22</span>
          <span class="text-[11px] font-bold text-gray-400 py-1">23</span>
          <span class="text-[11px] font-bold text-gray-400 py-1">24</span>
          <span class="text-[11px] font-bold text-gray-400 py-1">25</span>
          <span class="text-[11px] font-bold text-gray-400 py-1">26</span>
          <span class="text-[11px] font-bold text-gray-400 py-1">27</span>
          <span class="text-[11px] font-bold text-gray-400 py-1">28</span>
          
          <span v-for="n in 17" :key="'cal'+n" class="text-[11px] font-bold text-gray-700 py-1 hover:bg-white rounded-full cursor-pointer">{{n}}</span>
          
          <!-- Active day (18th) -->
          <div class="flex items-center justify-center">
            <span class="w-6 h-6 flex items-center justify-center rounded-full bg-[#EF7722] text-white text-[11px] font-bold shadow-sm shadow-[#EF7722]/30">18</span>
          </div>
          
          <span v-for="n in [19,20,21,22,23,24,25,26,27,28,29,30,31]" :key="'cal_end'+n" class="text-[11px] font-bold text-gray-700 py-1 hover:bg-white rounded-full cursor-pointer">{{n}}</span>
          
          <span v-for="n in 4" :key="'cal_next'+n" class="text-[11px] font-bold text-gray-400 py-1">{{n}}</span>
        </div>
      </div>

      <!-- Upcoming Events List -->
      <div class="flex flex-col gap-3">
        <h3 class="text-[15px] font-bold text-[#1F2937] tracking-tight">My Upcoming Events</h3>
        
        <div class="flex flex-col gap-2.5">
          <div v-for="j in 3" :key="'evt'+j" class="bg-white rounded-[14px] p-2 pl-3 flex items-center gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer">
            
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD1A9] to-[#FFECD2] shrink-0 flex items-center justify-center relative overflow-hidden">
              <div class="w-3.5 h-2.5 bg-[#EF7722] rounded-sm flex items-center justify-center">
                <div class="w-1 h-2 bg-white/50 rounded-full"></div>
              </div>
            </div>
            
            <div class="flex flex-col justify-center">
              <h4 class="text-[12px] font-bold text-[#1F2937]">Project Title...</h4>
              <span class="text-[10px] font-medium text-gray-400 mt-0.5">20 Mar, 2026 09:10</span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Kept here if functionality requires it, though not visible naturally in exact view -->
    <Teleport to="body">
       <CategoryPopup :isOpen="isCategoryOpen" @close="isCategoryOpen = false" />
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CategoryPopup from '../components/category.vue';

const isCategoryOpen = ref(false);
</script>