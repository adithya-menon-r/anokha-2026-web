import { Schedule } from './eventTypes';

export interface Ticket {
  event_id: string;
  event_name: string;
  schedules: Schedule[];
  is_group: boolean;
  team_name?: string;
  price: number;
  event_type: string;
  is_technical: boolean;
  event_mode: string;
}

export interface TicketListProps {
  listOftickets: Ticket[];
  userEmail: string;
}

export interface TicketProps {
  ticket: Ticket;
  userEmail: string;
}
