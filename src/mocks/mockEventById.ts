import { EventDetails } from '@/types/eventTypes';

export const MOCK_EVENT_DETAILS: EventDetails = {
  id: 'evt-123456',
  event_name: 'Cyber Security Workshop',
  blurb:
    'Learn the basics of ethical hacking and network security in this hands-on workshop.',
  event_description: `
Join us for an immersive journey into the world of **Cyber Security**. This workshop is designed for beginners and enthusiasts who want to understand the fundamentals of securing digital assets.

## What you will learn:
- **Network Security**: Understanding protocols and vulnerabilities.
- **Ethical Hacking**: Basic penetration testing techniques.
- **Cryptography**: How data is encrypted and decrypted.
- **Web Security**: Common vulnerabilities like SQL Injection and XSS.

## Prerequisites:
- Basic knowledge of computer networks.
- A laptop with Kali Linux installed (VM is fine).

Don't miss this opportunity to learn from industry experts!
  `,
  cover_image_url:
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
  price: 499,
  is_per_head: true,
  rules: `
1. Participants must bring their own laptops.
2. Any malicious activity on the venue network is strictly prohibited.
3. Certificates will be provided upon completion.
4. Attendance for the full duration is mandatory for certification.
  `,
  event_type: 'Workshop',
  is_group: false,
  max_teamsize: 1,
  min_teamsize: 1,
  total_seats: 60,
  seats_filled: 45,
  event_status: 'Open',
  event_mode: 'Offline',
  isRegistered: true,
  isStarred: true,
  organizers: [
    {
      organizer_name: 'Department of Computer Science',
      org_abbreviation: 'CSE',
      org_type: 'Department',
    },
    {
      organizer_name: 'Cyber Security Club',
      org_abbreviation: 'CSC',
      org_type: 'Club',
    },
  ],
  schedules: [
    {
      event_date: '2025-02-15',
      start_time: '09:00:00',
      end_time: '16:00:00',
      venue: 'Main Auditorium, Block A',
    },
  ],
  tags: [
    {
      tag_name: 'Technical',
      tag_abbreviation: 'TECH',
    },
    {
      tag_name: 'Workshop',
      tag_abbreviation: 'WS',
    },
    {
      tag_name: 'Cyber Security',
      tag_abbreviation: 'SEC',
    },
  ],
};

export const getMockEventById = async (id: string): Promise<EventDetails> => {
  console.log('[MOCK] Fetching event details for ID:', id);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { ...MOCK_EVENT_DETAILS, id };
};
