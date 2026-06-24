<template>
    <VueDatePicker :max-date="new Date()" :input-attrs="{ hideInputIcon: true, clearable: false }"
        :formats="{ year: 'yyyy', month: 'LLL', day: 'd', input: dateDisplay }"
        :flow="{ steps: ['year', 'month', 'calendar'] }" :time-config="{ enableTimePicker: false }" auto-apply
        v-model="localValue" placeholder="" :teleport="true">
    </VueDatePicker>
</template>

<script setup lang="ts">

const { dateDisplay } = useFxn

const id = ref<string>('');
onMounted(() => {
    id.value = `input-${Math.random().toString(36).slice(2, 10)}`;
});


const props = defineProps({
    modelValue: {
        type: [Date, String] as PropType<Date | string>,
        default: () => new Date()
    },
})
const emit = defineEmits(['update:modelValue']);
// const { modelValue } = toRefs(props);

const localValue = ref<any>(props.modelValue)


watch(localValue, (newValue, oldValue) => {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        emit('update:modelValue', newValue);
    }
});

</script>

<style scoped></style>