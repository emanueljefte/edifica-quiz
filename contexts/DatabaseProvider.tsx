// src/db/DatabaseProvider.tsx
import { db } from "@/db//index"; // Importa a instância .ts
import lesson1Data from "@/db/data/lesson1.json";
import { seedDatabase } from "@/db/seed";
import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import React, { useEffect } from "react";
import { Text } from "react-native"; // Ou o seu componente <Typo>

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      seedDatabase(lesson1Data);
    }
  }, [success]);

  if (error) {
    return <Text>Erro na migração: {error.message}</Text>;
  }

  if (!success) {
    // Estilize este texto com a sua paleta Black & Cyan
    return (
      <Text style={{ color: "#00D1B2", backgroundColor: "#0B0E14", flex: 1 }}>
        Preparando alicerces...
      </Text>
    );
  }

  return <>{children}</>;
}
