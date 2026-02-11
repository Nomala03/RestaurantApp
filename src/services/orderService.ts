import { getJSON, setJSON, makeId } from "./storage";
import { Order } from "../models/types";

const ORDERS_KEY = "ORDERS_V1";

export async function getOrders(): Promise<Order[]> {
  return getJSON<Order[]>(ORDERS_KEY, []);
}

export async function getOrdersByUID(uid: string): Promise<Order[]> {
  const all = await getOrders();
  return all.filter((o) => o.uid === uid);
}

export async function placeOrder(order: Omit<Order, "id" | "createdAtISO" | "status">) {
  const all = await getOrders();
  const full: Order = {
    ...order,
    id: makeId("order"),
    createdAtISO: new Date().toISOString(),
    status: "Placed",
  };
  await setJSON(ORDERS_KEY, [full, ...all]);
  return full;
}
