export interface Service {
  id: number;
  name: string;
  estimated_duration_minutes?: number;
  active: boolean;
  created_at: string;
}

export type CreateServiceDTO = Omit<Service, "id" | "created_at">;
