import { apiGet } from '@/lib/api';
import type { Event, EventDetails } from '@/types/eventTypes';

export const EventService = {
  getAll: (): Promise<Event[]> => {
    return apiGet<Event[]>('/events');
  },
  getById: (id: string): Promise<EventDetails> => {
    return apiGet<EventDetails>(`/events/${id}`);
  },

  getRegisteredEvents: (): Promise<Event[]> => apiGet('/registeredEvents'),
};
