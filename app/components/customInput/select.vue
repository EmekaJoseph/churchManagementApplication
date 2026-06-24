<template>
    <span class="d-none d-md-block">
        <VueSelect @option:selected="handleSelection" append-to-body :calculate-position="vSelectAutoPosition"
            :teleport="true" :label="label" class="text-capitalize job-chooser " :clearable="false" :options>
        </VueSelect>
    </span>

    <span class="d-md-none">
        <select @change="handleNativeSelection" class="form-select">
            <option v-for="item in options" :value="JSON.stringify(item)" :key="item.id || item[label]">{{ item[label]
                }}
            </option>
        </select>
    </span>
</template>

<script setup lang="ts">

const { vSelectAutoPosition } = useFxn

interface Item {
    id: number | string,
    label: string,
    [key: string]: any;
}

defineProps({
    modelValue: {
        type: Object as () => Item | null,
        default: null,
    },
    options: {
        type: Array as () => Item[],
        required: true,
        default: () => [],
    },
    label: {
        type: String,
        default: 'label',
    }
});


const emit = defineEmits(['update:modelValue', 'selected']);

const handleSelection = (selectedItem: any) => {
    emit('update:modelValue', selectedItem);
    emit('selected', selectedItem);
};

const handleNativeSelection = (event: Event) => {
    const selectedItem = JSON.parse((event.target as HTMLSelectElement).value);
    emit('update:modelValue', selectedItem);
    emit('selected', selectedItem);
};
</script>