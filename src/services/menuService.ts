import { getJSON, setJSON } from "./storage";
import { MenuItem } from "../models/types";
import { seedMenu } from "../data/seedMenu";

const MENU_KEY = "MENU_ITEMS_V1";

export async function ensureMenuSeeded() {
  const current = await getJSON<MenuItem[]>(MENU_KEY, []);
  if (current.length === 0) await setJSON(MENU_KEY, seedMenu);
}

export async function getMenu(): Promise<MenuItem[]> {
  return getJSON<MenuItem[]>(MENU_KEY, seedMenu);
}

export async function upsertMenuItem(item: MenuItem) {
  const menu = await getMenu();
  const idx = menu.findIndex((m) => m.id === item.id);
  const updated = idx >= 0 ? menu.map((m) => (m.id === item.id ? item : m)) : [item, ...menu];
  await setJSON(MENU_KEY, updated);
}

export async function deleteMenuItem(id: string) {
  const menu = await getMenu();
  await setJSON(MENU_KEY, menu.filter((m) => m.id !== id));
}

export function calculateItemTotal(menuItem: MenuItem, extrasSelected: string[], quantity: number) {
  const extrasTotal = menuItem.extras
    .filter((e) => extrasSelected.includes(e.id))
    .reduce((sum, e) => sum + e.price, 0);

  return (menuItem.basePrice + extrasTotal) * quantity;
}
