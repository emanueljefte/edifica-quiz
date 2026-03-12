import ModalInput from "@/components/ModalInput";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { db } from "@/db";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  const [isVisible, setIsVisible] = useState(false);

  // Exemplo de verificação rápida no WelcomeScreen
  useEffect(() => {
    const checkUser = async () => {
      const existingUser = await db.query.users.findFirst();
      if (existingUser) {
        router.replace("/(tabs)");
      }
    };
    checkUser();
  }, []);

  // Esta função agora recebe o novo utilizador vindo do ModalInput
  const handleUserCreated = (newUser: any) => {
    setIsVisible(false);
    console.log("Discípulo Criado:", newUser.name);

    // Pequeno delay para suavidade visual antes de mudar de ecrã
    setTimeout(() => {
      router.replace("/(tabs)"); // Use replace para o utilizador não poder "voltar" ao Welcome
    }, 100);
  };

  return (
    <ScreenWrapper>
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#1A202C", "#0B0E14"]} // Mudei para tons mais Dark/Cyan para condizer com o tema
          style={styles.background}
        />

        <View style={styles.content}>
          <Image
            source={require("@/assets/images/meu_logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Typo style={styles.title}>EdificaQuiz</Typo>
          <Typo style={styles.subtitle}>
            Inicia a tua jornada como Pescador e cresce até te tornares um
            verdadeiro Discípulo.
          </Typo>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonContainer}
            onPress={() => setIsVisible(true)}
          >
            <LinearGradient
              colors={["#00D1B2", "#028090"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Typo style={styles.buttonText}>Começar Edificação</Typo>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* ModalInput corrigido para o novo padrão de sucesso */}
      <ModalInput visible={isVisible} onSuccess={handleUserCreated} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "pink" },

  background: { ...StyleSheet.absoluteFillObject },

  content: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    padding: 20,
  },

  logo: { width: 200, height: 200, marginBottom: 20 },

  title: {
    fontSize: 32,

    fontWeight: "bold",

    color: "#FFFFFF",

    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,

    color: "#E2E8F0",

    textAlign: "center",

    marginBottom: 40,
  },

  buttonContainer: { width: "80%", height: 55 },

  button: {
    flex: 1,

    borderRadius: 25,

    justifyContent: "center",

    alignItems: "center",
  },

  buttonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
});
