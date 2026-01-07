import { run, all } from "../helpers";
import { Pet, CreatePetDTO } from "@types";

function createPet(data: CreatePetDTO) {
  return run(
    `
    INSERT INTO pets (client_id, name, species, breed, gender, age, weight, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.client_id,
      data.name,
      data.species,
      data.breed,
      data.gender,
      data.age,
      data.weight,
      data.notes
    ]
  );
}

function getPetsByClient(clientId: number) {
  return all<Pet>(
    `SELECT * FROM pets WHERE client_id = ?`,
    [clientId]
  );
}

function updatePet(id: number, data: Partial<CreatePetDTO>) {
  // Construct the SET clause dynamically
  const fields = Object.keys(data).map((key) => `${key} = ?`).join(", ");
  const values = Object.values(data);

  if (fields.length === 0) return { changes: 0 };

  return run(
    `UPDATE pets SET ${fields}, updated_at = datetime('now') WHERE id = ?`,
    [...values, id]
  );
}

export default {
  createPet,
  getPetsByClient,
  updatePet
};
