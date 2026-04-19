<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobStore } from '@/stores/jobStore'

const route = useRoute()
const router = useRouter()
const jobStore = useJobStore()

const job = computed(() =>
    jobStore.jobs.find(j => j.id == route.params.id)
)

const goBack = () => {
    router.back()
}

const toggleLike = () => {
    jobStore.toggleLike(job.value.id)
}
</script>

<template>
    <div class="min-h-screen pb-2">

        <!--  Header -->
        <div class="flex justify-between items-center p-4">

            <button @click="goBack"
                class="bg-orange-gradient text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                ← Go back
            </button>

            <button @click="toggleLike"
                class="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-orange-400">
                <svg class="w-5 h-5" :fill="job?.liked ? 'currentColor' : 'none'" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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
            <div>
                <h1 class="text-xl font-bold text-gray-800 mb-2">
                    {{ job?.title }}
                </h1>

                <p class="text-gray-500 text-sm leading-relaxed mb-4">
                    {{ job?.description }}
                </p>

                <!--  Info -->
                <div class="flex flex-col gap-2 text-sm text-gray-600">

                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-location-dot text-orange-400"></i>
                        <span>{{ job?.location }}</span>
                    </div>

                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-calendar-days text-orange-400"></i>
                        <span>{{ job?.date }}</span>
                    </div>

                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-users text-orange-400"></i>
                        <span>{{ job?.positions }} คน</span>
                    </div>

                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-gift text-orange-400"></i>
                        <span>{{ job?.reward }}</span>
                    </div>

                </div>
            </div>

            <!-- Apply -->
            <div class="mt-auto justify-end flex">
                <button
                class="bg-orange-gradient text-white px-8 py-2 rounded-full text-sm flex items-center gap-2">
                Apply
            </button>
            </div>

        </div>




    </div>
</template>