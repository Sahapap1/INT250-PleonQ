<template>
    <div
        class="bg-white dark:bg-gray-800 rounded-[14px] p-2 pl-3 flex items-center gap-3 border border-gray-100 dark:border-gray-700 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer">

        

        <div class="min-w-0 flex-1">
            <h4 class="text-[12px] font-bold text-[#1F2937] dark:text-gray-100 truncate">
                {{ task?.title || 'Unknown Event' }}
            </h4>
            <span class="text-[10px] text-gray-400">
                {{ task?.date || 'No date' }}
            </span>
        </div>

    </div>
</template>

<script setup>
const props = defineProps({
    task: {
        type: Object,
        required: true
    }
})

const getImageUrl = (imageName) => {
    if (!imageName) return '';
    return new URL(`../assets/img-jobs/${imageName}`, import.meta.url).href;
}
</script>