import { LessonItem } from "@/components/LessonItem";
import { ProfileHeader } from "@/components/profileHeader";
import ScreenWrapper from "@/components/ScreenWrapper";
import { StatCard } from "@/components/StatCard";
import Typo from "@/components/Typo";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Home() {
  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={["#656566", "#028090"]}
          style={styles.background}
        />

        <ProfileHeader name="Emanuel" level="Pescador" />

        <View style={styles.statsRow}>
          <StatCard label="Talentos" value="0" />
          <StatCard label="Acertos" value="0/15" />
          {/* <StatCard label="Ranking" value="230255" /> */}
        </View>

        <Typo style={{ margin: 20 }} color="#fff" fontWeight={"bold"}>
          Edificações Disponíveis
        </Typo>

        <LessonItem
          id={1}
          title="01. A Certeza da Salvação"
          questions="10"
          progress={0}
        />
        <LessonItem
          id={2}
          title="02. O Perdão do Pecado"
          questions="12"
          progress={0}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  background: { ...StyleSheet.absoluteFillObject },
  statsRow: { flexDirection: "row", paddingHorizontal: 15, marginBottom: 20 },
});
