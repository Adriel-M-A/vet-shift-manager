import { contextBridge, ipcRenderer } from "electron";
import {
  APPOINTMENTS_CHANNELS,
  CreateAppointmentResponse,
  GetAppointmentsByDateRequest,
  GetAppointmentsByDateResponse,
  GetAppointmentsByPetRequest,
  GetAppointmentsByPetResponse
} from "../shared/ipc/appointments.ipc";

import {
  CLIENTS_CHANNELS,
  CreateClientResponse,
  FindClientByDocumentResponse,
  GetAllClientsResponse
} from "../shared/ipc/clients.ipc";

import {
  PETS_CHANNELS,
  CreatePetResponse,
  GetPetsByClientRequest,
  GetPetsByClientResponse
} from "../shared/ipc/pets.ipc";


import { CreateClientDTO, CreateAppointmentDTO, CreatePetDTO } from "@types";

const api = {
  appointments: {
    create(data: CreateAppointmentDTO): Promise<CreateAppointmentResponse> {
      return ipcRenderer.invoke(APPOINTMENTS_CHANNELS.CREATE, { data });
    },

    getByDate(
      data: GetAppointmentsByDateRequest
    ): Promise<GetAppointmentsByDateResponse> {
      return ipcRenderer.invoke(APPOINTMENTS_CHANNELS.GET_BY_DATE, data);
    },

    getByPet(
      data: GetAppointmentsByPetRequest
    ): Promise<GetAppointmentsByPetResponse> {
      return ipcRenderer.invoke(APPOINTMENTS_CHANNELS.GET_BY_PET, data);
    }
  },
  clients: {
    create(
      data: CreateClientDTO
    ): Promise<CreateClientResponse> {
      return ipcRenderer.invoke(CLIENTS_CHANNELS.CREATE, { data });
    },

    findByDocument(
      documentNumber: string
    ): Promise<FindClientByDocumentResponse> {
      return ipcRenderer.invoke(CLIENTS_CHANNELS.FIND_BY_DOCUMENT, { documentNumber });
    },

    getAll(): Promise<GetAllClientsResponse> {
      return ipcRenderer.invoke(CLIENTS_CHANNELS.GET_ALL);
    }
  },

  pets: {
    create(
      data: CreatePetDTO
    ): Promise<CreatePetResponse> {
      return ipcRenderer.invoke(PETS_CHANNELS.CREATE, { data });
    },

    getByClient(
      data: GetPetsByClientRequest
    ): Promise<GetPetsByClientResponse> {
      return ipcRenderer.invoke(PETS_CHANNELS.GET_BY_CLIENT, data);
    },

    update(
      id: number,
      data: Partial<CreatePetDTO>
    ): Promise<{ success: boolean }> {
      return ipcRenderer.invoke(PETS_CHANNELS.UPDATE, { id, data });
    }
  }

};

contextBridge.exposeInMainWorld("api", api);
