import { Pet, CreatePetDTO } from "@types";

export const PETS_CHANNELS = {
  CREATE: "pets:create",
  GET_BY_CLIENT: "pets:get-by-client",
  UPDATE: "pets:update"
} as const;

/* Requests */

export interface CreatePetRequest {
  data: CreatePetDTO;
}

export interface GetPetsByClientRequest {
  clientId: number;
}

export interface UpdatePetRequest {
  id: number;
  data: Partial<CreatePetDTO>;
}

/* Responses */

export interface CreatePetResponse {
  petId: number;
}

export interface GetPetsByClientResponse {
  items: Pet[];
}

export interface UpdatePetResponse {
  success: boolean;
}
