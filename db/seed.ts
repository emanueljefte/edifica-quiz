import { eq } from "drizzle-orm";
import { db } from "./index";
import { lessons, options, questions } from "./schema";

export const seedDatabase = async (jsonData: any) => {
  try {
    console.log("🌱 Iniciando o plantio da semente (Seed)...");

    // 1. Verificar se a lição já existe para não duplicar
    const existingLesson = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, jsonData.lesson.number))
      .limit(1);

    if (existingLesson.length > 0) {
      console.log(`ℹ️ Lição ${jsonData.lesson.number} já existe. Seed pulado.`);
      return;
    }

    // Usamos uma transação para garantir integridade
    await db.transaction(async (tx) => {
      // 2. Inserir a Lição
      const [insertedLesson] = await tx
        .insert(lessons)
        .values({
          id: jsonData.lesson.number,
          title: jsonData.lesson.title,
          description: jsonData.lesson.description,
        })
        .returning({ id: lessons.id });

      console.log(`✅ Lição "${jsonData.lesson.title}" inserida.`);

      // 3. Percorrer as Questões
      for (const q of jsonData.questions) {
        const [insertedQuestion] = await tx
          .insert(questions)
          .values({
            lessonId: insertedLesson.id,
            questionText: q.text,
            bibleVerse: q.bible_verse,
            explanation: q.explanation,
          })
          .returning({ id: questions.id });

        // 4. Inserir as Opções desta questão
        for (const opt of q.options) {
          await tx.insert(options).values({
            questionId: insertedQuestion.id,
            text: opt.text,
            isCorrect: opt.isCorrect,
          });
        }
      }
    });

    console.log("🌳 Seed finalizado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao semear o banco de dados:", error);
    throw error;
  }
};
