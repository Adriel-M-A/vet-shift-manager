import { registerAppointmentHandlers } from "./appointments.handlers";
import { registerClientHandlers } from "./clients.handlers";
import { registerPetHandlers } from "./pets.handlers";

export function registerIpcHandlers() {
  registerAppointmentHandlers();
  registerClientHandlers();
  registerPetHandlers();
}
