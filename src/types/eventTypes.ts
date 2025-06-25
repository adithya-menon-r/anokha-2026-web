// Types for events

export interface Event {
  eventId: string;
  eventImageURL: string;
  eventName: string;
  eventStatus: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  isGroup: boolean;
  tags: { tagName: string }[];
  eventPrice: number;
  isRegistered: boolean;
  isStarred: boolean;
  maxSeats: number;
  seatsFilled: number;
}

export interface EventDetails {
  eventId: string;
  eventName: string;
  eventImageURL: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  eventPrice: string;

  isGroup: boolean | string;
  isWorkshop: boolean | string;
  isTechnical: boolean | string;

  eventStatus: string;
  isRegistered: boolean | string;
  isStarred: boolean | string;
  seatsFilled: number;
  maxSeats: number;
  minTeamSize: number;
  registrationId?: string;

  mode?: string;
  tags: { tagName: string }[];
}
