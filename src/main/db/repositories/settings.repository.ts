import { run, get } from "../helpers";
import { Setting } from "@types";

function setSetting(key: string, value: string) {
  return run(
    `
    INSERT INTO settings (key, value)
    VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET
      value = excluded.value,
      updated_at = datetime('now')
    `,
    [key, value]
  );
}

function getSetting(key: string) {
  return get<Pick<Setting, "value">>(
    `SELECT value FROM settings WHERE key = ?`,
    [key]
  );
}

export default {
  setSetting,
  getSetting
};
