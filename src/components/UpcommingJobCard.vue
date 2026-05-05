<template>
    <div
        class="bg-white rounded-[14px] p-2 pl-3 flex items-center gap-3 border border-gray-100 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer">

        <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD1A9] to-[#FFECD2] flex items-center justify-center shrink-0">
            <div class="w-3.5 h-2.5 bg-[#EF7722] rounded-sm"></div>
        </div>

        <div class="min-w-0 flex-1">
            <h4 class="text-[12px] font-bold text-[#1F2937] truncate">
                {{ task?.title || 'Unknown Event' }}
            </h4>
            <span class="text-[10px] text-gray-400">
                {{ task?.date || 'No date' }}
            </span>
        </div>

    </div>
</template>

<script setup>
defineProps({
    task: {
        type: Object,
        required: true
    }
})
</script>