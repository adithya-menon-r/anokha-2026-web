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
    eventId: 'evt-1',
    eventImageURL:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    eventName: 'Cyber Security Workshop',
    eventStatus: 'Open',
    eventDescription: 'Learn the basics of ethical hacking.',
    shortEventDescription: 'Ethical hacking workshop',
    eventDate: '2025-02-15',
    eventTime: '09:00:00',
    isGroup: false,
    isWorkshop: true,
    isTechnical: true,
    tags: [{ tagName: 'Technical' }, { tagName: 'Workshop' }],
    eventPrice: 499,
    isRegistered: true,
    isStarred: true,
    maxSeats: 60,
    seatsFilled: 45,
  },
  {
    eventId: 'evt-2',
    eventImageURL:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    eventName: 'Coding Contest',
    eventStatus: 'Open',
    eventDescription: 'Competitive programming contest.',
    shortEventDescription: 'Competitive programming',
    eventDate: '2025-02-16',
    eventTime: '10:00:00',
    isGroup: false,
    isWorkshop: false,
    isTechnical: true,
    tags: [{ tagName: 'Technical' }, { tagName: 'Contest' }],
    eventPrice: 0,
    isRegistered: true,
    isStarred: false,
    maxSeats: 100,
    seatsFilled: 80,
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
