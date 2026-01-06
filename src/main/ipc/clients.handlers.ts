import { ipcMain } from "electron";
import {
  CLIENTS_CHANNELS,
  CreateClientRequest,
  FindClientByDocumentRequest
} from "../../shared/ipc/clients.ipc";
import clientRepository from "../db/repositories/client.repository";

export function registerClientHandlers() {

  ipcMain.handle(
    CLIENTS_CHANNELS.CREATE,
    (_, request: CreateClientRequest) => {
      const result = clientRepository.createClient(request.data);
      return { clientId: result.lastInsertRowid };
    }
  );

  ipcMain.handle(
    CLIENTS_CHANNELS.FIND_BY_DOCUMENT,
    (_, request: FindClientByDocumentRequest) => {
      const client = clientRepository.findClientByDocument(
        request.documentNumber
      );
      return { client };
    }
  );

  ipcMain.handle(
    CLIENTS_CHANNELS.GET_ALL,
    () => {
      const items = clientRepository.getAllClients();
      return { items };
    }
  );
}
