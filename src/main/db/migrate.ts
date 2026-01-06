import Database from "better-sqlite3";

export function runMigrations(db: Database.Database) {
  // 1. Read migration files using Vite's glob import
  // This bundles the content of the SQL files into the JS, avoiding file system issues in Electron
  const migrationModules = import.meta.glob('./migrations/*.sql', { query: '?raw', eager: true, import: 'default' });
  
  // Sort files by name (keys are like './migrations/000_migrations.sql', './migrations/001_init.sql')
  const migrationFiles = Object.keys(migrationModules).sort();

  // 2. Get already applied migrations
  // If the _migrations table doesn't exist yet (first run), we start with an empty set.
  let appliedMigrations = new Set<string>();
  try {
    const rows = db.prepare("SELECT name FROM _migrations").all() as { name: string }[];
    rows.forEach(row => appliedMigrations.add(row.name));
  } catch (error: any) {
    if (error.code === 'SQLITE_ERROR' && error.message.includes('no such table')) {
      console.log('Migrations table not found. Assuming first run.');
    } else {
      throw error;
    }
  }

  // 3. Execute new migrations
  for (const fileKey of migrationFiles) {
    // Extract filename for storage/comparison (e.g., "000_migrations.sql")
    const fileName = fileKey.split('/').pop() || fileKey;

    if (!appliedMigrations.has(fileName)) {
      console.log(`Running migration: ${fileName}`);
      
      const sql = migrationModules[fileKey] as string;

      const runMigration = db.transaction(() => {
        db.exec(sql);
        // Ensure _migrations table exists before inserting (it should be created by 000_migrations.sql)
        // If 000_migrations.sql just ran, the table exists.
        db.prepare("INSERT INTO _migrations (name) VALUES (?)").run(fileName);
      });

      try {
        runMigration();
        console.log(`Migration ${fileName} applied successfully.`);
      } catch (error) {
        console.error(`Error applying migration ${fileName}:`, error);
        throw error;
      }
    }
  }
}
