import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";
import { InputProps } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import { EyeClosedIcon, EyeIcon } from "phosphor-react-native";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function Input(props: InputProps) {
  const { theme } = useTheme();
  const activeColors = Colors[theme];
  const { secureTextEntry, ...rest } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = props.secureTextEntry;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: activeColors.background,
          borderColor: isFocused ? activeColors.primary : "transparent",
          borderWidth: 1.5,
        },
      ]}
    >
      {/* Ícone Inicial (ex: E-mail, Cadeado) */}
      {props.icon && (
        <View style={styles.iconContainer}>
          {React.cloneElement(
            props.icon as React.ReactElement<{ color?: string; size?: number }>,
            {
              color: isFocused ? activeColors.primary : activeColors.text,
              size: verticalScale(20),
            },
          )}
        </View>
      )}

      <TextInput
        style={[styles.input, { color: activeColors.text }]}
        placeholderTextColor={theme === "dark" ? "#666" : "#9CA3AF"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={rest.inputRef}
        selectionColor={activeColors.primary}
        // Se for senha, o estado showPassword controla a visibilidade
        {...rest}
        secureTextEntry={isPasswordField && !showPassword}
      />

      {/* Ícone de Olhinho - Só aparece se secureTextEntry for true */}
      {isPasswordField && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
          activeOpacity={0.7}
        >
          {showPassword ? (
            <EyeIcon size={verticalScale(20)} color={activeColors.text} />
          ) : (
            <EyeClosedIcon
              size={verticalScale(20)}
              color={isFocused ? activeColors.primary : activeColors.text}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: verticalScale(56),
    borderRadius: verticalScale(16),
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(12),
  },
  iconContainer: {
    marginRight: scale(10),
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: verticalScale(15),
    fontWeight: "500",
    height: "100%",
  },
  eyeIcon: {
    padding: scale(5),
    marginLeft: scale(5),
  },
});
