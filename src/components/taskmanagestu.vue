<template>
  <div class="relative w-full mx-auto z-10 transition-all px-2 sm:px-4 md:px-0 overflow-hidden">
    
    <!-- Modal Teleport -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" @click="closeModal"></div>
          
          <!-- Modal Content -->
          <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 md:p-8 flex flex-col gap-6 transform transition-all border border-[#EBEBEB]">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-extrabold text-[#1F2937] tracking-tight">
                {{ modalMode === 'create' ? 'Create New Task' : 'Edit Task' }}
              </h3>
              <button @click="closeModal" class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <form @submit.prevent="submitForm" class="flex flex-col gap-5">
              <!-- Title -->
              <div class="flex flex-col gap-2">
                <label class="text-[13px] font-bold text-[#6B7280]">Task Title</label>
                <input 
                  v-model="formData.title" 
                  type="text" 
                  placeholder="e.g. UX/UI Design for Dashboard"
                  class="w-full px-4 py-3 rounded-xl border bg-gray-50 text-[14px] text-gray-800 focus:bg-white focus:outline-none focus:ring-2 transition-all"
                  :class="formErrors.title ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : 'border-gray-200 focus:ring-[#FAA533]/30 focus:border-[#FAA533]'"
                />
                <span v-if="formErrors.title" class="text-red-500 text-[11px] font-semibold">{{ formErrors.title }}</span>
              </div>

              <!-- Date -->
              <div class="flex flex-col gap-2">
                <label class="text-[13px] font-bold text-[#6B7280]">Due Date</label>
                <input 
                  v-model="formData.date" 
                  type="date"
                  class="w-full px-4 py-3 rounded-xl border bg-gray-50 text-[14px] text-gray-800 focus:bg-white focus:outline-none focus:ring-2 transition-all"
                  :class="formErrors.date ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : 'border-gray-200 focus:ring-[#FAA533]/30 focus:border-[#FAA533]'"
                />
                <span v-if="formErrors.date" class="text-red-500 text-[11px] font-semibold">{{ formErrors.date }}</span>
              </div>

              <!-- Status -->
              <div class="flex flex-col gap-2">
                <label class="text-[13px] font-bold text-[#6B7280]">Status</label>
                <div class="grid grid-cols-3 gap-3 gap-y-3">
                  <label v-for="status in ['Pending', 'In Progress', 'Completed']" :key="status" 
                         class="cursor-pointer flex flex-col items-center justify-center py-3 px-2 rounded-xl border transition-all text-[12px] font-bold text-center"
                         :class="formData.status === status ? 'border-[#EF7722] bg-[#FFF8F1] text-[#EF7722] ring-1 ring-[#EF7722]' : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'">
                    <input type="radio" v-model="formData.status" :value="status" class="hidden" />
                    {{ status }}
                  </label>
                </div>
                <span v-if="formErrors.status" class="text-red-500 text-[11px] font-semibold">{{ formErrors.status }}</span>
              </div>

              <div class="flex justify-end gap-3 mt-4">
                <button type="button" @click="closeModal" class="px-6 py-3 rounded-xl font-bold text-[14px] text-gray-500 hover:bg-gray-100 transition-colors">
                  Cancel
                </button>
                <button type="submit" class="px-6 py-3 rounded-xl font-bold text-[14px] text-white bg-gradient-to-r from-[#EF7722] to-[#FAA533] hover:shadow-lg hover:shadow-[#EF7722]/30 transform active:scale-95 transition-all">
                  {{ modalMode === 'create' ? 'Create Task' : 'Save Changes' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Orbs behind UI -->
    <div class="absolute -top-[5%] -left-[10%] w-80 h-80 bg-[#EF7722] rounded-full mix-blend-multiply filter blur-[100px] opacity-15 animate-pulse pointer-events-none z-0"></div>
    <div class="absolute -bottom-[5%] -right-[10%] w-80 h-80 bg-[#FAA533] rounded-full mix-blend-multiply filter blur-[100px] opacity-15 animate-[pulse_4s_ease-in-out_infinite] pointer-events-none z-0"></div>

    <div class="relative bg-[#FFF8F1]/90 backdrop-blur-xl rounded-[24px] md:rounded-[36px] shadow-[0_10px_50px_rgba(0,0,0,0.05)] border border-[#EBEBEB] p-2 sm:p-4 md:p-8 flex flex-col gap-4 md:gap-8 z-10 group/wrapper min-w-0">
      
      <!-- 1. Task Management List Card -->
      <div class="relative overflow-hidden bg-[#FFFFFF] rounded-[22px] shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-3 sm:p-5 md:p-8 flex flex-col gap-4 sm:gap-6 group transition-all duration-500 hover:shadow-[0_15px_50px_rgba(239,119,34,0.08)] hover:bg-white/95 border border-[#EBEBEB] z-10 min-h-[400px] min-w-0">
        
        <div class="flex justify-between items-center z-10 flex-wrap gap-4">
          <h2 class="text-[17px] sm:text-[19px] font-extrabold text-[#1F2937] tracking-tight flex items-center gap-2 sm:gap-3">
            Task Management
            <span class="px-2 py-1 sm:px-2.5 rounded-md bg-[#FFF8F1] text-[#EF7722] text-[9px] sm:text-[10px] uppercase font-bold tracking-widest border border-[#FAA533]/50 shadow-sm">Student</span>
          </h2>
        </div>

        <div class="flex gap-3 sm:gap-6 md:gap-8 border-b border-[#EBEBEB] mt-1 relative z-10 overflow-x-auto whitespace-nowrap no-scrollbar pt-1">
           <button 
             v-for="tab in tabs" 
             :key="tab"
             @click="setTab(tab)"
             class="text-[13px] pb-3 relative transition-colors duration-300"
             :class="activeTab === tab ? 'font-bold text-[#1F2937]' : 'font-semibold text-[#6B7280] hover:text-[#EF7722] group/tab'"
           >
             {{ tab }}
             <span class="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                   :class="activeTab === tab ? 'bg-[#EF7722] text-white' : 'bg-gray-100 text-gray-500'">
               {{ getTaskCount(tab) }}
             </span>
             <div v-if="activeTab === tab" class="absolute bottom-[-1px] left-0 w-full h-[2px] bg-gradient-to-r from-[#EF7722] to-[#FAA533] rounded-t-full shadow-[0_-2px_8px_rgba(239,119,34,0.5)]"></div>
             <div v-else class="absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#EBEBEB] rounded-t-full transition-all duration-300 group-hover/tab:w-full group-hover/tab:bg-[#FAA533]"></div>
           </button>
        </div>

        <div class="flex flex-col gap-2 mt-2 z-10 w-full min-h-[260px] relative">
           
           <div class="hidden sm:grid sm:grid-cols-12 gap-4 px-3 pb-2 border-b border-dashed border-[#EBEBEB]">
             <div class="col-span-8 text-[11px] font-bold text-[#6B7280] uppercase tracking-widest flex items-center gap-2">Title</div>
             <div class="col-span-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-widest pl-2">Status</div>
           </div>

           <!-- Loading State -->
           <div v-if="taskStore.isLoading" class="absolute inset-x-0 top-10 bottom-0 bg-white/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center gap-4">
              <div class="relative w-12 h-12 flex items-center justify-center">
                <div class="absolute inset-0 border-4 border-[#FFF8F1] rounded-full"></div>
                <div class="absolute inset-0 border-4 border-[#EF7722] rounded-full border-t-transparent animate-spin"></div>
              </div>
              <span class="text-[13px] font-bold text-[#1F2937] animate-pulse">Loading Tasks...</span>
           </div>

           <!-- Error State -->
           <div v-else-if="taskStore.error" class="py-12 flex flex-col items-center justify-center gap-4 animate-[scaleIn_0.3s_ease-out]">
             <div class="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-500 shadow-inner">
               <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             </div>
             <div class="text-center">
               <h4 class="text-[15px] font-bold text-[#1F2937] mb-1">Failed to load tasks</h4>
               <p class="text-[13px] font-medium text-[#6B7280]">{{ taskStore.error }}</p>
             </div>
             <button @click="taskStore.fetchTasks" class="mt-2 px-5 py-2 rounded-xl bg-white border border-gray-200 shadow-sm text-[12px] font-bold text-gray-700 hover:text-[#EF7722] hover:border-[#EF7722] transition-colors flex items-center gap-2">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
               Try Again
             </button>
           </div>

           <!-- Empty State -->
           <div v-else-if="filteredTasks.length === 0" class="py-12 flex flex-col items-center justify-center gap-3 animate-[scaleIn_0.3s_ease-out]">
             <div class="w-14 h-14 rounded-full bg-[#FFF8F1] flex items-center justify-center text-[#EF7722]">
               <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
             </div>
             <div class="text-center">
               <span class="text-[14px] font-bold text-[#1F2937] block mb-1">No tasks found</span>
               <span class="text-[12px] font-medium text-[#6B7280] block max-w-[200px] leading-relaxed">There are no {{ activeTab === 'All Task' ? '' : activeTab.toLowerCase() }} tasks here. Find jobs to apply for on the Home page!</span>
             </div>
             <button v-if="activeTab === 'All Task'" @click="$router.push('/')" class="mt-2 text-[#EF7722] text-[12px] font-bold hover:underline">
               Explore Jobs
             </button>
           </div>

           <!-- Task List -->
           <transition-group v-else name="list" tag="div" class="flex flex-col gap-2 pt-2">
             <div 
                v-for="task in filteredTasks" 
                :key="task.id"
                class="flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4 sm:items-center bg-transparent hover:bg-gray-50/80 p-3 sm:p-2 rounded-2xl transition-all duration-300 border border-transparent hover:border-gray-100 hover:shadow-sm group/item relative overflow-hidden"
              >
                 <!-- Highlight line on hover -->
                 <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 rounded-r-full group-hover/item:h-2/3 transition-all duration-300"
                      :class="task.status === 'Completed' ? 'bg-green-500' : (task.status === 'Pending' ? 'bg-orange-400' : (task.status === 'End' ? 'bg-red-500' : 'bg-blue-500'))"></div>

                 <!-- Title Column -->
                 <div class="sm:col-span-8 flex items-center gap-3 sm:gap-4 pl-1 sm:pl-2">
                    <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-[12px] flex items-center justify-center shrink-0 shadow-inner border border-[#EBEBEB] group-hover/item:scale-105 transition-all duration-300"
                         :class="[
                           task.status === 'Completed' ? 'bg-green-500 text-white group-hover/item:border-green-300' : 
                           (task.status === 'Pending' ? 'bg-orange-400 text-white group-hover/item:border-orange-300' : 
                           (task.status === 'End' ? 'bg-red-500 text-white group-hover/item:border-red-300' : 'bg-blue-500 text-white group-hover/item:border-blue-300'))
                         ]">
                      <svg v-if="task.status === 'Completed'" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                      <svg v-else-if="task.status === 'Pending'" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <svg v-else-if="task.status === 'End'" class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      <svg v-else class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    
                    <div class="flex flex-col gap-0.5 justify-center overflow-hidden w-full">
                       <span class="text-[13px] sm:text-[14px] font-bold text-[#1F2937] tracking-tight transition-colors truncate w-full pr-2"
                             :class="task.status === 'Completed' ? 'group-hover/item:text-green-600' : 
                                    (task.status === 'Pending' ? 'group-hover/item:text-orange-500' : 
                                    (task.status === 'End' ? 'group-hover/item:text-red-600' : 'group-hover/item:text-blue-600'))">{{ task.title }}</span>
                       <span class="text-[11px] sm:text-[12px] font-medium text-[#6B7280] truncate">
                         {{ task.status === 'Completed' ? 'Completed: ' : 'Due: ' }}<span class="font-semibold text-gray-500">{{ formatDate(task.date) }}</span>
                       </span>
                    </div>
                 </div>
                 
                 <!-- Status and Actions Column -->
                 <div class="sm:col-span-4 flex items-center justify-between sm:pl-2 pl-[52px]">
                    <div class="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-widest shadow-sm flex items-center gap-1.5 shrink-0" 
                         :class="statusStyles[task.status] || 'bg-gray-50 text-gray-500 border border-gray-200'">
                      <span class="w-1.5 h-1.5 rounded-full animate-pulse blur-[0.5px]" 
                            :class="task.status === 'Completed' ? 'bg-green-500' : (task.status === 'Pending' ? 'bg-orange-500' : (task.status === 'End' ? 'bg-red-500' : 'bg-blue-500'))"></span>
                      {{ task.status }}
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-1.5 md:gap-2 opacity-100 md:opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0">
                       <button v-if="task.status === 'Pending'" @click="deleteTask(task.id)" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all active:scale-95" title="Cancel Application">
                         <svg class="w-4 h-4 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                       </button>
                       <!-- Mark as Complete for In Progress Tasks -->
                       <button v-if="task.status === 'In Progress'" @click="markAsCompleted(task.id)" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-white hover:border-green-400 hover:bg-green-500 transition-all active:scale-95" title="Mark as Completed">
                         <svg class="w-4 h-4 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                       </button>
                    </div>
                 </div>
              </div>
           </transition-group>
        </div>
      </div>

      <!-- 2. Job Status Overview Card -->
      <div v-if="taskStore.tasks.length > 0 && !taskStore.isLoading" class="relative overflow-hidden bg-[#FFFFFF] rounded-[22px] shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-3 sm:p-6 md:p-8 flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-center md:items-start group transition-all duration-500 hover:shadow-[0_15px_50px_rgba(239,119,34,0.12)] border border-[#EBEBEB] hover:border-[#FAA533]/50 z-10">
        
        <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-[#FFF8F1] rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

        <div class="w-32 h-32 md:w-36 md:h-36 bg-[#FFF8F1] rounded-[20px] shrink-0 shadow-inner border border-[#EBEBEB] relative overflow-hidden group-hover:border-[#FAA533] group-hover:shadow-[0_8px_30px_rgba(239,119,34,0.15)] transition-all duration-500">
           
           <div class="absolute inset-0 bg-[#1F2937]/0 group-hover:bg-[#1F2937]/30 transition-colors duration-500 z-10 flex items-center justify-center pointer-events-none">
             <div class="w-10 h-10 rounded-full bg-[#FFFFFF]/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center text-[#EF7722] shadow-lg pointer-events-auto cursor-pointer" @click="taskStore.fetchTasks">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
             </div>
           </div>
           
           <img src="https://images.unsplash.com/photo-1561070791-36c11767b26a?q=80&w=300&auto=format&fit=crop" alt="Task Preview" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" />
        </div>
        
        <div class="flex flex-col w-full mt-2 text-center md:text-left z-10">
          <h3 class="text-[17px] font-extrabold text-[#1F2937] mb-6 tracking-tight">Job Status Overview</h3>
          
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3.5 p-3 sm:p-4 bg-[#FFF8F1] rounded-2xl border border-[#EBEBEB] shadow-inner group-hover:bg-[#FFFFFF] transition-colors duration-300 w-full sm:w-auto mx-auto sm:mx-0">
            <span class="text-[14px] font-bold text-[#1F2937] truncate max-w-[160px] sm:max-w-[220px]" :title="recentActiveTask?.title">
              {{ recentActiveTask?.title || 'No active tasks' }} :
            </span>
            
            <div v-if="recentActiveTask" class="relative flex items-center justify-center shrink-0">
               <span class="absolute inset-0 blur-md opacity-20 group-hover:opacity-40 rounded-full transition-opacity duration-300"
                     :class="recentActiveTask.status === 'Completed' ? 'bg-green-500' : (recentActiveTask.status === 'Pending' ? 'bg-orange-500' : (recentActiveTask.status === 'End' ? 'bg-red-500' : 'bg-blue-500'))"></span>
               <span class="relative px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border text-[11px] sm:text-[13px] font-bold tracking-wide flex items-center gap-2"
                     :class="recentActiveTask.status === 'Completed' ? 'bg-green-50 border-green-200 text-green-600' :
                            (recentActiveTask.status === 'Pending' ? 'bg-orange-50 border-orange-200 text-orange-500' :
                            (recentActiveTask.status === 'End' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-blue-50 border-blue-200 text-blue-600'))">
                 <span class="w-1.5 h-1.5 rounded-full animate-pulse"
                       :class="recentActiveTask.status === 'Completed' ? 'bg-green-500' :
                              (recentActiveTask.status === 'Pending' ? 'bg-orange-500' :
                              (recentActiveTask.status === 'End' ? 'bg-red-500' : 'bg-blue-500'))"></span>
                 {{ recentActiveTask.status }}
               </span>
            </div>
            <div v-else class="text-[13px] font-medium text-gray-500 italic">All caught up!</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import { useAuthStore } from '../stores/authStore';

const taskStore = useTaskStore();
const authStore = useAuthStore();

// Tabs State
const activeTab = ref('All Task');
const tabs = ['All Task', 'Pending', 'In Progress', 'Completed'];

onMounted(() => {
  taskStore.fetchTasks(authStore.user?.id);
});

// Computed states interacting with Pinia Store
const filteredTasks = computed(() => {
  if (activeTab.value === 'All Task') return taskStore.allTasks;
  if (activeTab.value === 'Pending') return taskStore.pendingTasks;
  if (activeTab.value === 'In Progress') return taskStore.inProgressTasks;
  if (activeTab.value === 'Completed') return taskStore.completedTasks;
  return taskStore.allTasks;
});

const getTaskCount = (tabName) => {
  if (tabName === 'All Task') return taskStore.allTasks.length;
  if (tabName === 'Pending') return taskStore.pendingTasks.length;
  if (tabName === 'In Progress') return taskStore.inProgressTasks.length;
  if (tabName === 'Completed') return taskStore.completedTasks.length;
  return 0;
};

const recentActiveTask = computed(() => {
  if (taskStore.inProgressTasks.length > 0) return taskStore.inProgressTasks[0];
  if (taskStore.pendingTasks.length > 0) return taskStore.pendingTasks[0];
  return taskStore.allTasks[0]; // fallback
});

const setTab = (tab) => {
  activeTab.value = tab;
};

// CRUD - Format Date helper
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj)) return dateStr;
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return dateObj.toLocaleDateString('en-GB', options);
};

// CRUD - Modal Form State
const isModalOpen = ref(false);
const modalMode = ref('create'); // 'create' or 'edit'
const formData = ref({ id: null, title: '', date: '', status: 'Pending' });
const formErrors = ref({ title: '', date: '', status: '' });

const openModal = (mode, taskParam = null) => {
  modalMode.value = mode;
  formErrors.value = { title: '', date: '', status: '' };
  
  if (mode === 'edit' && taskParam) {
    formData.value = { ...taskParam };
  } else {
    // defaults for create
    const today = new Date().toISOString().split('T')[0];
    formData.value = { id: null, title: '', date: today, status: 'Pending' };
  }
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const validateForm = () => {
  let isValid = true;
  formErrors.value = { title: '', date: '', status: '' };

  if (!formData.value.title || formData.value.title.trim().length < 3) {
    formErrors.value.title = 'Title must be at least 3 characters long.';
    isValid = false;
  }
  
  if (!formData.value.date) {
    formErrors.value.date = 'Due Date is required.';
    isValid = false;
  }

  if (!['Pending', 'In Progress', 'Completed'].includes(formData.value.status)) {
    formErrors.value.status = 'Please select a valid status.';
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;
  closeModal();

  if (modalMode.value === 'create') {
    await taskStore.addTask({
      title: formData.value.title,
      date: formData.value.date,
      status: formData.value.status
    });
  } else if (modalMode.value === 'edit') {
    await taskStore.updateTask({ ...formData.value });
  }
};

const deleteTask = async (taskId) => {
  if (!confirm('Are you sure you want to cancel this application?')) return;
  await taskStore.deleteTask(taskId);
};

const markAsCompleted = async (taskId) => {
  if (!confirm('Confirm marking this application as Completed?')) return;
  const t = taskStore.tasks.find(x => x.id === taskId);
  if (t) {
    await taskStore.updateTask({ ...t, status: 'Completed' });
  }
};

// Map status to semantic brand styles
const statusStyles = {
  'In Progress': 'bg-blue-50 text-blue-600 border border-blue-200',
  'Pending': 'bg-orange-50 text-orange-600 border border-orange-300',
  'Completed': 'bg-green-50 text-green-600 border border-green-300',
  'End': 'bg-red-50 text-red-600 border border-red-300'
};
</script>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-15px);
}
.list-leave-active {
  position: absolute;
}

/* Modal Transitions */
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
