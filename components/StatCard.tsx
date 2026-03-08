import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";
import { StatCardType } from "@/types";
import { StyleSheet, View } from "react-native";
import Typo from "./Typo";

export const StatCard = ({ label, value, icon }: StatCardType) => {
  const { theme } = useTheme();
  const activeColors = Colors[theme];
  return (
    <View style={[styles.statBox, { backgroundColor: activeColors.card }]}>
      <Typo style={styles.statLabel}>{label}</Typo>
      <Typo style={styles.statValue}>{value}</Typo>
    </View>
  );
};

export const styles = StyleSheet.create({
  statBox: {
    flex: 1,
    margin: 6,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    // Shadow para dar profundidade (opcional no modo dark)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 8,
    // Aqui você pode colocar o ícone com a cor Primary #00D1B2
  },
  statLabel: {
    color: "#A0AEC0", // Cinza suave para o rótulo
    fontSize: 13,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
  },
  statSubValue: {
    color: "#00D1B2", // Verde Esmeralda do seu logo
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
});
