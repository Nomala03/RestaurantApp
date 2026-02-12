import React, { useEffect, useMemo, useState } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../../styles/theme";
import { MenuItem } from "../../models/types";
import { getMenu, calculateItemTotal } from "../../services/menuService";
import AppButton from "../../ui/AppButton";
import { useCart } from "../../context/CartContext";

export default function ItemDetailsScreen({ route, navigation }: any) {
  const { menuItemId } = route.params;
  const { addToCart } = useCart();

  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  // selections
  const [includedSelections, setIncludedSelections] = useState<Record<string, string[]>>({});
  const [extrasSelected, setExtrasSelected] = useState<string[]>([]);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const menu = await getMenu();
      const found = menu.find((m) => m.id === menuItemId) ?? null;
      setMenuItem(found);

      if (found) {
        // prefill included groups with empty arrays
        const init: Record<string, string[]> = {};
        found.includedChoiceGroups.forEach((g) => (init[g.id] = []));
        setIncludedSelections(init);
      }
    })();
  }, [menuItemId]);

  const total = useMemo(() => {
    if (!menuItem) return 0;
    return calculateItemTotal(menuItem, extrasSelected, quantity);
  }, [menuItem, extrasSelected, quantity]);

  if (!menuItem) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: theme.colors.muted }}>Item not found.</Text>
      </View>
    );
  }

  const toggleIncluded = (groupId: string, optionId: string, maxSelect: number) => {
    setIncludedSelections((prev) => {
      const current = prev[groupId] ?? [];
      const exists = current.includes(optionId);
      if (exists) return { ...prev, [groupId]: current.filter((x) => x !== optionId) };

      // enforce maxSelect
      if (current.length >= maxSelect) {
        return { ...prev, [groupId]: [...current.slice(1), optionId] };
      }
      return { ...prev, [groupId]: [...current, optionId] };
    });
  };

  const toggleExtra = (extraId: string) => {
    setExtrasSelected((prev) => (prev.includes(extraId) ? prev.filter((x) => x !== extraId) : [...prev, extraId]));
  };

  const toggleRemovedIngredient = (ingredient: string) => {
    setRemovedIngredients((prev) =>
      prev.includes(ingredient) ? prev.filter((x) => x !== ingredient) : [...prev, ingredient]
    );
  };

  const onAdd = () => {
    addToCart(
      menuItem.id,
      { includedSelections, extrasSelected, removedIngredients },
      quantity
    );
    Alert.alert("Added to cart", "Your item was added to the cart.");
    navigation.navigate("Cart");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Image source={{ uri: menuItem.imageUrl }} style={styles.hero} />
      <Text style={styles.title}>{menuItem.name}</Text>
      <Text style={styles.desc}>{menuItem.description}</Text>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Included choices</Text>

        {menuItem.includedChoiceGroups.map((g) => (
          <View key={g.id} style={{ marginTop: 10 }}>
            <Text style={styles.groupTitle}>{g.title}</Text>
            <Text style={styles.groupHint}>Select up to {g.maxSelect}</Text>

            <View style={styles.wrap}>
              {g.options.map((opt) => {
                const active = (includedSelections[g.id] ?? []).includes(opt.id);
                return (
                  <Pressable
                    key={opt.id}
                    onPress={() => toggleIncluded(g.id, opt.id, g.maxSelect)}
                    style={[styles.pill, active && styles.pillActive]}
                  >
                    <Text style={[styles.pillText, active && styles.pillTextActive]}>{opt.name}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Extras (adds to total)</Text>
        <View style={styles.wrap}>
          {menuItem.extras.map((e) => {
            const active = extrasSelected.includes(e.id);
            return (
              <Pressable key={e.id} onPress={() => toggleExtra(e.id)} style={[styles.pill, active && styles.pillActive]}>
                <Text style={[styles.pillText, active && styles.pillTextActive]}>
                  {e.name} (+R {e.price})
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Remove ingredients (optional)</Text>
        <View style={styles.wrap}>
          {menuItem.removableIngredients.map((ing) => {
            const active = removedIngredients.includes(ing);
            return (
              <Pressable key={ing} onPress={() => toggleRemovedIngredient(ing)} style={[styles.pill, active && styles.pillDanger]}>
                <Text style={[styles.pillText, active && styles.pillTextActive]}>{ing}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.qtyRow}>
        <Text style={styles.sectionTitle}>Quantity</Text>
        <View style={styles.qtyControls}>
          <Pressable onPress={() => setQuantity((q) => Math.max(1, q - 1))} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>−</Text>
          </Pressable>
          <Text style={styles.qtyValue}>{quantity}</Text>
          <Pressable onPress={() => setQuantity((q) => q + 1)} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>+</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>R {total.toFixed(2)}</Text>
      </View>

      <AppButton title="Add to Cart" onPress={onAdd} />
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  hero: { width: "100%", height: 200, borderRadius: theme.radius.lg, backgroundColor: "#222" },
  title: { color: theme.colors.text, fontSize: 22, fontWeight: "900", marginTop: 12 },
  desc: { color: theme.colors.muted, marginTop: 6, lineHeight: 20 },

  sectionCard: {
    marginTop: 14,
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: 12,
  },
  sectionTitle: { color: theme.colors.text, fontWeight: "900" },
  groupTitle: { color: theme.colors.text, fontWeight: "800", marginTop: 8 },
  groupHint: { color: theme.colors.muted, marginTop: 2, fontSize: 12 },

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

  qtyRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qtyControls: { flexDirection: "row", alignItems: "center", gap: 12 },
  qtyBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: { color: theme.colors.text, fontSize: 22, fontWeight: "900" },
  qtyValue: { color: theme.colors.text, fontSize: 18, fontWeight: "900", width: 30, textAlign: "center" },

  totalRow: { marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  totalLabel: { color: theme.colors.muted, fontWeight: "800" },
  totalValue: { color: theme.colors.text, fontWeight: "900", fontSize: 18 },
});
