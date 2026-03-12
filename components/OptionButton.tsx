import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const OptionButton = ({
  text,
  isCorrect,
  isSelected,
  disabled,
  onPress,
}: any) => {
  const getBackgroundColor = () => {
    if (!isSelected) return "#1A202C";
    return isCorrect ? "#2DAB66" : "#E53E3E";
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: getBackgroundColor() }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 18,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2D3748",
  },
  text: { color: "#FFF", fontSize: 16, fontWeight: "500" },
});
