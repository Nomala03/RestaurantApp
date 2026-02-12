import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../../styles/theme";
import { useAuth } from "../../context/AuthContext";
import AppButton from "../../ui/AppButton";
import { makeId } from "../../services/storage";

export default function ProfileScreen() {
  const { user, update, logout } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardExpiry, setNewCardExpiry] = useState("");

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    setAddress(user.address);
    setContactNumber(user.contactNumber);
  }, [user]);

  if (!user) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: theme.colors.muted }}>Login to access your profile.</Text>
      </View>
    );
  }

  const onSave = async () => {
    try {
      await update({ ...user, name, email, address, contactNumber });
      Alert.alert("Saved", "Profile updated.");
    } catch (e: any) {
      Alert.alert("Error", e.message ?? "Could not update profile.");
    }
  };

  const addCard = async () => {
    const last4 = newCardNumber.replace(/\s/g, "").slice(-4);
    if (!last4) {
      Alert.alert("Missing card", "Enter a card number (fake is ok).");
      return;
    }
    const next = {
      ...user,
      cards: [
        ...user.cards,
        {
          id: makeId("card"),
          label: `Card •••• ${last4}`,
          holderName: `${user.name} ${user.surname}`,
          last4,
          expiry: newCardExpiry || "12/28",
        },
      ],
    };
    await update(next);
    setNewCardNumber("");
    setNewCardExpiry("");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholderTextColor={theme.colors.muted} />
        <Text style={styles.label}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" style={styles.input} placeholderTextColor={theme.colors.muted} />
        <Text style={styles.label}>Address</Text>
        <TextInput value={address} onChangeText={setAddress} style={styles.input} placeholderTextColor={theme.colors.muted} />
        <Text style={styles.label}>Contact number</Text>
        <TextInput value={contactNumber} onChangeText={setContactNumber} style={styles.input} placeholderTextColor={theme.colors.muted} />

        <AppButton title="Save Profile" onPress={onSave} />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Cards</Text>
        {user.cards.map((c) => (
          <Text key={c.id} style={styles.cardLine}>• {c.label} (Exp {c.expiry})</Text>
        ))}

        <Text style={[styles.label, { marginTop: 12 }]}>Add new card (testing)</Text>
        <TextInput value={newCardNumber} onChangeText={setNewCardNumber} style={styles.input} placeholder="Card number" placeholderTextColor={theme.colors.muted} />
        <TextInput value={newCardExpiry} onChangeText={setNewCardExpiry} style={styles.input} placeholder="Expiry (MM/YY)" placeholderTextColor={theme.colors.muted} />
        <AppButton title="Add Card" variant="secondary" onPress={addCard} />
      </View>

      <AppButton title="Logout" variant="danger" onPress={logout} />
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  header: { color: theme.colors.text, fontSize: 26, fontWeight: "900" },
  card: {
    marginTop: 14,
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: 12,
  },
  label: { color: theme.colors.text, fontWeight: "900", marginTop: 10 },
  input: {
    marginTop: 8,
    backgroundColor: theme.colors.bg,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    padding: 12,
    color: theme.colors.text,
  },
  cardLine: { color: theme.colors.muted, marginTop: 6 },
});
