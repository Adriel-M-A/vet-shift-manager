import { run, get, all } from "../helpers";
import { Client, CreateClientDTO } from "@types";

function createClient(data: CreateClientDTO) {
  return run(
    `
    INSERT INTO clients (full_name, document_number, phone, email, notes)
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      data.full_name,
      data.document_number,
      data.phone,
      data.email,
      data.notes
    ]
  );
}

function findClientByDocument(documentNumber: string) {
  return get<Client>(
    `SELECT * FROM clients WHERE document_number = ?`,
    [documentNumber]
  );
}

function getAllClients() {
  return all<Client>(
    `SELECT * FROM clients ORDER BY full_name`
  );
}

export default {
  createClient,
  findClientByDocument,
  getAllClients
};
