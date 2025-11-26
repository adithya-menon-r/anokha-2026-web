import { EventDetails } from './eventTypes';

export interface EventDetailProps {
  event: EventDetails;
  onStarToggle?: () => void;
  onRegister?: () => void;
  onFeedback?: () => void;
  isStarLoading?: boolean;
  isRegisterLoading?: boolean;
  isLoggedIn?: boolean;
}

export interface EventOrganisersProps {
  event: EventDetails;
}
