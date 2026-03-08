import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";
import { ScreenWrapperProps } from "@/types";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, Platform, View } from "react-native";
const { height } = Dimensions.get("window");

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  const { theme } = useTheme();
  const activeColors = Colors[theme];

  let paddingTop = Platform.OS == "ios" ? height * 0.06 : 30;

  return (
    <View
      style={[style, { flex: 1, backgroundColor: activeColors.background }]}
    >
      <StatusBar style={theme} />
      {children}
    </View>
  );
};

export default ScreenWrapper;
