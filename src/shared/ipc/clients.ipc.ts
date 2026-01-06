import { Client, CreateClientDTO } from "@types";

export const CLIENTS_CHANNELS = {
  CREATE: "clients:create",
  FIND_BY_DOCUMENT: "clients:find-by-document",
  GET_ALL: "clients:get-all"
} as const;

/* Requests */

export interface CreateClientRequest {
  data: CreateClientDTO;
}

export interface FindClientByDocumentRequest {
  documentNumber: string;
}

/* Responses */

export interface CreateClientResponse {
  clientId: number;
}

export interface FindClientByDocumentResponse {
  client?: Client;
}

export interface GetAllClientsResponse {
  items: Client[];
}
