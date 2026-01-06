export interface Pet {
  id: number;
  client_id: number;
  name: string;
  species: string;
  breed?: string;
  age?: number;
  weight?: number;
  notes?: string;
  created_at: string;
}

export type CreatePetDTO = Omit<Pet, "id" | "created_at">;
