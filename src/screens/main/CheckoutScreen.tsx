import React, { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../../styles/theme";
import AppButton from "../../ui/AppButton";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { getMenu } from "../../services/menuService";
import { MenuItem } from "../../models/types";
import { placeOrder } from "../../services/orderService";

export default function CheckoutScreen({ navigation }: any) {
  const { user } = useAuth();
  const { items, getTotal, clearCart } = useCart();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [address, setAddress] = useState(user?.address ?? "");
  const [selectedCardId, setSelectedCardId] = useState<string>(user?.cards?.[0]?.id ?? "");

  useEffect(() => {
    (async () => setMenu(await getMenu()))();
  }, []);

  const total = useMemo(() => getTotal(menu), [menu, items]);

  useEffect(() => {
    if (!user) {
      Alert.alert("Login required", "Please login/register to checkout.");
      navigation.goBack();
    }
  }, [user]);

  const onPlaceOrder = async () => {
    if (!user) return;
    if (items.length === 0) {
      Alert.alert("Cart empty", "Add items to cart first.");
      return;
    }
    if (!address.trim()) {
      Alert.alert("Missing address", "Please provide a drop-off address.");
      return;
    }
    if (!selectedCardId) {
      Alert.alert("Missing card", "Please select a card.");
      return;
    }

    // Payment API: offline MVP -> simulate success
    const ok = true;
    if (!ok) {
      Alert.alert("Payment failed", "Try again.");
      return;
    }

    const order = await placeOrder({
      uid: user.uid,
      dropOffAddress: address.trim(),
      cardId: selectedCardId,
      items,
      total,
    });

    clearCart();
    Alert.alert("Order placed", `Order #${order.id} was placed successfully.`);
    navigation.navigate("Orders");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.header}>Checkout</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Drop-off address</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Enter delivery address"
          placeholderTextColor={theme.colors.muted}
          style={styles.input}
        />
        <Text style={styles.hint}>Default is your profile address, but you can change it here.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Select card</Text>
        {user?.cards?.map((c) => {
          const active = c.id === selectedCardId;
          return (
            <Pressable key={c.id} onPress={() => setSelectedCardId(c.id)} style={[styles.cardRow, active && styles.cardRowActive]}>
              <Text style={[styles.cardText, active && styles.cardTextActive]}>{c.label} • Exp {c.expiry}</Text>
            </Pressable>
          );
        })}
        <Text style={styles.hint}>For this MVP, we simulate payment success.</Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.sumText}>Order Total</Text>
        <Text style={styles.sumValue}>R {total.toFixed(2)}</Text>
      </View>

      <AppButton title="Place Order" onPress={onPlaceOrder} />
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
  hint: { color: theme.colors.muted, marginTop: 8, fontSize: 12 },

  cardRow: {
    marginTop: 10,
    padding: 12,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.bg,
  },
  cardRowActive: { backgroundColor: theme.colors.primary, borderColor: "transparent" },
  cardText: { color: theme.colors.muted, fontWeight: "800" },
  cardTextActive: { color: theme.colors.text },

  summary: {
    marginTop: 14,
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
