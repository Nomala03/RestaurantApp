import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../../styles/theme";
import { MenuItem } from "../../models/types";
import { getMenu } from "../../services/menuService";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any>;

export default function HomeScreen({ navigation }: Props) {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [category, setCategory] = useState<string>("All");

  useEffect(() => {
    (async () => setMenu(await getMenu()))();
  }, []);

  const categories = useMemo(() => ["All", ...Array.from(new Set(menu.map((m) => m.category)))], [menu]);

  const filtered = useMemo(
    () => (category === "All" ? menu : menu.filter((m) => m.category === category)),
    [menu, category]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menus</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(x) => x}
        style={{ maxHeight: 44 }}
        contentContainerStyle={{ gap: 10, paddingVertical: 8 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setCategory(item)}
            style={[styles.chip, item === category && styles.chipActive]}
          >
            <Text style={[styles.chipText, item === category && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        )}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 12, gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
              <Text style={styles.price}>R {item.basePrice.toFixed(2)}</Text>

              <Pressable
                onPress={() => navigation.navigate("ItemDetails", { menuItemId: item.id })}
                style={styles.viewBtn}
              >
                <Text style={styles.viewBtnText}>View Item</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg, padding: 16 },
  header: { color: theme.colors.text, fontSize: 26, fontWeight: "900", marginBottom: 6 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  chipActive: { backgroundColor: theme.colors.primary, borderColor: "transparent" },
  chipText: { color: theme.colors.muted, fontWeight: "700" },
  chipTextActive: { color: theme.colors.text },
  card: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: 12,
  },
  image: { width: 110, height: 90, borderRadius: theme.radius.md, backgroundColor: "#222" },
  name: { color: theme.colors.text, fontSize: 16, fontWeight: "800" },
  desc: { color: theme.colors.muted, marginTop: 4 },
  price: { color: theme.colors.text, marginTop: 8, fontWeight: "900" },
  viewBtn: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
  },
  viewBtnText: { color: theme.colors.text, fontWeight: "800" },
});
