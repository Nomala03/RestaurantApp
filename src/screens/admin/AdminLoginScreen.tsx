import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../../styles/theme";
import AppButton from "../../ui/AppButton";

const ADMIN_EMAIL = "admin@savor.com";
const ADMIN_PASS = "Admin@123";

export default function AdminLoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const login = () => {
    if (email.trim().toLowerCase() === ADMIN_EMAIL && pass === ADMIN_PASS) {
      navigation.navigate("Admin");
      return;
    }
    Alert.alert("Admin login failed", "Wrong admin credentials.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>
      <Text style={styles.sub}>Use: admin@savor.com / Admin@123</Text>

      <TextInput value={email} onChangeText={setEmail} placeholder="Admin email" placeholderTextColor={theme.colors.muted} autoCapitalize="none" style={styles.input} />
      <TextInput value={pass} onChangeText={setPass} placeholder="Password" placeholderTextColor={theme.colors.muted} secureTextEntry style={styles.input} />

      <AppButton title="Login as Admin" onPress={login} />
      <AppButton title="Back" variant="secondary" onPress={() => navigation.goBack()} style={{ marginTop: 10 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg, padding: 18, justifyContent: "center" },
  title: { color: theme.colors.text, fontSize: 28, fontWeight: "900" },
  sub: { color: theme.colors.muted, marginTop: 6, marginBottom: 18 },
  input: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    padding: 12,
    color: theme.colors.text,
    marginBottom: 12,
  },
});
