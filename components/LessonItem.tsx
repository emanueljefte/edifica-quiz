import { LessonItemType } from "@/types";
import * as Icons from "phosphor-react-native";
import { StyleSheet, View } from "react-native";
import Typo from "./Typo";

export const LessonItem = ({ title, progress, questions }: LessonItemType) => (
  <View style={styles.container}>
    <View style={styles.iconWrapper}>
      {/* Ícone de escudo ou livro */}
      <Icons.BookOpenIcon weight="bold" />
    </View>
    <View style={styles.contentInfo}>
      <Typo style={styles.title}>{title}</Typo>
      <Typo style={styles.subtitle}>{questions} questões</Typo>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    </View>
  </View>
);

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A202C", // Surface Dark (cor dos seus cards)
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    // Sombra leve para destacar do fundo preto puro
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#2D3748", // Fundo do ícone levemente mais claro
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#00A896", // Borda com a cor primária do logo
  },
  contentInfo: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    color: "#A0AEC0",
    fontSize: 13,
    marginBottom: 10,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#2D3748",
    borderRadius: 3,
    width: "100%",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    // Aqui você usará o LinearGradient do Expo ou uma cor sólida como #00D1B2
    borderRadius: 3,
  },
  percentageTypo: {
    color: "#00D1B2",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
    textAlign: "right",
  },
});
