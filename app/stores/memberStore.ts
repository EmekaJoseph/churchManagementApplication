
export interface Member {
  id: number
  surname: string
  firstname: string
  lastname: string
  phone: string
  email: string
  house_address: string
  birthday: Date | string
  gender_id: number | string
  gender?: string
  position_id: number | string
  membership_date: Date | string
}

const state = reactive({
  members: [
    { id: 1, surname: 'Smith', firstname: 'John', lastname: 'Doe', phone: '08012345678', email: 'john@example.com', house_address: '123 Church Street, Lagos', birthday: '05/85', gender_id: 1, gender: 'Male', position_id: 1, membership_date: '2020-01-15' },
    { id: 2, surname: 'Johnson', firstname: 'Faith', lastname: 'Adebayo', phone: '08023456789', email: 'faith@example.com', house_address: '45 Grace Av, Abuja', birthday: '09/92', gender_id: 2, gender: 'Female', position_id: 2, membership_date: '2019-05-20' },
    { id: 3, surname: 'Williams', firstname: 'David', lastname: 'Okonkwo', phone: '08034567890', email: 'david@example.com', house_address: '76 Faith Rd, Enugu', birthday: '11/78', gender_id: 1, gender: 'Male', position_id: 3, membership_date: '2015-10-10' },
    { id: 4, surname: 'Brown', firstname: 'Mary', lastname: 'Ibrahim', phone: '08045678901', email: 'mary@example.com', house_address: '12 Glory Ln, Ibadan', birthday: '02/88', gender_id: 2, gender: 'Female', position_id: 1, membership_date: '2021-03-05' },
    { id: 5, surname: 'Jones', firstname: 'Isaac', lastname: 'Musa', phone: '08056789012', email: 'isaac@example.com', house_address: '89 Peace Blvd, Kano', birthday: '07/80', gender_id: 1, gender: 'Male', position_id: 4, membership_date: '2018-07-25' },
  ] as Member[]
})

const modal = reactive({
  isOpen: false,
  mode: 'add' as 'add' | 'edit',
  currentMember: null as Member | null
})

const viewModal = reactive({
  isOpen: false,
  currentMember: null as Member | null
})

const genderOptions = ref([
  { id: 1, label: 'Male' },
  { id: 2, label: 'Female' },
])

const positionOptions = ref([
  { id: 1, label: 'Member' },
  { id: 2, label: 'Worker' },
  { id: 3, label: 'Usher' },
  { id: 4, label: 'Sunday School Teacher' },
])



export const useMemberStore = () => {
  return {
    members: computed(() => state.members),
    genderOptions: computed(() => genderOptions.value),
    positionOptions: computed(() => positionOptions.value),
    viewModal,
    modal,
    addMember(member: Omit<Member, 'id'>) {
      const newMember: Member = { id: Date.now(), ...member }
      state.members.unshift(newMember)
    },
    updateMember(updatedMember: Member) {
      const index = state.members.findIndex(m => m.id === updatedMember.id)
      if (index !== -1) {
        state.members[index] = { ...updatedMember }
      }
    },
    deleteMember(id: number) {
      state.members = state.members.filter(m => m.id !== id)
    },
    openModal(mode: 'add' | 'edit', member: Member | null = null) {
      modal.mode = mode
      modal.currentMember = member ? { ...member } : null
      modal.isOpen = true
    },
    closeModal() {
      modal.isOpen = false
      // Don't reset currentMember immediately to avoid flash during transition
      setTimeout(() => {
        if (!modal.isOpen) modal.currentMember = null
      }, 300)
    }
  }
}
