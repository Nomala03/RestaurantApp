import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../../styles/theme";
import AppButton from "../../ui/AppButton";
import { deleteMenuItem, getMenu, upsertMenuItem } from "../../services/menuService";
import { MenuItem } from "../../models/types";
import { makeId } from "../../services/storage";

export default function ManageFoodScreen() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("99");
  const [category, setCategory] = useState("Mains");
  const [desc, setDesc] = useState("");

  const refresh = async () => setMenu(await getMenu());

  useEffect(() => { refresh(); }, []);

  const add = async () => {
    if (!name.trim()) return Alert.alert("Missing", "Name is required.");
    const item: MenuItem = {
      id: makeId("menu"),
      category: category as any,
      name: name.trim(),
      description: desc.trim() || "Tasty and fresh.",
      basePrice: Number(price) || 0,
      imageUrl: "https://picsum.photos/500/300?random=" + Math.floor(Math.random() * 1000),
      includedChoiceGroups: [],
      extras: [],
      removableIngredients: [],
    };
    await upsertMenuItem(item);
    setName(""); setDesc("");
    await refresh();
    Alert.alert("Added", "Menu item added.");
  };

  const remove = async (id: string) => {
    await deleteMenuItem(id);
    await refresh();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Food</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Add new item</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Name" placeholderTextColor={theme.colors.muted} style={styles.input} />
        <TextInput value={category} onChangeText={setCategory} placeholder="Category (Mains, Burgers...)" placeholderTextColor={theme.colors.muted} style={styles.input} />
        <TextInput value={price} onChangeText={setPrice} placeholder="Price" placeholderTextColor={theme.colors.muted} style={styles.input} keyboardType="numeric" />
        <TextInput value={desc} onChangeText={setDesc} placeholder="Description" placeholderTextColor={theme.colors.muted} style={[styles.input, { height: 80, textAlignVertical: "top" }]} multiline />
        <AppButton title="Add Item" onPress={add} />
      </View>

      <FlatList
        data={menu}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ paddingVertical: 12, gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemMeta}>{item.category} • R {item.basePrice.toFixed(2)}</Text>
            </View>
            <AppButton title="Delete" variant="danger" onPress={() => remove(item.id)} style={{ paddingHorizontal: 14 }} />
          </View>
        )}
      />
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
  label: { color: theme.colors.text, fontWeight: "900" },
  input: {
    marginTop: 10,
    backgroundColor: theme.colors.bg,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    padding: 12,
    color: theme.colors.text,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: 12,
  },
  itemName: { color: theme.colors.text, fontWeight: "900" },
  itemMeta: { color: theme.colors.muted, marginTop: 4 },
});
