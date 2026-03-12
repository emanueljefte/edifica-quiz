import { BlurView } from "expo-blur";
import LottieView from "lottie-react-native";
import * as Icons from "phosphor-react-native";
import React, { useEffect } from "react";
import {
    Animated,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface LevelUpModalProps {
  visible: boolean;
  newLevel: string;
  onClose: () => void;
}

export const LevelUpModal = ({
  visible,
  newLevel,
  onClose,
}: LevelUpModalProps) => {
  const scaleValue = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <BlurView intensity={20} style={styles.overlay}>
        <View style={styles.container}>
          {/* Animação de Confetes */}
          <LottieView
            source={require("../assets/animations/Confetti.json")}
            autoPlay
            loop={false}
            style={styles.lottie}
          />

          <Animated.View
            style={[styles.card, { transform: [{ scale: scaleValue }] }]}
          >
            <View style={styles.iconCircle}>
              <Icons.CaretDoubleUpIcon
                size={40}
                color="#00D1B2"
                weight="bold"
              />
            </View>

            <Text style={styles.congratsText}>Glória a Deus!</Text>
            <Text style={styles.descText}>A tua edificação avançou.</Text>

            <View style={styles.levelBadge}>
              <Text style={styles.levelLabel}>NOVO NÍVEL</Text>
              <Text style={styles.levelName}>{newLevel}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Continuar a Crescer</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </BlurView>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  lottie: {
    position: "absolute",
    width: "100%",
    height: 400,
    zIndex: 1,
  },
  card: {
    width: "85%",
    backgroundColor: "#1A202C",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#00D1B2", // Verde Esmeralda do logo
    zIndex: 2,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(0, 209, 178, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  congratsText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
  },
  descText: {
    color: "#A0AEC0",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
  },
  levelBadge: {
    backgroundColor: "#0B0E14",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
  },
  levelLabel: {
    color: "#00D1B2",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  levelName: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#028090", // Azul Oceano
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
