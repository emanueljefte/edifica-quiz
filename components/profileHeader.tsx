import { ProfileHeaderType } from "@/types";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Typo from "./Typo";

export const ProfileHeader = ({ name, level, images }: ProfileHeaderType) => (
  <View style={[styles.header, styles.headerBackground]}>
    <View>
      <Typo fontWeight={"bold"} color="#fff" size={20}>
        Olá, {name} 👋
      </Typo>
      <View style={styles.levelBadge}>
        <Typo color="#00D1B2">
          Você está no nível{" "}
          <Typo color="#00D1B2" fontWeight={"700"}>
            {level}
          </Typo>
        </Typo>
      </View>
    </View>
    <Image
      source={images || require("@/assets/images/meu_logo.png")}
      style={styles.avatar}
    />
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  headerBackground: {
    backgroundColor: "#028090",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: "center",
  },
  levelBadge: {
    backgroundColor: "rgba(0, 168, 150, 0.2)",
    padding: 5,
    borderRadius: 10,
    marginTop: 5,
  },
  avatar: {
    backgroundAttachment: "contain",
    width: 70,
    height: 70,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: "#00A896",
  },
});
