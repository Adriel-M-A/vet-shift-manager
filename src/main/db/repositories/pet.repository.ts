import { run, all } from "../helpers";
import { Pet, CreatePetDTO } from "@types";

function createPet(data: CreatePetDTO) {
  return run(
    `
    INSERT INTO pets (client_id, name, species, breed, age, weight, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.client_id,
      data.name,
      data.species,
      data.breed,
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

export default {
  createPet,
  getPetsByClient
};
