export const LEVEL_RULES = [
  { rank: 1, name: "Pescador", minXP: 0, requiredLessonId: null },
  { rank: 2, name: "Nova Criatura", minXP: 100, requiredLessonId: 2 }, // Ex: Precisa da Lição 2
  { rank: 3, name: "Aprendiz", minXP: 300, requiredLessonId: 3 },
  { rank: 4, name: "Intercessor", minXP: 600, requiredLessonId: 5 },
  { rank: 5, name: "Espiritual", minXP: 1000, requiredLessonId: 6 },
  { rank: 6, name: "Discípulo", minXP: 1500, requiredLessonId: 9 }, // Lição final
];
