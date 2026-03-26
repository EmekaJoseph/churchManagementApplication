<template>
  <div class="settings-page">
    <div class="content-card animate-fade-in-up">
      <div class="header-section mb-4">
        <h2>Member Categories</h2>
        <p class="text-muted">Define and organize member roles and groupings.</p>
      </div>

      <div class="placeholder-content py-5 text-center">
        <div class="icon-bg mb-4">
          <i class="bi bi-tags display-4 text-theme"></i>
        </div>
        <h4>Category Management</h4>
        <p class="text-muted">This module is part of our upcoming modular update.</p>
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
