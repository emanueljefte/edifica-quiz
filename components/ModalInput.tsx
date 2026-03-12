import { createUser } from "@/services/userService";
import { scale, verticalScale } from "@/utils/styling";
import { Feather } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import Button from "./ButtonLayout";
import Input from "./Input";
import Loading from "./Loading";
import Typo from "./Typo";

interface ModalInputProps {
  visible: boolean;
  onSuccess: (user: any) => void; // Callback para quando o user for criado
}

export default function ModalInput({ visible, onSuccess }: ModalInputProps) {
  const [loading, setLoading] = useState(false);
  const nameValue = useRef("");

  const handleSubmit = async () => {
    const name = nameValue.current.trim();

    if (!name) {
      return Alert.alert(
        "Nome Necessário",
        "Por favor, introduz o teu nome para começar a edificação.",
      );
    }

    if (name.length < 3) {
      return Alert.alert(
        "Nome muito curto",
        "O nome deve ter pelo menos 3 letras.",
      );
    }

    setLoading(true);
    try {
      const newUser = await createUser(name);

      // Pequeno delay para o utilizador ver o feedback de "sucesso"
      setTimeout(() => {
        setLoading(false);
        onSuccess(newUser);
      }, 800);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Erro",
        "Não foi possível iniciar a jornada. Tenta novamente.",
      );
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <View style={styles.alertBox}>
          <View style={styles.iconCircle}>
            <Feather name="anchor" size={verticalScale(40)} color="#00D1B2" />
          </View>

          <View style={styles.textContainer}>
            <Typo size={22} fontWeight="800" style={styles.centerText}>
              Inicia a tua Jornada
            </Typo>
            <Typo size={15} color="#A0AEC0" style={styles.centerText}>
              Como queres ser chamado nesta caminhada de edificação?
            </Typo>
          </View>

          <Input
            placeholder="Teu nome ou apelido"
            icon={<Feather name="user" size={20} color="#00D1B2" />}
            onChangeText={(value) => (nameValue.current = value)}
            autoFocus
          />

          {loading ? (
            <Loading />
          ) : (
            <Button onPress={handleSubmit} style={styles.submitButton}>
              <Typo color="#0B0E14" fontWeight="800" size={16}>
                Começar como Pescador
              </Typo>
            </Button>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)", // Escurece mais o fundo
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(25),
  },
  alertBox: {
    width: "100%",
    backgroundColor: "#1A202C", // Surface Dark do teu tema
    borderRadius: verticalScale(28),
    padding: scale(30),
    alignItems: "center",
    gap: verticalScale(20),
    borderWidth: 1,
    borderColor: "#2D3748",
  },
  iconCircle: {
    width: verticalScale(80),
    height: verticalScale(80),
    borderRadius: verticalScale(40),
    backgroundColor: "rgba(0, 209, 178, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  centerText: {
    textAlign: "center",
    color: "white",
  },
  textContainer: {
    width: "100%",
  },
  submitButton: {
    backgroundColor: "#00D1B2", // Teu Ciano Primário
    width: "100%",
    height: verticalScale(56),
    borderRadius: 16,
  },
});
