<template>
  <div class="settings-page">
    <div class="content-card animate-fade-in-up">
      <div class="header-section mb-4">
        <h2>Security Settings</h2>
        <p class="text-muted">Manage your password, two-factor authentication, and account security.</p>
      </div>

      <div class="placeholder-content py-5 text-center">
        <div class="icon-bg mb-4">
          <i class="bi bi-shield-lock display-4 text-theme"></i>
        </div>
        <h4>Security Controls</h4>
        <p class="text-muted">Advanced security features are currently being implemented.</p>
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
