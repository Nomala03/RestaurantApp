import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../../styles/theme";
import AppButton from "../../ui/AppButton";
import { getJSON, setJSON } from "../../services/storage";

const KEY = "RESTAURANT_INFO_V1";

type Info = { name: string; address: string; contact: string; about: string };

export default function RestaurantInfoScreen() {
  const [info, setInfo] = useState<Info>({ name: "Savor Italiano", address: "", contact: "", about: "" });

  useEffect(() => {
    (async () => setInfo(await getJSON<Info>(KEY, info)))();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    await setJSON(KEY, info);
    Alert.alert("Saved", "Restaurant info updated.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Restaurant Info</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <TextInput value={info.name} onChangeText={(v) => setInfo((p) => ({ ...p, name: v }))} style={styles.input} placeholderTextColor={theme.colors.muted} />

        <Text style={styles.label}>Address</Text>
        <TextInput value={info.address} onChangeText={(v) => setInfo((p) => ({ ...p, address: v }))} style={styles.input} placeholderTextColor={theme.colors.muted} />

        <Text style={styles.label}>Contact</Text>
        <TextInput value={info.contact} onChangeText={(v) => setInfo((p) => ({ ...p, contact: v }))} style={styles.input} placeholderTextColor={theme.colors.muted} />

        <Text style={styles.label}>About</Text>
        <TextInput
          value={info.about}
          onChangeText={(v) => setInfo((p) => ({ ...p, about: v }))}
          style={[styles.input, { height: 90, textAlignVertical: "top" }]}
          multiline
          placeholderTextColor={theme.colors.muted}
        />

        <AppButton title="Save" onPress={save} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg, padding: 16 },
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
});
