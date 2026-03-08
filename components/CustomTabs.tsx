import { verticalScale } from "@/utils/styling"; // Assumindo que você tem horizontalScale
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Icons from "phosphor-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function CustomTabs({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const tabBarIcons: any = {
    statistics: (isFocused: boolean) => (
      <Icons.ChartBarIcon
        weight={isFocused ? "fill" : "regular"}
        size={verticalScale(28)}
        color={isFocused ? "#00D1B2" : "#999"}
      />
    ),
    profile: (isFocused: boolean) => (
      <Icons.UserIcon
        weight={isFocused ? "fill" : "regular"}
        size={verticalScale(28)}
        color={isFocused ? "#00D1B2" : "#999"}
      />
    ),
    index: (isFocused: boolean) => (
      <Icons.HouseIcon
        weight={isFocused ? "fill" : "regular"}
        size={verticalScale(32)}
        color={isFocused ? "#00D1B2" : "#999"}
      />
    ),
    setup: (isFocused: boolean) => (
      <Icons.GearIcon
        weight={isFocused ? "fill" : "regular"}
        size={verticalScale(28)}
        color={isFocused ? "#00D1B2" : "#999"}
      />
    ),
  };

  return (
    <View style={styles.floatingWrapper}>
      <View style={styles.contentContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const isHome = route.name === "index";

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Renderização especial para o botão Central (Home)

          return (
            <TouchableOpacity
              key={route.name}
              onPress={onPress}
              activeOpacity={0.8}
              style={styles.homeButtonWrapper}
            >
              <View style={styles.homeButton}>
                {tabBarIcons[route.name] && tabBarIcons[route.name](isFocused)}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingWrapper: {
    position: "absolute",
    bottom: verticalScale(20), // Eleva a barra para flutuar
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  contentContainer: {
    flexDirection: "row",
    backgroundColor: "#1A202C", // Surface Dark das cores que escolhemos
    width: "90%",
    height: verticalScale(70),
    borderRadius: 35,
    justifyContent: "space-evenly",
    alignItems: "center",
    // Sombra para o efeito flutuante
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  standardTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  homeButtonWrapper: {
    top: verticalScale(-25), // Faz o botão saltar para fora da barra
    justifyContent: "center",
    alignItems: "center",
  },
  homeButton: {
    width: verticalScale(65),
    height: verticalScale(65),
    borderRadius: verticalScale(32.5),
    backgroundColor: "#028090", // Cor secundária (Azul Oceano) do seu logo
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#0B0E14", // Cor do Background para o "corte" visual
    shadowColor: "#00D1B2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 8,
  },
});
