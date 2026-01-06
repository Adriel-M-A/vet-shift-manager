import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { app } from "electron";
import { runMigrations } from "./migrate";

// Use proper User Data directory for the database
const userDataPath = app.getPath("userData");
const dbPath = path.join(userDataPath, "database.sqlite");

// Ensure the directory exists
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

console.log(`Loading database from: ${dbPath}`);

const db: Database.Database = new Database(dbPath);

// Enable foreign keys
db.pragma("foreign_keys = ON");

// Run Migrations
try {
  runMigrations(db);
  console.log("Database migrations checked and applied.");
} catch (error) {
  console.error("Failed to apply database migrations:", error);
}

export default db;
