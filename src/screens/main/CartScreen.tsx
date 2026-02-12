import React, { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../../styles/theme";
import AppButton from "../../ui/AppButton";
import { useCart } from "../../context/CartContext";
import { getMenu } from "../../services/menuService";
import { MenuItem } from "../../models/types";
import { useAuth } from "../../context/AuthContext";

export default function CartScreen({ navigation }: any) {
  const { user } = useAuth();
  const { items, updateQuantity, removeFromCart, clearCart, getTotal } = useCart();
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    (async () => setMenu(await getMenu()))();
  }, []);

  const total = useMemo(() => getTotal(menu), [menu, items]);

  const getName = (menuItemId: string) => menu.find((m) => m.id === menuItemId)?.name ?? "Item";
  const getExtrasCount = (id: string) => items.find((x) => x.id === id)?.customisation.extrasSelected.length ?? 0;

  const onCheckout = () => {
    if (!user) {
      Alert.alert("Login required", "Please register/login to checkout.", [
        { text: "Cancel", style: "cancel" },
        { text: "Login", onPress: () => navigation.getParent()?.navigate("Auth") },
      ]);
      return;
    }
    navigation.navigate("Checkout");
  };

  const confirmClear = () => {
    if (items.length === 0) return;
    Alert.alert("Clear cart?", "Remove all items from cart?", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: clearCart },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart</Text>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={{ color: theme.colors.muted }}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ gap: 12, paddingVertical: 12 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{getName(item.menuItemId)}</Text>
                  <Text style={styles.meta}>
                    Qty: {item.quantity} • Extras: {getExtrasCount(item.id)}
                  </Text>

                  <View style={styles.row}>
                    <Pressable onPress={() => updateQuantity(item.id, item.quantity - 1)} style={styles.smallBtn}>
                      <Text style={styles.smallBtnText}>−</Text>
                    </Pressable>
                    <Pressable onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.smallBtn}>
                      <Text style={styles.smallBtnText}>+</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate("EditCartItem", { cartItemId: item.id })} style={styles.linkBtn}>
                      <Text style={styles.linkText}>Edit extras</Text>
                    </Pressable>
                  </View>
                </View>

                <Pressable onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
                  <Text style={styles.removeText}>Remove</Text>
                </Pressable>
              </View>
            )}
          />

          <View style={styles.summary}>
            <Text style={styles.sumText}>Total</Text>
            <Text style={styles.sumValue}>R {total.toFixed(2)}</Text>
          </View>

          <AppButton title="Checkout" onPress={onCheckout} />
          <AppButton title="Clear Cart" variant="danger" onPress={confirmClear} style={{ marginTop: 10 }} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg, padding: 16 },
  header: { color: theme.colors.text, fontSize: 26, fontWeight: "900" },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  card: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  name: { color: theme.colors.text, fontWeight: "900" },
  meta: { color: theme.colors.muted, marginTop: 4 },
  row: { flexDirection: "row", gap: 10, marginTop: 10, alignItems: "center" },
  smallBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderColor: theme.colors.border,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  smallBtnText: { color: theme.colors.text, fontSize: 18, fontWeight: "900" },
  linkBtn: { marginLeft: 6 },
  linkText: { color: theme.colors.text, textDecorationLine: "underline", fontWeight: "800" },
  removeBtn: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12, backgroundColor: theme.colors.bg },
  removeText: { color: theme.colors.danger, fontWeight: "900" },
  summary: {
    marginTop: 6,
    marginBottom: 10,
    padding: 12,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sumText: { color: theme.colors.muted, fontWeight: "900" },
  sumValue: { color: theme.colors.text, fontWeight: "900", fontSize: 18 },
});
