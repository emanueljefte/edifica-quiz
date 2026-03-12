import { LevelUpModal } from "@/components/LevelUpModal";
import { db } from "@/db";
import { users } from "@/db/schema";
import { checkLevelUp } from "@/services/gamification";
import { eq, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ResultScreen({ route, navigation }: any) {
  const { score, total, userId, lessonId } = route.params;
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [newLevelName, setNewLevelName] = useState("");

  useEffect(() => {
    handleEndGame();
  }, []);

  const handleEndGame = async () => {
    // 1. Calcular XP ganho (ex: 10 XP por acerto)
    const xpGained = score * 10;
    const talentsGained = score * 5;

    // 2. Atualizar o banco de dados via Drizzle
    await db
      .update(users)
      .set({
        experience: sql`${users.experience} + ${xpGained}`,
        talents: sql`${users.talents} + ${talentsGained}`,
      })
      .where(eq(users.id, userId));

    // 3. Verificar se subiu de nível
    // Aqui assumimos que você já buscou os dados atualizados do user
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
    const completedLessons = [lessonId]; // Idealmente buscar do histórico

    const levelUp = await checkLevelUp(
      userId,
      user!.experience as number,
      completedLessons,
    );

    if (levelUp && levelUp !== user!.currentLevel) {
      setNewLevelName(levelUp);
      setShowLevelModal(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreCircle}>
        <Text style={styles.scoreText}>{score}</Text>
        <Text style={styles.totalText}>de {total}</Text>
      </View>

      <Text style={styles.message}>
        {score === total ? "Excelente Edificação!" : "Bom Trabalho!"}
      </Text>

      <Text style={styles.subMessage}>
        Você ganhou {score * 5} Talentos para ajudar na sua jornada.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Voltar ao Início</Text>
      </TouchableOpacity>

      <LevelUpModal
        visible={showLevelModal}
        newLevel={newLevelName}
        onClose={() => setShowLevelModal(false)}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0E14",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  scoreCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: "#028090",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  scoreText: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "bold",
  },
  totalText: {
    color: "#00D1B2",
    fontSize: 18,
    fontWeight: "600",
  },
  message: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subMessage: {
    color: "#A0AEC0",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#1A202C",
    width: "100%",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#028090",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
