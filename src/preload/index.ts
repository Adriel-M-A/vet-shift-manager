import { contextBridge, ipcRenderer } from "electron";
import {
  APPOINTMENTS_CHANNELS,
  CreateAppointmentRequest,
  CreateAppointmentResponse,
  GetAppointmentsByDateRequest,
  GetAppointmentsByDateResponse,
  GetAppointmentsByPetRequest,
  GetAppointmentsByPetResponse
} from "../shared/ipc/appointments.ipc";

import {
  CLIENTS_CHANNELS,
  CreateClientRequest,
  CreateClientResponse,
  FindClientByDocumentRequest,
  FindClientByDocumentResponse,
  GetAllClientsResponse
} from "../shared/ipc/clients.ipc";

import {
  PETS_CHANNELS,
  CreatePetRequest,
  CreatePetResponse,
  GetPetsByClientRequest,
  GetPetsByClientResponse
} from "../shared/ipc/pets.ipc";


const api = {
  appointments: {
    create(data: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
      return ipcRenderer.invoke(APPOINTMENTS_CHANNELS.CREATE, data);
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
    data: CreateClientRequest
  ): Promise<CreateClientResponse> {
    return ipcRenderer.invoke(CLIENTS_CHANNELS.CREATE, data);
  },

  findByDocument(
    data: FindClientByDocumentRequest
  ): Promise<FindClientByDocumentResponse> {
    return ipcRenderer.invoke(CLIENTS_CHANNELS.FIND_BY_DOCUMENT, data);
  },

  getAll(): Promise<GetAllClientsResponse> {
    return ipcRenderer.invoke(CLIENTS_CHANNELS.GET_ALL);
  }
},

pets: {
  create(
    data: CreatePetRequest
  ): Promise<CreatePetResponse> {
    return ipcRenderer.invoke(PETS_CHANNELS.CREATE, data);
  },

  getByClient(
    data: GetPetsByClientRequest
  ): Promise<GetPetsByClientResponse> {
    return ipcRenderer.invoke(PETS_CHANNELS.GET_BY_CLIENT, data);
  }
}

};

contextBridge.exposeInMainWorld("api", api);
