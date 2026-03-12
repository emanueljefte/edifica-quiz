import { eq, sql } from "drizzle-orm";
import { LEVEL_RULES } from "../constants/levels";
import { db } from "../db";
import { users } from "../db/schema";

export async function checkLevelUp(
  userId: number,
  currentXP: number,
  completedLessonIds: number[],
) {
  // Encontra o nível mais alto que o utilizador qualifica
  const nextLevel = [...LEVEL_RULES]
    .reverse()
    .find(
      (level) =>
        currentXP >= level.minXP &&
        (!level.requiredLessonId ||
          completedLessonIds.includes(level.requiredLessonId)),
    );

  if (nextLevel) {
    await db
      .update(users)
      .set({ currentLevel: nextLevel.name })
      .where(eq(users.id, userId));

    return nextLevel.name;
  }
  return null;
}

// Ao finalizar uma questão no componente de Quiz
export const handleAnswer = async (
  isCorrect: boolean,
  readNB: boolean,
  userId: number,
) => {
  let talentsEarned = 0;

  if (isCorrect) talentsEarned += 10;
  if (readNB) talentsEarned += 5; // Recompensa por ler a explicação doutrinária

  // Atualiza no banco usando Drizzle
  await db
    .update(users)
    .set({ talents: sql`${users.talents} + ${talentsEarned}` })
    .where(eq(users.id, userId));
};
