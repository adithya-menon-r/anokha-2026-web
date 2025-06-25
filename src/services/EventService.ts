import { apiGet } from '@/lib/api';
import { Event, EventDetails } from '@/types/eventTypes';

export const EventService = {
  getAll: (): Promise<Event[]> => {
    return apiGet<Event[]>('/events');
  },
  getById: (id: string): Promise<EventDetails> => {
    return apiGet<EventDetails>(`/events/${id}`);
  },
};
