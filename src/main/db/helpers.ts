import db from "./database";

export function run(query: string, params?: unknown[]) {
  return db.prepare(query).run(params);
}

export function get<T>(query: string, params?: unknown[]): T | undefined {
  return db.prepare(query).get(params) as T | undefined;
}

export function all<T>(query: string, params?: unknown[]): T[] {
  return db.prepare(query).all(params) as T[];
}
