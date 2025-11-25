import { apiGet } from '@/lib/api';
import type {
  Event,
  EventDetails,
  Organizer,
  Schedule,
  Tag,
} from '@/types/eventTypes';

// Helper function to decode base64 fields from backend
function decodeBase64Field<T>(encodedString: string | T[]): T[] {
  // If it's already an array, return it as-is (backwards compatibility)
  if (Array.isArray(encodedString)) {
    return encodedString;
  }

  // If it's a string, decode it
  if (typeof encodedString === 'string' && encodedString.length > 0) {
    try {
      const decodedString = atob(encodedString);
      return JSON.parse(decodedString) as T[];
    } catch (error) {
      console.error('Failed to decode base64 field:', error);
      return [];
    }
  }

  return [];
}

export const EventService = {
  getAll: (): Promise<Event[]> => {
    return apiGet<Event[]>('/events');
  },

  getById: async (id: string): Promise<EventDetails> => {
    const response = await apiGet<any>(`/events/${id}`);

    // Handle response structure - backend might wrap in "event" key
    const rawEvent = response.event || response;

    // Decode base64 fields if they exist
    const eventDetails: EventDetails = {
      ...rawEvent,
      organizers: rawEvent.organizers
        ? decodeBase64Field<Organizer>(rawEvent.organizers)
        : [],
      schedules: rawEvent.schedules
        ? decodeBase64Field<Schedule>(rawEvent.schedules)
        : [],
      tags: rawEvent.tags ? decodeBase64Field<Tag>(rawEvent.tags) : [],
      // Set defaults for user-specific fields if not present
      isRegistered: rawEvent.isRegistered || false,
      isStarred: rawEvent.isStarred || false,
      registrationId: rawEvent.registrationId || undefined,
    };

    return eventDetails;
  },

  getRegisteredEvents: (): Promise<Event[]> => apiGet('/registeredEvents'),
};
