import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import AppButton from "../../ui/AppButton";
import { theme } from "../../styles/theme";
import { useAuth } from "../../context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any>;

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    try {
      await login(email.trim(), password);
    } catch (e: any) {
      Alert.alert("Login failed", e.message ?? "Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Savor Italiano</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={theme.colors.muted}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={theme.colors.muted}
        secureTextEntry
        style={styles.input}
      />

      <AppButton title="Login" onPress={onLogin} />

      <AppButton
        title="Create an account"
        variant="secondary"
        onPress={() => navigation.navigate("Register")}
        style={{ marginTop: 10 }}
      />

      <Text style={styles.adminLink} onPress={() => navigation.getParent()?.navigate("AdminAuth")}>
        Admin? Tap here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg, padding: 18, justifyContent: "center" },
  title: { color: theme.colors.text, fontSize: 32, fontWeight: "700" },
  subtitle: { color: theme.colors.muted, marginBottom: 18, marginTop: 6 },
  input: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    padding: 12,
    color: theme.colors.text,
    marginBottom: 12,
  },
  adminLink: { color: theme.colors.muted, marginTop: 14, textAlign: "center", textDecorationLine: "underline" },
});
