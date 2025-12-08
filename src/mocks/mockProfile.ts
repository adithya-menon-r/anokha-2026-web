import { Event } from '@/types/eventTypes';
import { Profile } from '@/types/profileTypes';
import { Transaction } from '@/types/transactionTypes';

export const mockProfile: Profile = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '9876543210',
  collegeName: 'Amrita Vishwa Vidyapeetham',
  collegeCity: 'Coimbatore',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
};

export const mockRegisteredEvents: Event[] = [
  {
    event_id: 'evt-1',
    event_image_url:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    event_name: 'Cyber Security Workshop',
    event_status: 'Open',
    event_description: 'Learn the basics of ethical hacking.',
    // shortEventDescription: 'Ethical hacking workshop',
    event_date: '2025-02-15',
    // event_time: '09:00:00',
    is_group: false,
    // isWorkshop: true,
    // isTechnical: true,
    tags: ['Technical', 'Workshop'],
    event_price: 499,
    is_registered: true,
    isStarred: true,
    max_seats: 60,
    seats_filled: 45,
    event_type: 'Workhop',
    is_technical: true,
  },
  {
    event_id: 'evt-2',
    event_image_url:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    event_name: 'Coding Contest',
    event_status: 'Open',
    event_description: 'Competitive programming contest.',
    // shortEventDescription: 'Competitive programming',
    event_date: '2025-02-16',
    // eventTime: '10:00:00',
    is_group: false,
    // is_workshop: false,
    // isTechnical: true,
    tags: ['Technical', 'Contest'],
    event_price: 0,
    is_registered: true,
    isStarred: false,
    max_seats: 100,
    seats_filled: 80,
    event_type: 'Event',
    is_technical: true,
  },
];

export const mockTransactions: Transaction[] = [
  {
    ID: 'txn_1234567890',
    dateTime: '2025-01-20T10:30:00Z',
    amount: 499,
    statusBadge: 'success',
  },
  {
    ID: 'txn_0987654321',
    dateTime: '2025-01-22T14:15:00Z',
    amount: 150,
    statusBadge: 'pending',
  },
  {
    ID: 'txn_1122334455',
    dateTime: '2025-01-18T09:00:00Z',
    amount: 200,
    statusBadge: 'failed',
  },
];

export const getMockProfile = async (): Promise<Profile> => {
  console.log('[MOCK] Fetching profile details');
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProfile;
};

export const getMockRegisteredEvents = async (): Promise<Event[]> => {
  console.log('[MOCK] Fetching registered events');
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockRegisteredEvents;
};

export const getMockTransactions = async (): Promise<Transaction[]> => {
  console.log('[MOCK] Fetching transactions');
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockTransactions;
};
