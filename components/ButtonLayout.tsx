import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";
import { CustomButtonProps } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface EnhancedButtonProps extends CustomButtonProps {
  variant?: "primary" | "outline" | "ghost";
  disabled?: boolean;
}

export default function Button({
  style,
  onPress,
  loading = false,
  children,
  variant = "primary",
  disabled = false,
}: EnhancedButtonProps) {
  const { theme } = useTheme();
  const activeColors = Colors[theme];
  const isOutline = variant === "outline";
  const buttonColor = isOutline ? "transparent" : activeColors.primary;
  const borderColor = isOutline ? activeColors.primary : "transparent";

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        styles.baseButton,
        {
          backgroundColor: buttonColor,
          borderColor: borderColor,
          borderWidth: isOutline ? 1.5 : 0,
          opacity: isDisabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={isOutline ? activeColors.primary : "#FFF"}
          size="small"
        />
      ) : (
        <View style={styles.content}>{children}</View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    height: verticalScale(54),
    borderRadius: verticalScale(16),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: scale(20),
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(8),
  },
});
