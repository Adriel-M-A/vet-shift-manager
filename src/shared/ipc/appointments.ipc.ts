import { Appointment, CreateAppointmentDTO } from "@types";

export const APPOINTMENTS_CHANNELS = {
  CREATE: "appointments:create",
  GET_BY_DATE: "appointments:get-by-date",
  GET_BY_PET: "appointments:get-by-pet"
} as const;

/* Requests / Responses */

export interface CreateAppointmentRequest {
  data: CreateAppointmentDTO;
}

export interface CreateAppointmentResponse {
  appointmentId: number;
}

export interface GetAppointmentsByDateRequest {
  date: string;
}

export interface GetAppointmentsByDateResponse {
  items: Appointment[];
}

export interface GetAppointmentsByPetRequest {
  petId: number;
}

export interface GetAppointmentsByPetResponse {
  items: Appointment[];
}
