import mysql, { type Pool, type ResultSetHeader, type RowDataPacket } from "mysql2/promise";

/**
 * Conexión a la base de datos MySQL/MariaDB del hosting (cPanel).
 * Reemplaza a Supabase. Variables de entorno:
 *   DB_HOST (por defecto localhost), DB_PORT (3306), DB_USER, DB_PASSWORD, DB_NAME
 * Esquema de las tablas: db/schema.sql
 */

declare global {
  // eslint-disable-next-line no-var
  var __dbPool: Pool | undefined;
}

function getPool(): Pool {
  if (!globalThis.__dbPool) {
    globalThis.__dbPool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: "utf8mb4",
      timezone: "Z", // las fechas se guardan y leen en UTC
      connectionLimit: 5,
      connectTimeout: 4000,
      waitForConnections: true,
    });
    // Mantiene CURRENT_TIMESTAMP en UTC, igual que las fechas que envía la app
    globalThis.__dbPool.on("connection", (conn) => {
      conn.query("SET time_zone = '+00:00'");
    });
  }
  return globalThis.__dbPool;
}

/** Columnas guardadas como TINYINT(1) que la app espera como boolean */
const BOOL_COLS = new Set(["publicado", "aprobado", "leido"]);
/** Columnas guardadas como JSON */
const JSON_COLS = new Set(["etiquetas"]);

/** Devuelve las filas con el mismo formato que daba Supabase:
 *  fechas como texto ISO, booleanos reales y JSON ya interpretado. */
function normalize<T>(row: RowDataPacket): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    if (v instanceof Date) out[k] = v.toISOString();
    else if (BOOL_COLS.has(k)) out[k] = Boolean(v);
    else if (JSON_COLS.has(k) && typeof v === "string") {
      try {
        out[k] = JSON.parse(v);
      } catch {
        out[k] = null;
      }
    } else out[k] = v;
  }
  return out as T;
}

/** SELECT: devuelve las filas normalizadas */
export async function query<T>(sql: string, params: unknown[] = []): Promise<T[]> {
  const [rows] = await getPool().query<RowDataPacket[]>(sql, params);
  return rows.map((r) => normalize<T>(r));
}

/** SELECT de una sola fila (o null) */
export async function queryOne<T>(sql: string, params: unknown[] = []): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}

/** INSERT / UPDATE / DELETE: devuelve insertId y filas afectadas */
export async function execute(sql: string, params: unknown[] = []) {
  const [res] = await getPool().query<ResultSetHeader>(sql, params);
  return { insertId: res.insertId, affectedRows: res.affectedRows };
}

/** Código de error de MySQL para clave duplicada (p. ej. slug repetido) */
export const DUPLICATE_KEY = "ER_DUP_ENTRY";
