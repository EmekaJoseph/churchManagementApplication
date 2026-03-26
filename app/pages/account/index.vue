<template>
  <div class="account-page dashboard-home">
    <div class="welcome-card animate-fade-in-up">
      <div class="text-content">
        <h2>Welcome back, {{ authStore.user.value?.name }}!</h2>
        <p>Here's what's happening in your ministry today.</p>
      </div>
      <div class="stats-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-card">
          <div class="stat-icon" :class="stat.color">
            <i :class="stat.icon"></i>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/authStore';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const authStore = useAuthStore()

const stats = [
  { label: 'Total Members', value: '1,248', icon: 'bi bi-people-fill', color: 'purple' },
  { label: 'Attendance (Sun)', value: '856', icon: 'bi bi-calendar-check-fill', color: 'blue' },
  { label: 'Total Offerings', value: '$12,450', icon: 'bi bi-cash-stack', color: 'green' },
  { label: 'Active Groups', value: '24', icon: 'bi bi-collection-fill', color: 'orange' },
]
</script>

<style scoped>
.welcome-card {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.text-content h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.text-content p {
  color: #64748b;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.75rem;
  border-radius: 16px;
  background-color: #f8fafc;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  background-color: #ffffff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
}

.stat-icon.purple {
  background-color: #f5f3ff;
  color: #7b1fa2;
}

.stat-icon.blue {
  background-color: #eff6ff;
  color: #3b82f6;
}

.stat-icon.green {
  background-color: #f0fdf4;
  color: #22c55e;
}

.stat-icon.orange {
  background-color: #fff7ed;
  color: #f97316;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.stat-label {
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 500;
}
</style>
