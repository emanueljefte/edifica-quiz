import { db } from "@/db";
import { users } from "@/db/schema";

export const createUser = async (name: string) => {
  try {
    // Insere o novo utilizador com os valores iniciais
    const result = await db
      .insert(users)
      .values({
        name: name,
        currentLevel: "Pescador", // Começa como Pescador
        experience: 0,
        talents: 0,
      })
      .returning();

    return result[0]; // Retorna o utilizador criado
  } catch (error) {
    console.error("Erro ao criar discípulo:", error);
    throw error;
  }
};
