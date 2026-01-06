import { ipcMain } from "electron";
import {
  APPOINTMENTS_CHANNELS,
  CreateAppointmentRequest,
  GetAppointmentsByDateRequest,
  GetAppointmentsByPetRequest
} from "../../shared/ipc/appointments.ipc";
import appointmentRepository from "../db/repositories/appointment.repository";

export function registerAppointmentHandlers() {

  ipcMain.handle(
    APPOINTMENTS_CHANNELS.CREATE,
    (_, request: CreateAppointmentRequest) => {
      const result = appointmentRepository.createAppointment(request.data);
      return { appointmentId: result.lastInsertRowid };
    }
  );

  ipcMain.handle(
    APPOINTMENTS_CHANNELS.GET_BY_DATE,
    (_, request: GetAppointmentsByDateRequest) => {
      const items = appointmentRepository.getAppointmentsByDate(request.date);
      return { items };
    }
  );

  ipcMain.handle(
    APPOINTMENTS_CHANNELS.GET_BY_PET,
    (_, request: GetAppointmentsByPetRequest) => {
      const items = appointmentRepository.getAppointmentsByPet(request.petId);
      return { items };
    }
  );
}
