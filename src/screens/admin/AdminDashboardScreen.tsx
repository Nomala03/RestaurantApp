import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../../styles/theme";
import AppButton from "../../ui/AppButton";
import { getOrders } from "../../services/orderService";
import { Order } from "../../models/types";
import { LineChart, BarChart } from "react-native-chart-kit";

const POINT_WIDTH = 52; // spacing per data point (increase if labels overlap)

export default function AdminDashboardScreen({ navigation }: any) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [cardInnerWidth, setCardInnerWidth] = useState(0);

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

  // make chart width responsive + scrollable if many points
  const chartWidth = Math.max(cardInnerWidth, labels.length * POINT_WIDTH);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.header}>Admin Dashboard</Text>

      {/* ORDERS CHART */}
      <View
        style={styles.card}
        onLayout={(e) => {
          const w = e.nativeEvent.layout.width;
          // card padding is 12 left + 12 right => subtract 24 to fit chart inside
          setCardInnerWidth(w - 24);
        }}
      >
        <Text style={styles.title}>Orders (last 7 days)</Text>

        {cardInnerWidth > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <BarChart
              width={chartWidth}
              height={220}
              data={{ labels, datasets: [{ data: counts.length ? counts : [0] }] }}
              fromZero
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={chartConfigTight}
              style={{ ...styles.chart, marginLeft: -8 }} // pulls y-axis closer to card edge
            />
          </ScrollView>
        )}
      </View>

      {/* REVENUE CHART */}
      <View style={styles.card}>
        <Text style={styles.title}>Revenue (last 7 days)</Text>

        {cardInnerWidth > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              width={chartWidth}
              height={220}
              data={{
                labels,
                datasets: [{ data: revenue.length ? revenue : [0] }],
              }}
              chartConfig={chartConfigTight}
              style={{ ...styles.chart, marginLeft: -8 }} // pulls y-axis closer to card edge
              bezier
            />
          </ScrollView>
        )}
      </View>

      <AppButton title="Manage Food Items" onPress={() => navigation.navigate("ManageFood")} />
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

// tighter config to bring y-axis closer + reduce inner padding
const chartConfigTight = {
  backgroundGradientFrom: theme.colors.card,
  backgroundGradientTo: theme.colors.card,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(244,244,246,${opacity})`,
  labelColor: (opacity = 1) => `rgba(184,184,194,${opacity})`,

  // key part: reduce internal left padding
  paddingLeft: 6,

  // optional: remove dashed background lines style (helps visual tightness)
  propsForBackgroundLines: {
    strokeDasharray: "",
  },

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
  chart: {
    borderRadius: theme.radius.lg,
  },
});
  