import { ErrorBlock } from '@/components/ErrorBlock';
import { RegisteredEventList } from '@/components/events/RegisteredEvents';
import { RegisteredEventListSkeleton } from '@/components/events/RegisteredEventsSkeleton';
import { useRegisteredEvents } from '@/hooks/useRegisteredEvents';
import { Event } from '@/types/eventTypes';

// export const mockEvents: Event[] = [
//   {
//     eventId: 'evt001',
//     eventImageURL: '/images/biome.jpg',
//     eventName: 'AI & ML Bootcamp',
//     eventStatus: 'upcoming',
//     eventDescription: 'A hands-on workshop on Artificial Intelligence and Machine Learning.',
//     eventDate: '2025-08-10',
//     eventTime: '10:00 AM',
//     isGroup: false,
//     isWorkshop: true,
//     isTechnical: true,
//     tags: [{ tagName: 'AI' }, { tagName: 'Workshop' }],
//     eventPrice: 499,
//     isRegistered: false,
//     isStarred: true,
//     maxSeats: 50,
//     seatsFilled: 30,
//   },
//   {
//     eventId: 'evt002',
//     eventImageURL: '/images/amrita-logo.webp',
//     eventName: 'Startup Pitch Fest',
//     eventStatus: 'open',
//     eventDescription: 'Pitch your startup idea to a panel of investors.',
//     eventDate: '2025-08-15',
//     eventTime: '2:00 PM',
//     isGroup: true,
//     isWorkshop: false,
//     isTechnical: false,
//     tags: [{ tagName: 'Business' }, { tagName: 'Entrepreneurship' }],
//     eventPrice: 0,
//     isRegistered: true,
//     isStarred: false,
//     maxSeats: 100,
//     seatsFilled: 100,
//   },
//   {
//     eventId: 'evt003',
//     eventImageURL: '/images/amrita-logo.webp',
//     eventName: 'Hackathon 2025',
//     eventStatus: 'closed',
//     eventDescription: '48-hour coding challenge for developers of all levels.',
//     eventDate: '2025-09-01',
//     eventTime: '9:00 AM',
//     isGroup: true,
//     isWorkshop: false,
//     isTechnical: true,
//     tags: [{ tagName: 'Coding' }, { tagName: 'Hackathon' }],
//     eventPrice: 199,
//     isRegistered: false,
//     isStarred: false,
//     maxSeats: 200,
//     seatsFilled: 180,
//   },
//     {
//     eventId: 'evt004',
//     eventImageURL: '/images/amrita-logo.webp',
//     eventName: 'Hackathon 2025',
//     eventStatus: 'closed',
//     eventDescription: '48-hour coding challenge for developers of all levels.',
//     eventDate: '2025-09-01',
//     eventTime: '9:00 AM',
//     isGroup: true,
//     isWorkshop: false,
//     isTechnical: true,
//     tags: [{ tagName: 'Coding' }, { tagName: 'Hackathon' }],
//     eventPrice: 199,
//     isRegistered: false,
//     isStarred: false,
//     maxSeats: 200,
//     seatsFilled: 180,
//   },
//     {
//     eventId: 'evt005',
//     eventImageURL: '/images/amrita-logo.webp',
//     eventName: 'Hackathon 2025',
//     eventStatus: 'closed',
//     eventDescription: '48-hour coding challenge for developers of all levels.',
//     eventDate: '2025-09-01',
//     eventTime: '9:00 AM',
//     isGroup: true,
//     isWorkshop: false,
//     isTechnical: true,
//     tags: [{ tagName: 'Coding' }, { tagName: 'Hackathon' }],
//     eventPrice: 199,
//     isRegistered: false,
//     isStarred: false,
//     maxSeats: 200,
//     seatsFilled: 180,
//   },
// ];

export default function RegisteredEvents() {
  const { data, isLoading, error } = useRegisteredEvents();

  if (isLoading) {
    return <RegisteredEventListSkeleton />;
  }

  if (error) {
    return (
      <ErrorBlock
        title="Unable to load Registered Events"
        message="Please try again later"
      />
    );
  }

  if (!data) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <p className="text-gray-500 text-center">No data found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <RegisteredEventList listOfEvents={data} />
    </div>
  );
}
