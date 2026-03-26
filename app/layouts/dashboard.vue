<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="brand">
        <div class="abstract-logo">
          <span></span><span></span><span></span><span></span>
        </div>
        <h2 class="brand-name">CHURCH MANAGER</h2>
      </div>

      <nav class="nav-menu">
        <template v-for="item in menuItems" :key="item.label">
          <!-- Normal Nav Item -->
          <NuxtLink v-if="!item.subItems" :to="item.path" class="nav-item" exact-active-class="active">
            <i :class="item.icon" class="icon"></i>
            <span>{{ item.label }}</span>
          </NuxtLink>

          <div v-else class="nav-dropdown" :class="{ 'open': openMenus.includes(item.label) }">
            <button @click="toggleMenu(item.label)" class="nav-item dropdown-toggle-btn"
              :class="{ 'active': isSubItemActive(item) }">
              <i :class="item.icon" class="icon"></i>
              <span>{{ item.label }}</span>
              <i class="bi bi-chevron-down chevron"></i>
            </button>
            <div class="sub-menu">
              <NuxtLink v-for="sub in item.subItems" :key="sub.path" :to="sub.path" class="sub-item"
                exact-active-class="active">
                <span>{{ sub.label }}</span>
              </NuxtLink>
            </div>
          </div>
        </template>
      </nav>

      <div class="sidebar-footer">
        <div class="sync-section mb-3">
          <button @click="handleSync" class="sync-btn" :disabled="isSyncing">
            <i class="bi bi-arrow-repeat icon" :class="{ 'spinning': isSyncing }"></i>
            <span>{{ isSyncing ? 'Syncing...' : 'Sync Data Online' }}</span>
          </button>
          <div v-if="lastSynced" class="last-synced">
            Last synced: {{ lastSynced }}
          </div>
        </div>

        <button @click="handleLogout" class="logout-btn">
          <i class="bi bi-box-arrow-left icon"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="top-bar">
        <h1 class="page-title">{{ currentPageTitle }}</h1>
        <div class="user-profile">
          <div class="avatar">{{ userInitials }}</div>
          <div class="user-info">
            <span class="user-name">{{ authStore.user.value?.name }}</span>
            <span class="user-role">{{ authStore.user.value?.role }}</span>
          </div>
        </div>
      </header>

      <div class="page-container">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/authStore'

const authStore = useAuthStore()
const route = useRoute()

const menuItems = [
  { label: 'Dashboard', path: '/account', icon: 'bi bi-grid-fill' },
  { label: 'Members', path: '/account/members', icon: 'bi bi-people-fill' },
  { label: 'Attendance', path: '/account/attendance', icon: 'bi bi-calendar2-check-fill' },
  { label: 'Offerings', path: '/account/offerings', icon: 'bi bi-cash-stack' },
  { label: 'Reports', path: '/account/reports', icon: 'bi bi-bar-chart-fill' },
  {
    label: 'Settings',
    icon: 'bi bi-gear-fill',
    subItems: [
      { label: 'General', path: '/account/settings/general' },
      { label: 'Security', path: '/account/settings/security' },
      { label: 'Member Categories', path: '/account/settings/member-categories' },
    ]
  },
]

const openMenus = ref([])

const toggleMenu = (label) => {
  const index = openMenus.value.indexOf(label)
  if (index > -1) {
    openMenus.value.splice(index, 1)
  } else {
    openMenus.value.push(label)
  }
}

const isSubItemActive = (item) => {
  return item.subItems?.some(sub => route.path === sub.path)
}

const currentPageTitle = computed(() => {
  // Check main items
  const mainItem = menuItems.find(i => i.path === route.path)
  if (mainItem) return mainItem.label

  // Check sub items
  for (const item of menuItems) {
    if (item.subItems) {
      const subItem = item.subItems.find(s => s.path === route.path)
      if (subItem) return `${item.label} / ${subItem.label}`
    }
  }

  return 'Dashboard'
})

const userInitials = computed(() => {
  const name = authStore.user.value?.name || 'Admin'
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
})

const isSyncing = ref(false)
const lastSynced = ref('')

const handleSync = async () => {
  if (isSyncing.value) return

  isSyncing.value = true

  // Simulate sync delay
  await new Promise(resolve => setTimeout(resolve, 3000))

  const now = new Date()
  lastSynced.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  isSyncing.value = false
}

const handleLogout = () => {
  authStore.logout()
  navigateTo('/login')
}
</script>

<style scoped>
/* Dashboard Layout Styles */
.dashboard-layout {
  display: flex;
  height: 100vh;
  background-color: #f8fafc;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

.sidebar {
  width: 250px;
  background-color: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 2rem;
}

.abstract-logo {
  display: grid;
  grid-template-columns: repeat(2, 10px);
  gap: 4px;
}

.abstract-logo span {
  width: 10px;
  height: 10px;
  background-color: #7b1fa2;
  border-radius: 2px;
}

.brand-name {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: 0.5px;
}

.nav-menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow-y: auto;
  padding-right: 0.5rem;
  /* Custom Scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #e2e8f0 transparent;
}

.nav-menu::-webkit-scrollbar {
  width: 4px;
}

.nav-menu::-webkit-scrollbar-track {
  background: transparent;
}

.nav-menu::-webkit-scrollbar-thumb {
  background-color: #e2e8f0;
  border-radius: 20px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 12px;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem !important;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background-color: #f1f5f9;
  color: #1e293b;
}

.nav-item.active {
  background-color: #f5f3ff;
  color: #7b1fa2;
}

/* Dropdown Styles */
.nav-dropdown {
  display: flex;
  flex-direction: column;
}

.dropdown-toggle-btn {
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-size: inherit;
  display: flex;
  align-items: center;
}

.chevron {
  margin-left: auto;
  font-size: 0.75rem;
  transition: transform 0.3s ease;
  color: #94a3b8;
}

.nav-dropdown.open .chevron {
  transform: rotate(180deg);
}

.sub-menu {
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-dropdown.open .sub-menu {
  max-height: 300px;
  /* Adjust based on content */
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
}

.sub-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  color: #64748b;
  text-decoration: none;
  font-size: 0.825rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.sub-item:hover {
  background-color: #f8fafc;
  color: #1e293b;
}

.sub-item.active {
  color: #7b1fa2;
  font-weight: 600;
  background-color: #f5f3ff;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.sync-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sync-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 12px;
  color: #a28c1f;
  background-color: transparent;
  border: 1px solid #f8f8c0;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.sync-btn:hover {
  background-color: #fdfee9 !important;
}



.sync-btn:hover:not(:disabled) {
  background-color: #ede9fe;
  transform: translateY(-2px);
}

.sync-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.last-synced {
  font-size: 0.7rem;
  color: #94a3b8;
  padding-left: 1rem;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 12px;
  color: #ef4444;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.85rem;
  transition: background 0.2s ease;
}

.logout-btn:hover {
  background-color: #fef2f2;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.top-bar {
  height: 80px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: #f5f3ff;
  color: #7b1fa2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
}

.user-role {
  font-size: 0.75rem;
  color: #64748b;
}

.page-container {
  flex: 1;
  padding: 1.2rem;
  overflow-y: auto;
  background-color: #f8fafc;
}

.icon {
  font-size: 1rem;
}
</style>
