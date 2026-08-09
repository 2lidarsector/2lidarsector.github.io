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
  await p.query(
    `CREATE TABLE IF NOT EXISTS key_settings (
       key_value VARCHAR(255) NOT NULL UNIQUE,
       enabled TINYINT(1) NOT NULL DEFAULT 1,
       max_sessions INT NOT NULL DEFAULT 0,
       max_devices INT NOT NULL DEFAULT 0,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       CONSTRAINT fk_key_settings_key FOREIGN KEY (key_value) REFERENCES access_keys(key_value) ON DELETE CASCADE
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

// Per-key settings: enabled, max concurrent sessions, max distinct devices.
// 0 for max_sessions/max_devices means unlimited.
export async function getKeySettings(key) {
  const p = await getPool();
  const [rows] = await p.query(
    "SELECT enabled, max_sessions, max_devices FROM key_settings WHERE key_value = ?",
    [key]
  );
  if (!rows.length) return { enabled: true, maxSessions: 0, maxDevices: 0 };
  return {
    enabled: !!rows[0].enabled,
    maxSessions: rows[0].max_sessions || 0,
    maxDevices: rows[0].max_devices || 0,
  };
}

export async function setKeySettings(key, s) {
  const p = await getPool();
  await p.query(
    `INSERT INTO key_settings (key_value, enabled, max_sessions, max_devices)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE enabled = VALUES(enabled), max_sessions = VALUES(max_sessions), max_devices = VALUES(max_devices)`,
    [key, s.enabled ? 1 : 0, s.maxSessions || 0, s.maxDevices || 0]
  );
}

export async function listKeySettings() {
  const p = await getPool();
  const [rows] = await p.query(
    "SELECT key_value, enabled, max_sessions, max_devices FROM key_settings"
  );
  const out = {};
  for (const r of rows) out[r.key_value] = { enabled: !!r.enabled, maxSessions: r.max_sessions || 0, maxDevices: r.max_devices || 0 };
  return out;
}
