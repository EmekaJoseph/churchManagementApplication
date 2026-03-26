<template>
  <div class="settings-page">
    <div class="content-card animate-fade-in-up">
      <div class="header-section mb-4">
        <h2>General Settings</h2>
        <p class="text-muted">Manage your application's basic configuration and preferences.</p>
      </div>

      <div class="placeholder-content py-5 text-center">
        <div class="icon-bg mb-4">
          <i class="bi bi-gear-wide-connected display-4 text-theme"></i>
        </div>
        <h4>Under Construction</h4>
        <p class="text-muted">We're working hard to bring you these settings soon.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})
</script>

<style scoped>
.icon-bg {
  width: 100px;
  height: 100px;
  background-color: #f5f3ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.text-theme {
  color: #7b1fa2;
}
</style>
