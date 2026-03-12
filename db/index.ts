import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema"; // Importa todas as tabelas

const expoDb = openDatabaseSync("edifica.db");

// Passar o schema aqui é o que resolve o erro "Seems like the schema generic is missing"
export const db = drizzle(expoDb, { schema });
