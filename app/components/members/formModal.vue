<template>
  <button ref="openModalBtn" type="button" class="d-none" data-bs-toggle="modal" data-bs-target="#formModalId"></button>

  <div class="modal fade" id="formModalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
    aria-labelledby="formModalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
      <div class="modal-content border-0 shadow-lg overflow-hidden">
        <div class="modal-header border-0 bg-light py-3 px-4">
          <h5 class="modal-title fw-bold text-dark" id="formModalTitleId">
            {{ modal.mode === 'add' ? 'Add New Member' : 'Edit Member' }}
          </h5>
          <button ref="closeModalBtn" type="button" class="btn-close" data-bs-dismiss="modal" @click="closeModal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <form @submit.prevent="saveMember" v-if="localMember">
            <div class="row g-4">
              <!-- Personal Details Section -->
              <div class="col-12 border-bottom pb-2 mb-2">
                <h6 class="text-primary fw-bold mb-0">Personal Details</h6>
              </div>
              <div class="col-md-4">
                <label class="form-label small fw-bold">First Name</label>
                <input v-model="localMember.firstname" type="text" class="form-control" required placeholder="Enter first name">
              </div>
              <div class="col-md-4">
                <label class="form-label small fw-bold">Last Name</label>
                <input v-model="localMember.lastname" type="text" class="form-control" required placeholder="Enter last name">
              </div>
              <div class="col-md-4">
                <label class="form-label small fw-bold">Surname</label>
                <input v-model="localMember.surname" type="text" class="form-control" required placeholder="Enter surname">
              </div>

              <div class="col-md-6">
                <label class="form-label small fw-bold">Gender</label>
                <div class="d-flex gap-3 mt-2">
                  <div class="form-check">
                    <input v-model="localMember.gender" class="form-check-input" type="radio" value="Male" id="male">
                    <label class="form-check-label" for="male">Male</label>
                  </div>
                  <div class="form-check">
                    <input v-model="localMember.gender" class="form-check-input" type="radio" value="Female" id="female">
                    <label class="form-check-label" for="female">Female</label>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <label class="form-label small fw-bold">Birthday (MM/YY)</label>
                <VueDatePicker v-model="localMember.birthday" model-type="MM/yy" placeholder="Select month/year" :teleport="true" />
              </div>

              <!-- Contact Details Section -->
              <div class="col-12 border-bottom pb-2 mb-2 mt-4">
                <h6 class="text-primary fw-bold mb-0">Contact Details</h6>
              </div>
              <div class="col-md-6">
                <label class="form-label small fw-bold">Phone Number</label>
                <input v-model="localMember.phone" type="tel" class="form-control" required placeholder="e.g. 08012345678">
              </div>
              <div class="col-md-6">
                <label class="form-label small fw-bold">Email Address</label>
                <input v-model="localMember.email" type="email" class="form-control" required placeholder="example@church.org">
              </div>
              <div class="col-12">
                <label class="form-label small fw-bold">House Address</label>
                <textarea v-model="localMember.house_address" class="form-control" rows="2" required placeholder="Enter full address"></textarea>
              </div>

              <!-- Church Details Section -->
              <div class="col-12 border-bottom pb-2 mb-2 mt-4">
                <h6 class="text-primary fw-bold mb-0">Church Details</h6>
              </div>
              <div class="col-md-6">
                <label class="form-label small fw-bold">Position / Role</label>
                <select v-model="localMember.position" class="form-select" required>
                  <option value="" disabled>Select position</option>
                  <option v-for="pos in positions" :key="pos" :value="pos">{{ pos }}</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label small fw-bold">Joining Date</label>
                <VueDatePicker v-model="localMember.membership_date" model-type="yyyy-MM-dd" placeholder="Select date joined" :teleport="true" />
              </div>
            </div>

            <div class="mt-5 d-flex justify-content-end gap-2">
              <button type="button" class="btn btn-light px-4" @click="closeModal" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-theme px-5" :disabled="isSaving">
                {{ isSaving ? 'Saving...' : (modal.mode === 'add' ? 'Add Member' : 'Update Member') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMemberStore, type Member } from '~/stores/memberStore';

const { modal, addMember, updateMember, closeModal: storeCloseModal } = useMemberStore();
const { swalSuccess } = sweetAlerts;

const openModalBtn = ref<any>(null);
const closeModalBtn = ref<any>(null);
const isSaving = ref(false);

const localMember = ref<Partial<Member> | null>(null);

const positions = [
  'Member', 'Elder', 'Deacon', 'Worker', 'Choir Leader', 'Usher', 'Sunday School Teacher'
];

watch(() => modal.isOpen, (newVal) => {
  if (newVal) {
    if (modal.mode === 'edit' && modal.currentMember) {
      localMember.value = { ...modal.currentMember };
    } else {
      localMember.value = {
        firstname: '',
        lastname: '',
        surname: '',
        gender: 'Male',
        phone: '',
        email: '',
        house_address: '',
        position: 'Member',
        birthday: '',
        membership_date: new Date().toISOString().split('T')[0]
      };
    }
    openModalBtn.value?.click();
  }
});

const closeModal = () => {
  storeCloseModal();
};

const saveMember = async () => {
  if (!localMember.value) return;
  
  isSaving.value = true;
  try {
    if (modal.mode === 'add') {
      addMember(localMember.value as Omit<Member, 'id'>);
      swalSuccess('Member Added', `${localMember.value.firstname} has been successfully added.`, 'OK', 'success');
    } else {
      updateMember(localMember.value as Member);
      swalSuccess('Member Updated', `${localMember.value.firstname}'s records have been updated.`, 'OK', 'success');
    }
    
    closeModalBtn.value?.click();
    closeModal();
  } catch (error) {
    swalSuccess('Error', 'Something went wrong while saving the member.', 'OK', 'error');
  } finally {
    isSaving.value = false;
  }
};

onBeforeRouteLeave(() => {
  closeModalBtn.value?.click();
});
</script>

<style scoped>
.modal-content {
  border-radius: 20px;
}

.form-label {
  color: #64748b;
  margin-bottom: 0.5rem;
}

.form-control, .form-select {
  padding: 0.625rem 0.875rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.form-control:focus, .form-select:focus {
  border-color: #7b1fa2;
  box-shadow: 0 0 0 4px rgba(123, 31, 162, 0.1);
}

.btn-theme {
  background-color: #7b1fa2;
  color: white;
  border: none;
  font-weight: 600;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.btn-theme:hover {
  background-color: #6a1b8a;
  transform: translateY(-1px);
}

.btn-theme:disabled {
  opacity: 0.7;
  transform: none;
}

.btn-light {
  background: #f1f5f9;
  border: none;
  font-weight: 600;
  color: #475569;
  border-radius: 10px;
}
</style>
