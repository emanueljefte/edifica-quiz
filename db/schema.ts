import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  currentLevel: text("current_level").default("Pescador"), // Pescador, Nova Criatura, Aprendiz...
  experience: integer("experience").default(0), // XP acumulado
  talents: integer("talents").default(0), // Moeda para "comprar" dicas
});

export const lessons = sqliteTable("lessons", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
});

export const questions = sqliteTable("questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  lessonId: integer("lesson_id").references(() => lessons.id),
  questionText: text("question_text").notNull(),
  bibleVerse: text("bible_verse"),
  explanation: text("explanation"),
});

export const options = sqliteTable("options", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questionId: integer("question_id").references(() => questions.id),
  text: text("text").notNull(),
  isCorrect: text("is_correct").notNull(),
});

export const talentTransactions = sqliteTable("talent_transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  amount: integer("amount"), // Positivo para ganho, negativo para gasto
  reason: text("reason"), // Ex: "lesson_completed_01"
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export const userProgress = sqliteTable("user_progress", {
  userId: integer("user_id").references(() => users.id),
  lessonId: integer("lesson_id").references(() => lessons.id),
  status: text("status").default("completed"),
  accuracy: integer("accuracy"), // % de acerto para validar se aprendeu bem
});
