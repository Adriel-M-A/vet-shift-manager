import { AppointmentStatus } from "../enums/appointment-status";

export interface Appointment {
  id: number;
  client_id: number;
  pet_id: number;
  date: string;        // YYYY-MM-DD
  start_time: string; // HH:mm
  estimated_duration_minutes?: number;
  status: AppointmentStatus;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

export type CreateAppointmentDTO = Omit<
  Appointment,
  "id" | "created_at" | "updated_at"
>;
