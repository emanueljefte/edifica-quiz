import { OptionButton } from "@/components/OptionButton";
import { handleAnswer } from "@/services/gamification"; // Importa a função que criámos
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function QuizScreen({ route, navigation }: any) {
  // Nota: userId deve vir do AuthContext ou ser passado via route
  const { questions, lessonTitle, userId, lessonId } = route.params;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (index: number, isCorrect: boolean) => {
    if (showFeedback) return; // Evita cliques duplos
    setSelectedOption(index);
    setShowFeedback(true);
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const handleNext = async () => {
    const isCorrect = currentQuestion.options[selectedOption!].isCorrect;

    // Atualiza talentos e progresso silenciosamente
    // Passamos readNB como true se o feedback foi exibido
    await handleAnswer(isCorrect, showFeedback, userId);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      navigation.navigate("Result", {
        score: score + (isCorrect ? 1 : 0), // Garante o score final
        total: questions.length,
        userId,
        lessonId,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.lessonTitle}>{lessonTitle}</Text>
        <View style={styles.progressBadge}>
          <Text style={styles.progressText}>
            {currentIndex + 1} de {questions.length}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionCard}>
          <Text style={styles.bibleVerse}>{currentQuestion.bibleVerse}</Text>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((opt: any, index: number) => (
            <OptionButton
              key={index}
              text={opt.text}
              isCorrect={opt.isCorrect}
              isSelected={selectedOption === index}
              disabled={showFeedback}
              onPress={() => handleSelectOption(index, opt.isCorrect)}
            />
          ))}
        </View>

        {showFeedback && (
          <View style={styles.feedbackCard}>
            <View style={styles.nbHeader}>
              <Text style={styles.nbTitle}>N.B. (Nota Bem)</Text>
            </View>
            <Text style={styles.nbText}>{currentQuestion.explanation}</Text>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>
                {currentIndex === questions.length - 1
                  ? "Ver Resultado"
                  : "Próxima Pergunta"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B0E14", paddingTop: 60 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  lessonTitle: { color: "#00D1B2", fontSize: 18, fontWeight: "bold", flex: 1 },
  progressBadge: { backgroundColor: "#1A202C", padding: 8, borderRadius: 10 },
  progressText: { color: "#A0AEC0", fontSize: 12, fontWeight: "bold" },
  scrollContent: { paddingBottom: 40 },
  questionCard: { padding: 20, marginBottom: 10 },
  bibleVerse: {
    color: "#028090",
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 8,
  },
  questionText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 28,
  },
  optionsContainer: { paddingHorizontal: 20 },
  feedbackCard: {
    margin: 20,
    padding: 20,
    backgroundColor: "#1A202C",
    borderRadius: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#00D1B2",
  },
  nbHeader: { marginBottom: 10 },
  nbTitle: {
    color: "#00D1B2",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 1,
  },
  nbText: { color: "#E2E8F0", fontSize: 15, lineHeight: 22, marginBottom: 20 },
  nextButton: {
    backgroundColor: "#00D1B2",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  nextButtonText: { color: "#0B0E14", fontWeight: "bold", fontSize: 16 },
});
