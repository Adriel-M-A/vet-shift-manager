import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

export function runMigrations(db: Database.Database) {
  // 1. Create the migrations table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Read migration files
  const migrationsDir = path.join(__dirname, "migrations");
  
  // Ensure directory exists (it should, but safety first in dev)
  if (!fs.existsSync(migrationsDir)) {
    console.warn(`Migrations directory not found at: ${migrationsDir}`);
    return;
  }

  const migrationFiles = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort(); // Ensure alphanumeric order (001, 002, etc.)

  // 3. Get already applied migrations
  const appliedMigrations = new Set(
    db
      .prepare("SELECT name FROM _migrations")
      .all()
      .map((row: any) => row.name)
  );

  // 4. Execute new migrations
  for (const file of migrationFiles) {
    if (!appliedMigrations.has(file)) {
      console.log(`Running migration: ${file}`);
      
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, "utf-8");

      const runMigration = db.transaction(() => {
        db.exec(sql);
        db.prepare("INSERT INTO _migrations (name) VALUES (?)").run(file);
      });

      try {
        runMigration();
        console.log(`Migration ${file} applied successfully.`);
      } catch (error) {
        console.error(`Error applying migration ${file}:`, error);
        throw error; // Stop the app start if a migration fails
      }
    }
  }
}
