import { LessonItemType } from "@/types";
import { LESSON_ICONS } from "@/utils/iconMap";
import { StyleSheet, View } from "react-native";
import Typo from "./Typo";

// Adicionei 'id' ou 'lessonNumber' às props para mapear o ícone
export const LessonItem = ({
  title,
  progress,
  questions,
  id,
}: LessonItemType & { id: number }) => {
  // O ícone deve ser recuperado dentro do componente usando o ID da lição
  const IconComponent = LESSON_ICONS[id];

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        {IconComponent ? (
          <IconComponent size={32} color="#00D1B2" weight="duotone" />
        ) : (
          <View style={{ width: 30, height: 30, backgroundColor: "#2D3748" }} />
        )}
      </View>

      <View style={styles.contentInfo}>
        <Typo style={styles.title}>{title}</Typo>
        <Typo style={styles.subtitle}>{questions} questões</Typo>

        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${progress}%`,
                backgroundColor: progress === 100 ? "#00D1B2" : "#028090",
              },
            ]}
          />
        </View>
        {progress > 0 && (
          <Typo style={styles.percentageTypo}>{progress}% concluído</Typo>
        )}
      </View>
    </View>
  );
};

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
