import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbDir = join(__dirname, '../../database');
if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true });
}

const dbPath = process.env.DB_PATH || join(dbDir, 'app.db');
const db = new Database(dbPath);

// Abilita WAL mode per migliori performance
db.pragma('journal_mode = WAL');

// Inizializza le tabelle
function initDatabase() {
  // Tabella Todos
  db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      completed INTEGER DEFAULT 0,
      priority TEXT CHECK(priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Trigger per aggiornare updated_at automaticamente
  db.exec(`
    CREATE TRIGGER IF NOT EXISTS update_todos_timestamp 
    AFTER UPDATE ON todos
    BEGIN
      UPDATE todos SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END
  `);

  console.log('✅ Database inizializzato correttamente');
}

initDatabase();

export default db;