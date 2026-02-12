import React, { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../../styles/theme";
import AppButton from "../../ui/AppButton";
import { useCart } from "../../context/CartContext";
import { getMenu } from "../../services/menuService";
import { MenuItem } from "../../models/types";

export default function EditCartItemScreen({ route, navigation }: any) {
  const { cartItemId } = route.params;
  const { items, updateCustomisation } = useCart();

  const cartItem = items.find((i) => i.id === cartItemId);
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);

  const [extrasSelected, setExtrasSelected] = useState<string[]>(cartItem?.customisation.extrasSelected ?? []);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>(cartItem?.customisation.removedIngredients ?? []);

  useEffect(() => {
    (async () => {
      const menu = await getMenu();
      if (!cartItem) return;
      setMenuItem(menu.find((m) => m.id === cartItem.menuItemId) ?? null);
    })();
  }, [cartItemId]);

  const includedSelections = useMemo(() => cartItem?.customisation.includedSelections ?? {}, [cartItem]);

  if (!cartItem || !menuItem) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: theme.colors.muted }}>Item not found.</Text>
      </View>
    );
  }

  const toggleExtra = (id: string) => {
    setExtrasSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const toggleRemove = (ing: string) => {
    setRemovedIngredients((prev) => (prev.includes(ing) ? prev.filter((x) => x !== ing) : [...prev, ing]));
  };

  const save = () => {
    updateCustomisation(cartItem.id, { includedSelections, extrasSelected, removedIngredients });
    Alert.alert("Saved", "Cart item updated.");
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>{menuItem.name}</Text>

      <View style={styles.card}>
        <Text style={styles.section}>Extras</Text>
        <View style={styles.wrap}>
          {menuItem.extras.map((e) => {
            const active = extrasSelected.includes(e.id);
            return (
              <Pressable key={e.id} onPress={() => toggleExtra(e.id)} style={[styles.pill, active && styles.pillActive]}>
                <Text style={[styles.pillText, active && styles.pillTextActive]}>{e.name} (+R {e.price})</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.section}>Remove ingredients</Text>
        <View style={styles.wrap}>
          {menuItem.removableIngredients.map((ing) => {
            const active = removedIngredients.includes(ing);
            return (
              <Pressable key={ing} onPress={() => toggleRemove(ing)} style={[styles.pill, active && styles.pillDanger]}>
                <Text style={[styles.pillText, active && styles.pillTextActive]}>{ing}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <AppButton title="Save Changes" onPress={save} />
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  title: { color: theme.colors.text, fontSize: 22, fontWeight: "900", paddingHorizontal: 16, paddingTop: 10 },
  card: {
    marginTop: 14,
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: 12,
    marginHorizontal: 16,
  },
  section: { color: theme.colors.text, fontWeight: "900" },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.bg,
  },
  pillActive: { backgroundColor: theme.colors.primary, borderColor: "transparent" },
  pillDanger: { backgroundColor: theme.colors.danger, borderColor: "transparent" },
  pillText: { color: theme.colors.muted, fontWeight: "700" },
  pillTextActive: { color: theme.colors.text },
});
