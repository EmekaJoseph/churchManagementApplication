<template>
  <div class="account-page">
    <div class="content-card animate-fade-in-up attendance-page">
      <div class="header-section gap-3 flex-wrap align-items-start justify-content-between mb-4">
        <div>
          <h2>Attendance Sessions</h2>
          <p>Browse past sessions below, or add a new one.</p>
        </div>
      </div>

      <div class="session-grid">
        <button type="button" class="session-card add-session-card" @click="openAddModal">
          <i class="bi bi-plus-lg"></i>
          <span>Add new session</span>
        </button>

        <div v-for="record in sortedRecords" :key="record.id" class="session-card">
          <div class="session-card-main cursor-pointer" role="button" tabindex="0" @click="openHistory(record)"
            @keyup.enter="openHistory(record)">
            <span class="session-date">{{ formatDate(record.date) }}</span>
            <span class="session-title">{{ record.title }}</span>
            <span class="session-count">{{ record.attendeeIds.length }} attendee<span
                v-if="record.attendeeIds.length !== 1">s</span></span>
          </div>

          <button type="button" class="session-delete-btn" title="Delete session"
            @click.stop="handleDeleteAttendance(record)">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <p v-if="!sortedRecords.length" class="text-muted mt-3 mb-0">No attendance sessions yet. Click the card above
        to create one.</p>

      <!-- Session detail modal -->
      <div v-if="historyModalOpen" class="detail-modal-backdrop" @click.self="closeHistoryModal">
        <div class="detail-modal-card">
          <div class="panel-header justify-content-between align-items-start gap-3">
            <div>
              <span class="section-tag">Session details</span>
              <h4>{{ selectedHistory?.title || 'Session details' }}</h4>
              <p class="text-muted">Review who attended and session notes.</p>
            </div>
            <button class="btn btn-light px-4 py-2" type="button" @click="closeHistoryModal">Close</button>
          </div>

          <div class="detail-modal-grid">
            <div>
              <strong>Date</strong>
              <p>{{ selectedHistory ? formatDate(selectedHistory.date) : '-' }}</p>
            </div>
            <div>
              <strong>Attendees</strong>
              <p>{{ selectedHistory ? selectedHistory.attendeeIds.length : 0 }}</p>
            </div>
          </div>

          <div>
            <strong>Notes</strong>
            <p>{{ selectedHistory?.notes || 'No notes provided.' }}</p>
          </div>

          <div class="modal-member-list">
            <div v-for="member in historyMembers" :key="member.id" class="modal-member-card">
              <strong>{{ member.firstname }} {{ member.lastname }}</strong>
              <p class="mb-0 text-muted">{{ member.email }} · {{ member.phone }}</p>
            </div>
            <p v-if="!historyMembers.length" class="text-muted mb-0">No attendees recorded for this session.</p>
          </div>

          <!-- <div class="modal-footer">
            <button class="btn btn-theme px-4 py-2" type="button" @click="closeHistoryModal">Done</button>
          </div> -->
        </div>
      </div>

      <!-- Add new session modal -->
      <div v-if="addModalOpen" class="detail-modal-backdrop" @click.self="closeAddModal">
        <div class="detail-modal-card add-modal-card">
          <div class="panel-header justify-content-between align-items-start gap-3">
            <div>
              <span class="section-tag">New session</span>
              <h4>Add attendance session</h4>
              <p class="text-muted">Pick a date and select who attended.</p>
            </div>
            <button class="btn btn-light px-4 py-2" type="button" @click="closeAddModal">Close</button>
          </div>

          <form class="attendance-form" @submit.prevent="saveAttendance">
            <div class="row gx-4 gy-3">
              <div class="col-md-7">
                <label class="form-label">Session title (optional)</label>
                <CustomInputText v-model.trim="attendanceForm.title" placeholder="e.g. Sunday worship service" />
              </div>

              <div class="col-md-5">
                <label class="form-label">Session date</label>
                <CustomInputDatePicker v-model="attendanceForm.date" />
              </div>

              <div class="col-12">
                <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                  <label class="form-label mb-0">Members who attended</label>
                  <span class="text-muted xsmall">{{ attendanceForm.attendeeIds.length }} selected</span>
                </div>
                <input v-model.trim="memberSearch" type="search" class="form-control mb-2"
                  placeholder="Search members" />
                <div class="member-checklist">
                  <label v-for="member in filteredMembers" :key="member.id" class="member-check-item">
                    <input type="checkbox" :value="member.id" v-model="attendanceForm.attendeeIds" />
                    <span>{{ member.firstname }} {{ member.lastname }}</span>
                  </label>
                  <p v-if="!filteredMembers.length" class="text-muted mb-0 px-1">No members match your search.</p>
                </div>
              </div>

              <div class="col-12">
                <label class="form-label">Session notes (optional)</label>
                <textarea v-model="attendanceForm.notes" class="form-control"
                  placeholder="Add any details about this session"></textarea>
              </div>

              <div class="col-12 d-flex flex-wrap gap-2 justify-content-end mt-3">
                <button type="button" class="btn btn-light px-4 py-2" @click="closeAddModal">Cancel</button>
                <CustomInputSubmitButton type="submit" :loading="isSaving" :disabled="!canSave"
                  className="btn-theme px-5 py-2">
                  {{ isSaving ? 'Saving...' : 'Save session' }}
                </CustomInputSubmitButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { subDays } from 'date-fns';
