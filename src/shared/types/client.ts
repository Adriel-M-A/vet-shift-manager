export interface Client {
  id: number;
  full_name: string;
  document_number: string;
  phone?: string;
  email?: string;
  notes?: string;
  created_at: string;
}

export type CreateClientDTO = Omit<Client, "id" | "created_at">;
