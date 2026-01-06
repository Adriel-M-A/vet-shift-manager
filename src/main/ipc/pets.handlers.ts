import { ipcMain } from "electron";
import {
  PETS_CHANNELS,
  CreatePetRequest,
  GetPetsByClientRequest
} from "../../shared/ipc/pets.ipc";
import petRepository from "../db/repositories/pet.repository";

export function registerPetHandlers() {

  ipcMain.handle(
    PETS_CHANNELS.CREATE,
    (_, request: CreatePetRequest) => {
      const result = petRepository.createPet(request.data);
      return { petId: result.lastInsertRowid };
    }
  );

  ipcMain.handle(
    PETS_CHANNELS.GET_BY_CLIENT,
    (_, request: GetPetsByClientRequest) => {
      const items = petRepository.getPetsByClient(request.clientId);
      return { items };
    }
  );
}
