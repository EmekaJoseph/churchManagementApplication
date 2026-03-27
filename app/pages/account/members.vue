<template>
  <div class="account-page members-page">
    <div class="content-card animate-fade-in-up">
      <div class="header-section">
        <div class="mb-3">
          <h2>Members Management</h2>
          <p class="mb-0 text-muted">Manage your church members, families, and contact information.</p>
        </div>

        <div class="row justify-content-end g-2 mb-3">
          <div class="col-md-4">
            <CustomInputSearch v-model="searchValue" placeholder="Search members..." />
          </div>
          <div class="col-md-3"></div>
          <div class="col-md-2">
            <button class="btn btn-dark w-100">IMPORT</button>
          </div>

          <div class="col-md-3">
            <button @click="handleAddMember" class="btn btn-theme w-100">ADD MEMBERS</button>
          </div>
        </div>

      </div>

      <EasyDataTable :headers="headers" :items="members" :search-value="searchValue" buttons-pagination show-index>

        <template #header-index>
          S/N
        </template>

        <template #empty-message>
          <NoDataSlot text="No members found" icon="bi-people" />
        </template>

        <template #item-surname="{ surname, firstname, lastname }">
          <div class="member-identity">
            <span class="member-surname">{{ surname }}</span>, {{ firstname }} {{ lastname }}
          </div>
        </template>


        <template #item-action="item">
          <div class="dropdown">
            <div class="fs-5 dropdown-toggle cursor-pointer" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-three-dots"></i>
            </div>
            <ul class="dropdown-menu  shadow-lg border-0">
              <li>
                <span @click="viewMember(item)"
                  class="dropdown-item cursor-pointer hover-tiltX bg-transparent text-dark">
                  <i class="bi bi-eye"></i>
                  View
                </span>
              </li>
              <li>
                <span class="dropdown-item cursor-pointer hover-tiltX bg-transparent text-warning-emphasis ">
                  <i class="bi bi-pencil"></i>
                  Edit
                </span>
              </li>
              <li>
                <span class="dropdown-item cursor-pointer hover-tiltX bg-transparent text-danger-emphasis ">
                  <i class="bi bi-trash"></i>
                  Delete
                </span>
              </li>
            </ul>
          </div>

        </template>

      </EasyDataTable>
    </div>
  </div>

  <MembersViewModal />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})


import { useMemberStore, type Member } from '~/stores/memberStore';


const { members, viewModal } = useMemberStore();
const searchValue = ref('');
const { swalConfirm, swalSuccess } = sweetAlerts

const headers = [
  { text: "NAME", value: "surname", sortable: true, width: 200 },
  { text: "GENDER", value: "gender", sortable: true },
  { text: "PHONE", value: "phone" },
  { text: "EMAIL", value: "email" },
  { text: " ", value: "action" },
  // { text: "ADDRESS", value: "house_address", width: 250 },
  // { text: "BIRTHDAY", value: "birthday", sortable: true },
  // { text: "POSITION", value: "position", sortable: true, width: 180 },
];

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


function viewMember(item: Member) {
  viewModal.isOpen = !viewModal.isOpen
  viewModal.currentMember = item
}

function handleAddMember() {
  swalConfirm('Add Member', 'Are you sure you want to add a new member?', 'Add Member', 'question')
}

function handleEditMember(id: string) {
  swalConfirm('Edit Member', 'Are you sure you want to edit this member?', 'Edit Member', 'question')
}

function handleDeleteMember(id: string) {
  swalConfirm('Delete Member', 'Are you sure you want to delete this member?', 'Delete Member', 'question')
}
</script>

<style scoped>
.content-card {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.04);
}

.header-section h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.header-section p {
  font-size: 1rem;
}


.member-surname {
  font-weight: 700;
  color: #1e293b;
}


.badge {
  display: inline-block;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.75rem;
  min-width: 150px;
  text-align: center;
}
</style>
