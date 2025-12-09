export interface BookingResponse {
  message: string;
  booking_id?: string;
  // Payment data returned from book endpoint
  hash?: string;
  name?: string;
  phone?: string;
  productInfo?: string;
  registrationFee?: number;
  txnId?: string;
  userEmail?: string;
}

export interface TeamMember {
  student_email: string;
  student_role?: string;
}

export interface GroupBookingPayload {
  team_name: string;
  team_members: TeamMember[];
}

export interface IndividualBookingPayload {
  // Empty or no body required for individual bookings
}
