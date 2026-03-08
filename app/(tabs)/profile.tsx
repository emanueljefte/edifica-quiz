import ScreenWrapper from "@/components/ScreenWrapper";
import { StatCard } from "@/components/StatCard";
import Typo from "@/components/Typo";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

export default function Profile() {
  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Cabeçalho Azul */}
        <View style={styles.headerBackground}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require("@/assets/images/icon.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <Typo color="#FFF" size={22} fontWeight={"bold"}>
            Emanuel Jefté
          </Typo>
        </View>

        {/* Card de Nível Flutuante */}
        <View style={styles.levelCard}>
          <View style={styles.levelIconCircle}>
            <Typo style={{ fontSize: 40 }}>🎣</Typo>
          </View>
          <View style={styles.levelInfo}>
            <Typo style={styles.levelTitle}>NÍVEL ATUAL</Typo>
            <Typo fontWeight={"bold"} size={24}>
              Pescador
            </Typo>
            <Typo style={{ marginTop: 5 }} size={14} color="#A0AEC0">
              Faltam 15 acertos para "Discípulo"
            </Typo>
          </View>
        </View>

        {/* Estatísticas (Reutilizando seu StatCard) */}
        <View style={{ flexDirection: "row", padding: 10, marginTop: 10 }}>
          <StatCard label="Talentos" value="120" />
          <StatCard label="Acertos" value="45" />
          <StatCard label="Semanas" value="3" />
        </View>

        {/* Seção de Conquistas baseadas no Manual */}
        <View style={{ padding: 20 }}>
          <Typo
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            Suas Edificações
          </Typo>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {/* Aqui entrariam ícones cinzas para lições não feitas e coloridos para feitas */}
            <BadgeItem title="Certeza" icon="🛡️" completed={true} />
            <BadgeItem title="Perdão" icon="🕊️" completed={true} />
            <BadgeItem title="Crescimento" icon="🌱" completed={false} />
            <BadgeItem title="Oração" icon="🙏" completed={false} />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const BadgeItem = ({ title, icon, completed }: any) => (
  <View
    style={{
      width: "22%",
      alignItems: "center",
      opacity: completed ? 1 : 0.3,
      marginBottom: 15,
    }}
  >
    <View
      style={{
        width: 55,
        height: 55,
        borderRadius: 27,
        backgroundColor: "#1A202C",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: completed ? "#00D1B2" : "#444",
      }}
    >
      <Typo style={{ fontSize: 24 }}>{icon}</Typo>
    </View>
    <Typo
      style={{
        color: "#7f8a99",
        fontSize: 12,
        marginTop: 5,
        textAlign: "center",
      }}
    >
      {title}
    </Typo>
  </View>
);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBackground: {
    backgroundColor: "#028090",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: "center",
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#00D1B2",
    overflow: "hidden",
    marginBottom: 15,
  },
  nameText: {},
  levelCard: {
    backgroundColor: "#ffffff",
    width: "90%",
    borderRadius: 20,
    borderWidth: 0.3,
    borderColor: "#00000044",
    marginTop: -20, // Sobreposição no header azul
    alignSelf: "center",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  levelIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: "#A0AEC0",
    borderWidth: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  levelInfo: {
    marginLeft: 15,
    flex: 1,
  },
  levelTitle: {
    color: "#00D1B2",
    fontSize: 14,
    fontWeight: "600",
  },
});
