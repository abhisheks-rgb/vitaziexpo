export interface AppointmentDTO {
  appointment_id: string;
  user_id: string;
  doctor: {
    name: string;
    specialty: string;
    avatar_url: string;
  };
  date_time: string;
  location_name: string;
  location_address: string;
  appointment_type: string;
  days_away: number;
  is_confirmed: boolean;
}
