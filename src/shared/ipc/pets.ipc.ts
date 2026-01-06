import { Pet, CreatePetDTO } from "@types";

export const PETS_CHANNELS = {
  CREATE: "pets:create",
  GET_BY_CLIENT: "pets:get-by-client"
} as const;

/* Requests */

export interface CreatePetRequest {
  data: CreatePetDTO;
}

export interface GetPetsByClientRequest {
  clientId: number;
}

/* Responses */

export interface CreatePetResponse {
  petId: number;
}

export interface GetPetsByClientResponse {
  items: Pet[];
}
