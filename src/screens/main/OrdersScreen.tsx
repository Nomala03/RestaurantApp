import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { theme } from "../../styles/theme";
import { useAuth } from "../../context/AuthContext";
import { getOrdersByUID } from "../../services/orderService";
import { Order } from "../../models/types";

export default function OrdersScreen() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      setOrders(await getOrdersByUID(user.uid));
    })();
  }, [user]);

  if (!user) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: theme.colors.muted }}>Login to view your orders.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={(o) => o.id}
        contentContainerStyle={{ paddingVertical: 12, gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.id}>#{item.id}</Text>
            <Text style={styles.meta}>Status: {item.status}</Text>
            <Text style={styles.meta}>Total: R {item.total.toFixed(2)}</Text>
            <Text style={styles.meta}>Address: {item.dropOffAddress}</Text>
            <Text style={styles.meta}>Date: {new Date(item.createdAtISO).toLocaleString()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: theme.colors.muted, marginTop: 14 }}>No orders yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg, padding: 16 },
  header: { color: theme.colors.text, fontSize: 26, fontWeight: "900" },
  card: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: 12,
  },
  id: { color: theme.colors.text, fontWeight: "900" },
  meta: { color: theme.colors.muted, marginTop: 4 },
});
