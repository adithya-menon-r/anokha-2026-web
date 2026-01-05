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
  is_registered: true,
};

export const mockRegisteredEvents: Ticket[] = [
  {
    event_id: '01cd53c9-bc71-42d6-83d3-4e4ac485b7dd',
    event_name: 'Winter of Code 2.0',
    schedules: [
      {
        schedule_id: 'sch-1',
        event_date: '2025-12-12',
        start_time: '09:00:00',
        end_time: '16:00:00',
        venue: 'Main Auditorium, Block A',
      },
      {
        schedule_id: 'sch-2',
        event_date: '2025-12-10',
        start_time: '08:00:00',
        end_time: '14:00:00',
        venue: 'Main Auditorium, Block B',
      },
    ],
    is_group: false,
    // team_name: 'The ANOKHA WINNERS',
    price: 100,
    event_type: 'Event',
    is_technical: true,
    event_mode: 'ONLINE',
    tags: [],
  },
  {
    event_id: '01cd53c9-bc71-53a1-83d3-4e4ac485b7dd',
    event_name: 'Cyber Security Workshop',
    schedules: [
      {
        schedule_id: 'sch-1',
        event_date: '2025-12-10',
        start_time: '09:00:00',
        end_time: '16:00:00',
        venue: 'Main Auditorium, Block A',
      },
      {
        schedule_id: 'sch-2',
        event_date: '2025-12-09',
        start_time: '08:00:00',
        end_time: '14:00:00',
        venue: 'Main Auditorium, Block B',
      },
    ],
    is_group: true,
    team_name: 'The ANOKHA WINNERS',
    price: 1250,
    event_type: 'Workshop',
    is_technical: true,
    event_mode: 'OFFLINE',
    tags: [],
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
