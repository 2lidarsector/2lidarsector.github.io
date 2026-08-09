import mysql from "mysql2/promise";

// Backend storage for access keys.
// - On Wasmer Edge, DB_* env vars are injected by the platform -> MySQL pool.
// - Locally (no DB_* vars) it falls back to a plain in-memory list seeded from
//   ARX_KEYS / keys.txt, so `node src/server.js` still works on a laptop.

export function dbConfigured() {
  return !!(process.env.DB_HOST && process.env.DB_USERNAME && process.env.DB_NAME);
}

let pool = null;

export async function getPool() {
  if (!dbConfigured()) throw new Error("No database configured");
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      // Wasmer uses a private CA; verify TLS but skip public chain verification.
      ssl: { rejectUnauthorized: false },
      connectionLimit: 4,
      waitForConnections: true,
    });
  }
  return pool;
}

export async function ensureTable() {
  const p = await getPool();
  await p.query(
    `CREATE TABLE IF NOT EXISTS access_keys (
       id INT AUTO_INCREMENT PRIMARY KEY,
       key_value VARCHAR(255) NOT NULL UNIQUE,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     ) ENGINE=InnoDB`
  );
}

export async function listKeys() {
  const p = await getPool();
  const [rows] = await p.query("SELECT id, key_value, created_at FROM access_keys ORDER BY created_at");
  return rows;
}

export async function addKey(key) {
  const p = await getPool();
  await p.query("INSERT INTO access_keys (key_value) VALUES (?)", [key]);
}

export async function ensureKeys(keys) {
  const p = await getPool();
  for (const key of keys) {
    await p.query("INSERT IGNORE INTO access_keys (key_value) VALUES (?)", [key]);
  }
}

export async function removeKey(id) {
  const p = await getPool();
  await p.query("DELETE FROM access_keys WHERE id = ?", [id]);
}

export async function removeKeyByValue(key) {
  const p = await getPool();
  await p.query("DELETE FROM access_keys WHERE key_value = ?", [key]);
}

export async function keyExists(key) {
  const p = await getPool();
  const [rows] = await p.query("SELECT 1 FROM access_keys WHERE key_value = ? LIMIT 1", [key]);
  return rows.length > 0;
}

export async function countKeys() {
  const p = await getPool();
  const [rows] = await p.query("SELECT COUNT(*) AS c FROM access_keys");
  return rows[0] ? rows[0].c : 0;
}
