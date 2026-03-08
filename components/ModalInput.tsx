import Colors from "@/constants/Colors";
import { scale, verticalScale } from "@/utils/styling";
import { Feather } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import Button from "./ButtonLayout";
import Input from "./Input";
import Loading from "./Loading";
import Typo from "./Typo";

interface ModalInput {
  visible: boolean;
  title?: string;
  message?: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export default function ModalInput({
  visible,
  title,
  message,
  type = "info",
  onClose,
}: ModalInput) {
  const [loading, setLoading] = useState(false);
  const inputName = useRef("");
  const iconColor =
    type === "success"
      ? "#10b981"
      : type === "error"
        ? Colors.dark.error
        : Colors.dark.primary;

  const handleSubmit = async () => {
    console.log(inputName.current);

    if (!inputName.current) {
      return Alert.alert("Usuário", "Introduza o nome");
    } else if (inputName.current.length < 3) {
      return Alert.alert("Usuário", "Acrescente mais letra nesse nome");
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      inputName.current = "";
      onClose();
    }, 2000);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Feather name={"user"} size={verticalScale(50)} color={iconColor} />

          <View style={styles.textContainer}>
            <Typo size={22} fontWeight="700" style={{ textAlign: "center" }}>
              Seja Bem-vinda ao Quiz sobre Edificação
            </Typo>
            <Typo
              size={16}
              color="#666"
              style={{ textAlign: "center", marginTop: 8 }}
            >
              Introduza o teu nome para começar
            </Typo>
          </View>
          <Input
            placeholder="Nome Completo"
            icon={<Feather name="user" size={20} />}
            onChangeText={(value) => (inputName.current = value)}
          />

          {loading ? (
            <Loading />
          ) : (
            <Button
              onPress={handleSubmit}
              style={{
                backgroundColor: iconColor,
                width: "100%",
                height: verticalScale(50),
              }}
            >
              <Typo color="white" fontWeight="700">
                Guardar
              </Typo>
            </Button>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(30),
  },
  alertBox: {
    width: "100%",
    backgroundColor: "white", // Adicione suporte ao tema aqui se necessário
    borderRadius: verticalScale(24),
    padding: scale(25),
    alignItems: "center",
    gap: verticalScale(20),
  },
  textContainer: {
    alignItems: "center",
  },
});
