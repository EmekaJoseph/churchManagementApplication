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
            <button @click="openModal('add')" class="btn btn-theme w-100">ADD MEMBERS</button>
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
            <ul class="dropdown-menu shadow-lg border-0">
              <li>
                <span @click="viewMember(item)"
                  class="dropdown-item cursor-pointer hover-tiltX bg-transparent text-dark">
                  <i class="bi bi-eye me-2"></i>
                  View
                </span>
              </li>
              <li>
                <span @click="openModal('edit', item)"
                  class="dropdown-item cursor-pointer hover-tiltX bg-transparent text-warning-emphasis">
                  <i class="bi bi-pencil me-2"></i>
                  Edit
                </span>
              </li>
              <li>
                <span @click="handleDeleteMember(item)"
                  class="dropdown-item cursor-pointer hover-tiltX bg-transparent text-danger-emphasis">
                  <i class="bi bi-trash me-2"></i>
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
  <MembersFormModal />
</template>

<script setup lang="ts">
import { useMemberStore, type Member } from '~/stores/memberStore';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const { members, viewModal, openModal, deleteMember } = useMemberStore();
const searchValue = ref('');
const { swalConfirm, swalSuccess } = sweetAlerts

const headers = [
  { text: "NAME", value: "surname", sortable: true, width: 220 },
  { text: "GENDER", value: "gender", sortable: true },
  { text: "PHONE", value: "phone", },
  { text: "EMAIL", value: "email", },
  { text: " ", value: "action", },
];

function viewMember(item: Member) {
  viewModal.currentMember = item
  viewModal.isOpen = !viewModal.isOpen
}

async function handleDeleteMember(member: Member) {
  const result = await swalConfirm(
    'Delete Member',
    `Are you sure you want to delete ${member.firstname} ${member.surname}? This action cannot be undone.`,
    'Yes, Delete',
    'warning'
  )

  if (result.isConfirmed) {
    deleteMember(member.id)
    swalSuccess('Deleted!', 'Member has been removed from the database.', 'OK', 'success')
  }
}
</script>

<style scoped>
.content-card {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.04);
}

.header-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.header-section p {
  font-size: 0.9rem;
}

.member-surname {
  font-weight: 700;
  color: #1e293b;
}

.cursor-pointer {
  cursor: pointer;
}

.hover-tiltX:hover {
  transform: translateX(4px);
  transition: transform 0.2s ease;
}
</style>
