import { run, all } from "../helpers";
import { Service } from "@types";

function createService(name: string, duration?: number) {
  return run(
    `
    INSERT INTO services (name, estimated_duration_minutes)
    VALUES (?, ?)
    `,
    [name, duration]
  );
}

function getActiveServices() {
  return all<Service>(
    `SELECT * FROM services WHERE active = 1 ORDER BY name`
  );
}

export default {
  createService,
  getActiveServices
};
