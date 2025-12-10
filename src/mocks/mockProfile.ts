import { Profile } from '@/types/profileTypes';
import { Ticket } from '@/types/ticketTypes';
import { Transaction } from '@/types/transactionTypes';

export const mockProfile: Profile = {
  name: 'John Doe',
  email: 'john@example.com',
  phone_number: '9876543210',
  is_amrita_student: true,
  amrita_roll_number: 'CB.SC.U4CSEXXXXX',
  college_name: 'Amrita Vishwa Vidyapeetham',
  college_city: 'Coimbatore',
};

export const mockRegisteredEvents: Ticket[] = [
  {
    event_id: 'evt-1',
    event_name: 'Cyber Security Workshop',
    schedules: [
      {
        schedule_id: 'sch-1',
        event_date: '2025-02-15',
        start_time: '09:00:00',
        end_time: '16:00:00',
        venue: 'Main Auditorium, Block A',
      },
    ],
    is_group: false,
    price: 499,
    event_type: 'Workshop',
    is_technical: true,
    event_mode: 'Offline',
  },
];

export const mockTransactions: Transaction[] = [
  {
    txn_id: 'txn_1234567890',
    created_at: '2025-01-20T10:30:00Z',
    registration_fee: 499,
    txn_status: 'SUCCESS',
    event_name: '',
    id: '',
  },
  {
    txn_id: 'txn_0987654321',
    created_at: '2025-01-22T14:15:00Z',
    registration_fee: 150,
    txn_status: 'PENDING',
    event_name: '',
    id: '',
  },
  {
    txn_id: 'txn_1122334455',
    created_at: '2025-01-18T09:00:00Z',
    registration_fee: 200,
    txn_status: 'FAILED',
    event_name: '',
    id: '',
  },
];

export const getMockProfile = async (): Promise<Profile> => {
  console.log('[MOCK] Fetching profile details');
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProfile;
};

export const getMockRegisteredEvents = async (): Promise<Ticket[]> => {
  console.log('[MOCK] Fetching registered events');
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockRegisteredEvents;
};

export const getMockTransactions = async (): Promise<Transaction[]> => {
  console.log('[MOCK] Fetching transactions');
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockTransactions;
};
