import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { theme } from "../../styles/theme";
import { getOrders } from "../../services/orderService";
import { Order } from "../../models/types";

export default function OrderHistoryScreen() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => setOrders(await getOrders()))();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order History</Text>

      <FlatList
        data={orders}
        keyExtractor={(o) => o.id}
        contentContainerStyle={{ paddingVertical: 12, gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.id}>#{item.id}</Text>
            <Text style={styles.meta}>UID: {item.uid}</Text>
            <Text style={styles.meta}>Total: R {item.total.toFixed(2)}</Text>
            <Text style={styles.meta}>Status: {item.status}</Text>
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
