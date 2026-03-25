<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const timestamp = ref('---- startup ----');

setInterval(
  async () => {
    timestamp.value = await window.ipcRenderer.invoke('app-start-time')
  },
  1 * 1000
);
</script>
