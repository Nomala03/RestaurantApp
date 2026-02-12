import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../../styles/theme";
import AppButton from "../../ui/AppButton";
import { getOrders } from "../../services/orderService";
import { Order } from "../../models/types";
import { LineChart, BarChart } from "react-native-chart-kit";

export default function AdminDashboardScreen({ navigation }: any) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => setOrders(await getOrders()))();
  }, []);

  const { labels, counts, revenue } = useMemo(() => {
    // last 7 days buckets
    const buckets: { label: string; count: number; revenue: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = `${d.getDate()}/${d.getMonth() + 1}`;
      buckets.push({ label, count: 0, revenue: 0 });
    }

    orders.forEach((o) => {
      const od = new Date(o.createdAtISO);
      const key = `${od.getDate()}/${od.getMonth() + 1}`;
      const b = buckets.find((x) => x.label === key);
      if (b) {
        b.count += 1;
        b.revenue += o.total;
      }
    });

    return {
      labels: buckets.map((b) => b.label),
      counts: buckets.map((b) => b.count),
      revenue: buckets.map((b) => Math.round(b.revenue)),
    };
  }, [orders]);

  const width = Dimensions.get("window").width - 32;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.header}>Admin Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Orders (last 7 days)</Text>
        <BarChart
          width={width}
          height={220}
          data={{ labels, datasets: [{ data: counts.length ? counts : [0] }] }}
          fromZero
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          style={{ borderRadius: theme.radius.lg }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Revenue (last 7 days)</Text>
        <LineChart
          width={width}
          height={220}
          data={{
            labels,
            datasets: [{ data: revenue.length ? revenue : [0] }],
          }}
          chartConfig={chartConfig}
          style={{ borderRadius: theme.radius.lg }}
        />
      </View>

      <AppButton
        title="Manage Food Items"
        onPress={() => navigation.navigate("ManageFood")}
      />
      <AppButton
        title="Restaurant Info"
        variant="secondary"
        onPress={() => navigation.navigate("RestaurantInfo")}
        style={{ marginTop: 10 }}
      />
      <AppButton
        title="Order History"
        variant="secondary"
        onPress={() => navigation.navigate("OrderHistory")}
        style={{ marginTop: 10 }}
      />
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: theme.colors.card,
  backgroundGradientTo: theme.colors.card,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(244,244,246,${opacity})`,
  labelColor: (opacity = 1) => `rgba(184,184,194,${opacity})`,
  propsForDots: { r: "4" },
};

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
  title: { color: theme.colors.text, fontWeight: "900", marginBottom: 10 },
});
