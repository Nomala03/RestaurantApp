import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AppButton from "../../ui/AppButton";
import { theme } from "../../styles/theme";
import { useAuth } from "../../context/AuthContext";
import { Card } from "../../models/types";
import { makeId } from "../../services/storage";

export default function RegisterScreen() {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  // card details (fake ok for testing)
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = async () => {
    try {
      if (!name || !surname || !contactNumber || !address || !email || !password) {
        Alert.alert("Missing info", "Please fill in all required fields.");
        return;
      }

      const last4 = cardNumber.replace(/\s/g, "").slice(-4) || "0000";
      const card: Card = {
        id: makeId("card"),
        label: `Card •••• ${last4}`,
        holderName: cardHolder || `${name} ${surname}`,
        last4,
        expiry: expiry || "12/28",
      };

      await register(
        { name, surname, email: email.trim(), contactNumber, address, cards: [card] },
        password
      );
    } catch (e: any) {
      Alert.alert("Registration failed", e.message ?? "Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 18 }}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Register to place orders</Text>

      <Text style={styles.section}>Personal</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Name" placeholderTextColor={theme.colors.muted} style={styles.input} />
      <TextInput value={surname} onChangeText={setSurname} placeholder="Surname" placeholderTextColor={theme.colors.muted} style={styles.input} />
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={theme.colors.muted} autoCapitalize="none" style={styles.input} />
      <TextInput value={contactNumber} onChangeText={setContactNumber} placeholder="Contact number" placeholderTextColor={theme.colors.muted} style={styles.input} />
      <TextInput value={address} onChangeText={setAddress} placeholder="Address" placeholderTextColor={theme.colors.muted} style={styles.input} />

      <Text style={styles.section}>Card (testing allowed)</Text>
      <TextInput value={cardHolder} onChangeText={setCardHolder} placeholder="Card holder name" placeholderTextColor={theme.colors.muted} style={styles.input} />
      <TextInput value={cardNumber} onChangeText={setCardNumber} placeholder="Card number" placeholderTextColor={theme.colors.muted} style={styles.input} />
      <TextInput value={expiry} onChangeText={setExpiry} placeholder="Expiry (MM/YY)" placeholderTextColor={theme.colors.muted} style={styles.input} />

      <Text style={styles.section}>Security</Text>
      <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor={theme.colors.muted} secureTextEntry style={styles.input} />

      <AppButton title="Register" onPress={onRegister} />
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  title: { color: theme.colors.text, fontSize: 28, fontWeight: "700" },
  subtitle: { color: theme.colors.muted, marginBottom: 18, marginTop: 6 },
  section: { color: theme.colors.text, marginTop: 10, marginBottom: 8, fontWeight: "800" },
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
