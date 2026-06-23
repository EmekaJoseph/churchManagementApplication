<script setup lang="ts">
import { ref, toRefs, watch, onMounted, computed } from 'vue';
import {
    endOfMonth, endOfYear, startOfMonth,
    startOfYear, subMonths, subDays
} from 'date-fns';
import { useDateFormat } from '@vueuse/core';


onMounted(() => {
    setDateRange()
})

function setDateRange() {
    if (!localValue.value || localValue.value.every(d => d === null)) {
        const endDate = new Date();
        const startDate = subDays(endDate, 7);
        localValue.value = [startDate, endDate];
    }
}

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [null, null]
    },
})
const emit = defineEmits(['update:modelValue']);
const { modelValue } = toRefs(props);

const localValue = ref<any[]>(props.modelValue)

const dateMe1 = computed(() => useDateFormat(localValue.value[0], 'MMM D, YYYY').value);
const dateMe2 = computed(() => useDateFormat(localValue.value[1], 'MMM D, YYYY').value);
const date_display = () => `${dateMe1.value} - ${dateMe2.value}`;

const now = new Date();
const presetDates = ref([
    { label: 'Today', value: [now, now] },
    { label: 'Yesterday', value: [subDays(now, 1), subDays(now, 1)] },
    { label: 'Last week', value: [subDays(now, 7), now] },
    { label: 'Last 14 days', value: [subDays(now, 14), now] },
    { label: 'Last 30 days', value: [subDays(now, 30), now] },
    { label: 'Last month', value: [startOfMonth(subMonths(now, 1)), endOfMonth(subMonths(now, 1))] },
    { label: 'This month', value: [startOfMonth(now), endOfMonth(now)] },
    { label: 'Last 6 months', value: [subMonths(now, 6), now] },
    { label: 'Last year', value: [startOfYear(subMonths(now, 12)), endOfYear(subMonths(now, 12))] },
]);


watch(localValue, (newValue, oldValue) => {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        emit('update:modelValue', newValue);
    }
});

</script>

<template>
    <VueDatePicker :clearable="false" :format="date_display" auto-apply v-model="localValue" range
        :preset-dates="presetDates">
        <template #preset-date-range-button="{ label, value, presetDate }">
            <span role="button" :tabindex="0" @click="presetDate(value)" @keyup.enter.prevent="presetDate(value)"
                @keyup.space.prevent="presetDate(value)">
                {{ label }}
            </span>
        </template>
    </VueDatePicker>
</template>