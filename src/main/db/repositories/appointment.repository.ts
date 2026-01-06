import { run, all } from "../helpers";
import { Appointment, CreateAppointmentDTO } from "@types";

function createAppointment(data: CreateAppointmentDTO) {
  return run(
    `
    INSERT INTO appointments
    (client_id, pet_id, date, start_time, estimated_duration_minutes, status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.client_id,
      data.pet_id,
      data.date,
      data.start_time,
      data.estimated_duration_minutes,
      data.status,
      data.notes
    ]
  );
}

function getAppointmentsByDate(date: string) {
  return all<Appointment>(
    `
    SELECT *
    FROM appointments
    WHERE date = ?
    ORDER BY start_time
    `,
    [date]
  );
}

function getAppointmentsByPet(petId: number) {
  return all<Appointment>(
    `
    SELECT *
    FROM appointments
    WHERE pet_id = ?
    ORDER BY date DESC
    `,
    [petId]
  );
}

export default {
  createAppointment,
  getAppointmentsByDate,
  getAppointmentsByPet
};
