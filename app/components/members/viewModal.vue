<template>
  <button ref="openModal" type="button" class="d-none" data-bs-toggle="modal" data-bs-target="#modalId"></button>

  <div class="modal fade" id="modalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
    aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
      <div class="modal-content border-0 shadow-lg overflow-hidden">
        <div class="modal-header border-0 pb-0">
        </div>
        <div class="modal-body pt-0" v-if="viewModal.currentMember">
          <div class="profile-header text-center mb-4">
            <div class="avatar-container mx-auto mb-3 slide-in-bottom">
              <div class="avatar-circle">
                {{ getInitials(viewModal.currentMember) }}
              </div>
            </div>
            <h3 class="member-name mb-1">{{ viewModal.currentMember.firstname }} {{ viewModal.currentMember.lastname }}
              <span class="text-primary fw-bold">{{ viewModal.currentMember.surname }}</span>
            </h3>
            <span class="badge position-badge" :class="getPositionBadgeClass(viewModal.currentMember.position)">
              {{ viewModal.currentMember.position }}
            </span>
          </div>

          <div class="info-grid mt-4 px-3">
            <div class="row g-4">
              <!-- Contact Info -->
              <div class="col-md-6 mb-3">
                <div class="info-card h-100">
                  <div class="info-label"><i class="bi bi-person-lines-fill me-2"></i>Contact Details</div>
                  <div class="info-item">
                    <i class="bi bi-telephone text-muted"></i>
                    <span>{{ viewModal.currentMember.phone }}</span>
                  </div>
                  <div class="info-item">
                    <i class="bi bi-envelope text-muted"></i>
                    <span class="text-break">{{ viewModal.currentMember.email }}</span>
                  </div>
                  <div class="info-item">
                    <i class="bi bi-geo-alt text-muted"></i>
                    <span>{{ viewModal.currentMember.house_address }}</span>
                  </div>
                </div>
              </div>

              <!-- Personal Info -->
              <div class="col-md-6 mb-3">
                <div class="info-card h-100">
                  <div class="info-label"><i class="bi bi-info-circle me-2"></i>Personal Info</div>
                  <div class="info-item">
                    <i class="bi bi-gender-ambiguous text-muted"></i>
                    <span>{{ viewModal.currentMember.gender }}</span>
                  </div>
                  <div class="info-item">
                    <i class="bi bi-calendar-event text-muted"></i>
                    <span>Birthday: {{ viewModal.currentMember.birthday }}</span>
                  </div>
                  <div class="info-item">
                    <i class="bi bi-calendar-check text-muted"></i>
                    <span>Joined: {{ formatDate(viewModal.currentMember.membership_date) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer border-0 pb-4 justify-content-center">
          <button ref="closeModal" type="button" class="btn btn-light px-4 py-2" data-bs-dismiss="modal">Close
            Profile</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMemberStore, type Member } from '~/stores/memberStore';

const { viewModal } = useMemberStore();

const openModal = ref<any>(null)
const closeModal = ref<any>(null)

watch(() => viewModal.isOpen, () => {
  openModal.value?.click()
})

onBeforeRouteLeave(() => {
  closeModal.value?.click()
})

const getInitials = (member: Member) => {
  return `${member.firstname[0]}${member.surname[0]}`.toUpperCase()
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const getPositionBadgeClass = (position: string) => {
  const mapping: Record<string, string> = {
    'Member': 'bg-secondary-subtle text-secondary',
    'Elder': 'bg-primary-subtle text-primary',
    'Deacon': 'bg-info-subtle text-info',
    'Worker': 'bg-success-subtle text-success',
    'Choir Leader': 'bg-warning-subtle text-warning',
    'Usher': 'bg-dark-subtle text-dark',
    'Sunday School Teacher': 'bg-danger-subtle text-danger',
  };
  return mapping[position] || 'bg-light text-dark';
};

</script>

<style scoped>
.modal-content {
  border-radius: 24px;
  background: #ffffff;
}

.avatar-container {
  width: 100px;
  height: 100px;
  position: relative;
}

.avatar-circle {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(123, 31, 162, 0.2);
}

.member-name {
  color: #1e293b;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.position-badge {
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
}

.info-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.25rem;
  border: 1px solid #f1f5f9;
}

.info-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #334155;
  font-size: 0.95rem;
}

.info-item i {
  font-size: 1.1rem;
  margin-top: 1px;
}

.btn-light {
  background: #f1f5f9;
  border: none;
  font-weight: 600;
  color: #475569;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.btn-light:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.slide-in-bottom {
  animation: slideInBottom 0.5s ease-out;
}

@keyframes slideInBottom {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>