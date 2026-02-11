import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { theme } from "../styles/theme";

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  style,
  disabled,
}: {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  style?: ViewStyle;
  disabled?: boolean;
}) {
  const bg =
    variant === "primary" ? theme.colors.primary :
    variant === "danger" ? theme.colors.danger :
    theme.colors.card;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: bg, opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style,
      ]}
    >
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
});