import { useMemberStore } from '~/stores/memberStore';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
});

interface AttendanceRecord {
  id: number;
  date: string;
  title: string;
  attendeeIds: number[];
  notes: string;
  createdAt: string;
}

const { members } = useMemberStore();
const { swalConfirm, swalSuccess } = sweetAlerts;

const attendanceRecords = ref<AttendanceRecord[]>([
  {
    id: 1,
    date: new Date().toISOString().slice(0, 10),
    title: 'Sunday worship service',
    attendeeIds: [1, 2, 3],
    notes: 'Main morning service with worship and teaching.',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    date: subDays(new Date(), 2).toISOString().slice(0, 10),
    title: 'Youth Bible study',
    attendeeIds: [2, 4],
    notes: 'Focused study for young adults.',
    createdAt: subDays(new Date(), 2).toISOString()
  },
  {
    id: 3,
    date: subDays(new Date(), 7).toISOString().slice(0, 10),
    title: 'Midweek prayer meeting',
    attendeeIds: [1, 3, 5],
    notes: 'Evening prayer and testimony time.',
    createdAt: subDays(new Date(), 7).toISOString()
  }
]);

const attendanceForm = reactive({
  date: new Date(),
  title: '',
  attendeeIds: [] as number[],
  notes: ''
});

const historyModalOpen = ref(false);
const selectedHistory = ref<AttendanceRecord | null>(null);

const addModalOpen = ref(false);
const memberSearch = ref('');
const isSaving = ref(false);

const filteredMembers = computed(() => {
  if (!memberSearch.value) return members.value;
  const search = memberSearch.value.toLowerCase();
  return members.value.filter((member) =>
    `${member.firstname} ${member.lastname}`.toLowerCase().includes(search)
  );
});

