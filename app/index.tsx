import ModalInput from "@/components/ModalInput";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  const [isVisible, setIsVisible] = useState(false);

  const closeModal = () => {
    setIsVisible(false);
    router.push("/(tabs)");
  };

  return (
    <ScreenWrapper>
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#656566", "#00D1B2"]}
          style={styles.background}
        />

        <View style={styles.content}>
          <Image
            source={require("@/assets/images/meu_logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Typo style={styles.title}>EdifcaQuiz</Typo>
          <Typo style={styles.subtitle}>
            Aprenda sobre a Certeza da Salvação e o Crescimento Cristão.
          </Typo>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => setIsVisible(true)}
          >
            <LinearGradient
              colors={["#00A896", "#028090"]} // Gradiente do botão
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Typo style={styles.buttonText}>Começar Edificação</Typo>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <ModalInput visible={isVisible} onClose={() => closeModal()} />
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
