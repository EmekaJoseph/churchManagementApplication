<template>
  <div class="account-page">
    <div class="content-card animate-fade-in-up">
      <div class="header-section">
        <h2>Attendance Tracking</h2>
        <p>Monitor service attendance and engagement across all groups.</p>
      </div>
      <div class="placeholder-content">
        <i class="bi bi-calendar2-check-fill large-icon"></i>
        <p>This section is currently under development.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})
</script>

<style scoped>
.content-card {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.header-section h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.header-section p {
  color: #64748b;
  margin-bottom: 3rem;
  font-size: 1.1rem;
}

.placeholder-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
  gap: 1.5rem;
}

.large-icon {
  font-size: 5rem;
  opacity: 0.3;
  color: #3b82f6;
}

.placeholder-content p {
  font-size: 1.25rem;
  font-weight: 500;
}
</style>