const sortedRecords = computed(() =>
  [...attendanceRecords.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
);

const canSave = computed(() => !!attendanceForm.date && attendanceForm.attendeeIds.length > 0);

const historyMembers = computed(() =>
  selectedHistory.value
    ? members.value.filter((member) => selectedHistory.value?.attendeeIds.includes(member.id))
    : []
);

function formatDate(value: Date | string) {
  const date = typeof value === 'string' ? new Date(value) : value;
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

function openAddModal() {
  resetForm();
  addModalOpen.value = true;
}

function closeAddModal() {
  addModalOpen.value = false;
}

function saveAttendance() {
  if (!canSave.value) return;

  isSaving.value = true;
  attendanceRecords.value.unshift({
    id: Date.now(),
    date: (attendanceForm.date instanceof Date ? attendanceForm.date : new Date(attendanceForm.date)).toISOString().slice(0, 10),
    title: attendanceForm.title.trim() || 'Attendance session',
    attendeeIds: [...attendanceForm.attendeeIds],
    notes: attendanceForm.notes.trim() || 'No notes provided.',
    createdAt: new Date().toISOString()
  });
  isSaving.value = false;
  closeAddModal();
  resetForm();
  swalSuccess('Session Saved', 'The attendance session has been recorded.', 'OK', 'success');
}

async function handleDeleteAttendance(record: AttendanceRecord) {
  const result = await swalConfirm(
    'Delete Session',
    `Are you sure you want to delete "${record.title}" on ${formatDate(record.date)}? This action cannot be undone.`,
    'Yes, Delete',
    'warning'
  );

  if (result.isConfirmed) {
    attendanceRecords.value = attendanceRecords.value.filter((r) => r.id !== record.id);
    if (selectedHistory.value?.id === record.id) {
      closeHistoryModal();
    }
    swalSuccess('Deleted!', 'Attendance session has been removed.', 'OK', 'success');
  }
}

function resetForm() {
  attendanceForm.date = new Date();
  attendanceForm.title = '';
  attendanceForm.attendeeIds = [];
  attendanceForm.notes = '';
  memberSearch.value = '';
}

function openHistory(record: AttendanceRecord) {
  selectedHistory.value = record;
  historyModalOpen.value = true;
}

function closeHistoryModal() {
  historyModalOpen.value = false;
  selectedHistory.value = null;
}
</script>

<style scoped>
.content-card {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
  min-height: 100vh;
}

.header-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.75rem;
}

.header-section h2 {
  font-size: 1.85rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.header-section p {
  color: #64748b;
  font-size: 1rem;
  margin: 0;
}

.session-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.session-card {
  position: relative;
  text-align: left;
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 18px;
  padding: 1.1rem 1.25rem;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}

.session-card:hover,
.session-card:focus-within {
  transform: translateY(-2px);
  border-color: rgba(37, 99, 235, 0.35);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  outline: none;
}

.session-card-main {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-right: 1.75rem;
  outline: none;
}

.session-delete-btn {
  position: absolute;
  top: 0.85rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: #94a3b8;
  transition: background 0.15s ease, color 0.15s ease;
}

.session-delete-btn:hover {
  background: rgba(220, 53, 69, 0.1);
  color: #dc3545;
}

.add-session-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 108px;
  background: rgba(37, 99, 235, 0.05);
  border: 1.5px dashed rgba(37, 99, 235, 0.35);
  color: #2563eb;
  font-weight: 600;
  font-size: 0.9rem;
}

.add-session-card i {
  font-size: 1.6rem;
}

.add-session-card:hover,
.add-session-card:focus-visible {
  background: rgba(37, 99, 235, 0.1);
  border-color: #2563eb;
  transform: translateY(-2px);
  outline: none;
}

.session-date {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
}

.session-title {
  font-size: 0.88rem;
  color: #64748b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.session-count {
  margin-top: 0.35rem;
  display: inline-flex;
  align-self: flex-start;
  background: rgba(37, 99, 235, 0.11);
  color: #1d4ed8;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.section-tag {
  display: inline-flex;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.11);
  color: #2563eb;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}


.btn-light {
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.25);
  font-weight: 600;
  color: #334155;
  border-radius: 14px;
}

.detail-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.42);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1.5rem;
  overflow-y: auto;
}

.detail-modal-card {
  width: min(720px, 100%);
  max-height: calc(100vh - 3rem);
  overflow-y: auto;
  background: white;
  border-radius: 24px;
  padding: 1.75rem;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.16);
}

.detail-modal-card h4 {
  margin-bottom: 0.35rem;
}

.detail-modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0 0.75rem;
}

.detail-modal-card p {
  color: #475569;
}

.modal-member-list {
  display: grid;
  gap: 0.65rem;
  margin-top: 1rem;
}

.modal-member-card {
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 16px;
  padding: 0.85rem 1rem;
  background: #f8fafc;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.member-checklist {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem;
  max-height: 260px;
  overflow-y: auto;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 14px;
  padding: 0.75rem;
  background: #f8fafc;
}

.member-check-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.6rem;
  border-radius: 10px;
  background: white;
  border: 1px solid rgba(148, 163, 184, 0.16);
  font-size: 0.9rem;
  color: #334155;
  cursor: pointer;
  margin: 0;
}

.member-check-item:has(input:checked) {
  border-color: rgba(37, 99, 235, 0.45);
  background: rgba(37, 99, 235, 0.08);
}

.member-check-item input {
  flex-shrink: 0;
  cursor: pointer;
}

.member-check-item span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 991px) {
  .detail-modal-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .content-card {
    padding: 1.25rem;
  }

  .header-section {
    flex-direction: column;
    align-items: stretch;
  }

  .session-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .member-checklist {
    grid-template-columns: 1fr;
    max-height: 220px;
  }

  .detail-modal-card {
    padding: 1.25rem;
    border-radius: 18px;
  }
}
</style>
