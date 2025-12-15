// Types for events

// Backend API response types
export interface Organizer {
  organizer_name: string;
  org_abbreviation: string;
  org_type: string;
}

export interface Schedule {
  event_date: string;
  start_time: string;
  end_time: string;
  venue: string;
  schedule_id?: string;
}

// Legacy Event type (for events list - may need update)
export interface Event {
  event_id: string;
  event_image_url: string;
  event_name: string;
  event_status: string;
  event_description: string;
  //shortEventDescription: string; // need to discuss
  event_date: string;
  // eventTime: string; // need to discuss
  is_group: boolean;
  tags: string[];
  event_type: string;
  is_technical: boolean;
  event_price: number;
  is_registered: boolean;
  isStarred: boolean;
  is_full: boolean;
}

// EventDetails - matches backend getEventById resposnse
export interface EventDetails {
  id: string;
  event_name: string;
  blurb: string;
  event_description: string;
  cover_image_url: string;
  price: number;
  is_per_head: boolean;
  rules: string;
  event_type: string;
  is_technical: boolean;
  is_group: boolean;
  max_teamsize: number;
  min_teamsize: number;
  is_full: boolean;
  event_status: string;
  event_mode: string;

  // User-specific data
  is_registered: boolean;
  isStarred: boolean;
  registrationId?: string;

  // JSON arrays
  organizers: Organizer[];
  schedules: Schedule[];
  tags: string[];
}

export type BackendEvent = Omit<Event, 'isStarred'> & { is_starred: boolean };

export type BackendEventDetails = Omit<EventDetails, 'isStarred'> & {
  is_starred: boolean;
};
