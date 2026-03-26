import { reactive, computed } from 'vue'

export interface Member {
  id: number
  surname: string
  firstname: string
  lastname: string
  phone: string
  email: string
  house_address: string
  birthday: string
  gender: 'Male' | 'Female'
  position: string
  membership_date: string
}

const state = reactive({
  members: [
    { id: 1, surname: 'Smith', firstname: 'John', lastname: 'Doe', phone: '08012345678', email: 'john@example.com', house_address: '123 Church Street, Lagos', birthday: '05/85', gender: 'Male', position: 'Member', membership_date: '2020-01-15' },
    { id: 2, surname: 'Johnson', firstname: 'Faith', lastname: 'Adebayo', phone: '08023456789', email: 'faith@example.com', house_address: '45 Grace Av, Abuja', birthday: '09/92', gender: 'Female', position: 'Choir Leader', membership_date: '2019-05-20' },
    { id: 3, surname: 'Williams', firstname: 'David', lastname: 'Okonkwo', phone: '08034567890', email: 'david@example.com', house_address: '76 Faith Rd, Enugu', birthday: '11/78', gender: 'Male', position: 'Elder', membership_date: '2015-10-10' },
    { id: 4, surname: 'Brown', firstname: 'Mary', lastname: 'Ibrahim', phone: '08045678901', email: 'mary@example.com', house_address: '12 Glory Ln, Ibadan', birthday: '02/88', gender: 'Female', position: 'Member', membership_date: '2021-03-05' },
    { id: 5, surname: 'Jones', firstname: 'Isaac', lastname: 'Musa', phone: '08056789012', email: 'isaac@example.com', house_address: '89 Peace Blvd, Kano', birthday: '07/80', gender: 'Male', position: 'Deacon', membership_date: '2018-08-12' },
    // Generating more mock data...
    ...Array.from({ length: 45 }, (_, i) => ({
      id: i + 6,
      surname: ['Adams', 'Baker', 'Clark', 'Davis', 'Evans', 'Ford', 'Garcia', 'Hill', 'Irvin', 'King'][Math.floor(Math.random() * 10)],
      firstname: ['Samuel', 'Esther', 'Peter', 'Ruth', 'Joseph', 'Sarah', 'Paul', 'Lydia', 'James', 'Deborah'][Math.floor(Math.random() * 10)],
      lastname: ['Adeyemi', 'Okeke', 'Tukur', 'Effiong', 'Balogun', 'Nwachukwu', 'Danjuma', 'Bello', 'Eze', 'Ojo'][Math.floor(Math.random() * 10)],
      phone: `080${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}`,
      email: `${['samuel', 'esther', 'peter', 'ruth', 'joseph'][Math.floor(Math.random() * 5)]}${i+6}@church.org`,
      house_address: `${Math.floor(Math.random() * 100)} Gospel Road, City ${Math.floor(Math.random() * 10)}`,
      birthday: `${(Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0')}/${Math.floor(Math.random() * 30 + 70)}`,
      gender: Math.random() > 0.5 ? 'Male' : 'Female' as any,
      position: ['Member', 'Worker', 'Usher', 'Sunday School Teacher'][Math.floor(Math.random() * 4)],
      membership_date: `202${Math.floor(Math.random() * 5)}-${(Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0')}-01`
    }))
  ] as Member[]
})

export const useMemberStore = () => {
  return {
    members: computed(() => state.members)
  }
}
