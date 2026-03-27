<template>
    <div class="d-flex justify-content-center align-items-center ">
        <div class="text-center">
            <i style="color: #cccccc67; font-size: 4.5rem;" :class="'bi ' + icon"></i>
            <div class="text-center text-muted2 fs-6">{{ text }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps({
    text: {
        required: false,
        default: "No data to show"
    },
    icon: {
        required: false,
        default: 'bi-trash2'
    }
})
</script>