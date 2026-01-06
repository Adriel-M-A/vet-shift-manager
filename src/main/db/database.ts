import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.join(process.cwd(), "data", "database.sqlite");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db: Database.Database = new Database(dbPath);

db.pragma("foreign_keys = ON");

export default db;
