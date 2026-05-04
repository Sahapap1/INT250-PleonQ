<script setup>
import { useRouter } from 'vue-router'
import { useJobStore } from '../stores/jobStore'

const props = defineProps({
    data: Object,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const router = useRouter()
const jobStore = useJobStore()

const goToDetail = () => {
    router.push(`/job/${props.data.id}`)
}

const toggleLike = (e) => {
    e.stopPropagation() // กันไม่ให้ click card
    jobStore.toggleLike(props.data.id)
}
</script>

<template>
    <div @click="goToDetail"
        class="h-37 w-full md:max-w-3xl bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border p-2 pr-3 sm:pr-4 flex gap-2 sm:gap-4 relative group hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#FAA533]/40 transition-all duration-300 cursor-pointer overflow-hidden"
        :class="data.liked ? 'border-[#FAA533]/70 ring-[1.5px] ring-[#FAA533]/20 shadow-[0_4px_15px_rgba(239,119,34,0.08)] bg-[#FFF8F1]/20' : 'border-[#EBEBEB]'">

        <!-- Heart -->
        <button @click="toggleLike"
            class="absolute top-3 right-3 w-7 h-7 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#FAA533] hover:bg-[#FAA533] hover:text-white transition-colors z-10 active:scale-95">
            <svg class="w-3.5 h-3.5" :fill="data.liked ? 'currentColor' : 'none'" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </button>

        <!-- Image -->
        <div
            class="w-24 sm:w-32 md:w-44 h-full rounded-2xl from-[#FFD1A9] to-[#FFECD2] shrink-0 overflow-hidden flex items-center justify-center">
            <img src="@/assets/img/card_img.jpg" class="w-full h-full object-cover" />
        </div>

        <!-- Content -->
        <div class="flex flex-col py-1.5 px-1 sm:px-2 grow min-w-0 overflow-hidden">

            <h2
                class="text-sm sm:text-[17px] font-bold text-primary tracking-tight truncate">
                {{ data.title }}
            </h2>

            <p class="text-[11px] text-gray-500 font-medium leading-relaxed max-w-[220px] mb-2 line-clamp-2">
                {{ data.description }}
            </p>

            <!--  location -->
            <span class="text-[10px] text-gray-400 mb-2">
                {{ data.location }}
            </span>

            <div class="flex items-center justify-between mt-auto">

                <!--  category -->
                <span class="bg-[#3B82F6] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {{ data.category }}
                </span>

                <!--  positions -->
                <span class="text-[10px] text-gray-500 ml-auto mr-2 sm:mr-4">
                    {{ data.positions }} คน
                </span>

                <button
                    class="bg-orange-gradient hover:bg-[#FAA533] text-white text-[11px] font-bold px-4 py-1 rounded-full">
                    {{ isAdmin ? 'Edit' : 'View' }}
                </button>

            </div>
        </div>
    </div>
</template>
