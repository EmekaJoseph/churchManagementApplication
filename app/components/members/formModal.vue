<template>
  <button ref="openModalBtn" type="button" class="d-none" data-bs-toggle="modal" data-bs-target="#formModalId"></button>

  <div class="modal fade" id="formModalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
    role="dialog" aria-labelledby="formModalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
      <div class="modal-content border-0 shadow-lg overflow-hidden">
        <div class="modal-header border-0 bg-white py-3 px-4 align-items-center">
          <div>
            <h5 class="modal-title fw-bold text-dark" id="formModalTitleId">
              {{ modal.mode === 'add' ? 'Add New Member' : 'Edit Member' }}
            </h5>
            <p class="text-muted small mb-0">Capture member details quickly with an upgraded form experience.</p>
          </div>
          <button ref="closeModalBtn" type="button" class="btn-close btn-close-md" data-bs-dismiss="modal"
            @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4 bg-soft">
          <div class="form-shell p-4 rounded-4 shadow-sm bg-white">
            <form @submit.prevent="saveMember" v-if="localMember">
              <div class="row gy-4">
                <div class="col-12">
                  <div
                    class="section-header d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                    <div>
                      <span class="section-tag">Personal Details</span>
                    </div>
                  </div>
                </div>

                <div class="col-md-4">
                  <label class="form-label">First Name</label>
                  <CustomInputText v-model="localMember.firstname" placeholder="" required />
                </div>
                <div class="col-md-4">
                  <label class="form-label ">Last Name</label>
                  <CustomInputText v-model="localMember.lastname" type="text" required placeholder="" />
                </div>
                <div class="col-md-4">
                  <label class="form-label ">Surname</label>
                  <CustomInputText v-model="localMember.surname" type="text" required placeholder="" />
                </div>

                <div class="col-md-6">
                  <label class="form-label ">Gender</label>
                  <CustomInputSelect v-model="localMember.gender" :options="genderOptions" />
                </div>
                <div class="col-md-6">
                  <label class="form-label ">Birthday (MM/YY)</label>
                  <VueDatePicker v-model="localMember.birthday" model-type="MM/yy" placeholder="" :teleport="true"
                    class="form-control-date"></VueDatePicker>
                </div>

                <div class="col-12">
                  <div class="section-header section-divider">
                    <span class="section-tag">Contact Details</span>
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label ">Phone Number</label>
                  <input v-model="localMember.phone" type="tel" class="form-control" required
                    placeholder="e.g. 08012345678">
                </div>
                <div class="col-md-6">
                  <label class="form-label ">Email Address</label>
                  <input v-model="localMember.email" type="email" class="form-control" required
                    placeholder="example@church.org">
                </div>
                <div class="col-12">
                  <label class="form-label ">House Address</label>
                  <textarea v-model="localMember.house_address" class="form-control" rows="2" required
                    placeholder="Enter full address"></textarea>
                </div>

                <div class="col-12">
                  <div class="section-header section-divider">
                    <span class="section-tag">Church Details</span>
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label ">Position / Role</label>
                  <CustomInputSelect v-model="localMember.position" :options="positions" placeholder="Select position">
                  </CustomInputSelect>
                </div>
                <div class="col-md-6">
                  <label class="form-label ">Joining Date</label>
                  <VueDatePicker v-model="localMember.membership_date" model-type="yyyy-MM-dd"
                    placeholder="Select date joined" :teleport="true" class="form-control-date"></VueDatePicker>
                </div>

                <div class="col-12 d-flex justify-content-end gap-2 mt-3">
                  <button type="button" class="btn btn-light px-4 py-2" @click="closeModal"
                    data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-theme px-5 py-2 d-flex align-items-center justify-content-center"
                    :disabled="isSaving">
                    <span class="me-2">
                      <i class="bi bi-check-circle-fill"></i>
                    </span>
                    {{ isSaving ? 'Saving...' : (modal.mode === 'add' ? 'Add Member' : 'Update Member') }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMemberStore, type Member } from '~/stores/memberStore';
import VueSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

const { modal, addMember, updateMember, closeModal: storeCloseModal } = useMemberStore();
const { swalSuccess } = sweetAlerts;

const openModalBtn = ref<any>(null);
const closeModalBtn = ref<any>(null);
const isSaving = ref(false);

const localMember = ref<Partial<Member> | null>(null);

const genderOptions = ['Male', 'Female'];
const positions = [
  'Member', 'Elder', 'Deacon', 'Worker', 'Choir Leader', 'Usher', 'Sunday School Teacher'
];


const { vSelectAutoPosition } = useFxn

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
  border-radius: 24px;
}

.bg-soft {
  background: #f8fafc;
}

.form-shell {
  border: 1px solid rgba(125, 106, 255, 0.12);
}

.section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.section-divider {
  padding-top: 1rem;
  border-top: 1px solid rgba(148, 163, 184, 0.18);
}

.section-tag {
  display: inline-flex;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  /* background: rgba(204, 202, 207, 0.08); */
  color: rgba(52, 53, 49, 0.422);
  font-size: 0.75rem;
  letter-spacing: .02em;
  text-transform: uppercase;
}




.header-icon {
  width: 44px;
  height: 44px;
}

.bg-primary-soft {
  background: rgba(59, 130, 246, 0.1);
}

.btn-close-md {
  width: 40px;
  height: 40px;
}

.btn-theme {
  background-color: #7c3aed;
  color: white;
  border: none;
  font-weight: 600;
  border-radius: 14px;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.btn-theme:hover {
  background-color: #6d28d9;
  transform: translateY(-1px);
}

.btn-theme:disabled {
  opacity: 0.75;
  transform: none;
}

.btn-light {
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.25);
  font-weight: 600;
  color: #334155;
  border-radius: 14px;
}

.badge.bg-secondary-soft {
  background: rgba(71, 85, 105, 0.08);
  color: #475569;
}
</style>
