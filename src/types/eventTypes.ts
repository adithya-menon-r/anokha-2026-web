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
}

export interface Tag {
  tag_name: string;
  tag_abbreviation: string;
}

// Legacy Event type (for events list - may need update)
export interface Event {
  eventId: string;
  eventImageURL: string;
  eventName: string;
  eventStatus: string;
  eventDescription: string;
  shortEventDescription: string;
  eventDate: string;
  eventTime: string;
  isGroup: boolean;
  isWorkshop: boolean;
  isTechnical: boolean;
  tags: { tagName: string }[];
  eventPrice: number;
  isRegistered: boolean;
  isStarred: boolean;
  maxSeats: number;
  seatsFilled: number;
}

// EventDetails - matches backend getEventById response
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
  is_group: boolean;
  max_teamsize: number;
  min_teamsize: number;
  total_seats: number;
  seats_filled: number;
  event_status: string;
  event_mode: string;

  // User-specific data
  isRegistered: boolean;
  isStarred: boolean;
  registrationId?: string;

  // JSON arrays
  organizers: Organizer[];
  schedules: Schedule[];
  tags: Tag[];
}
