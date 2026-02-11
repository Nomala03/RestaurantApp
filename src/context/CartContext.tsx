import React, { createContext, useContext, useMemo, useState } from "react";
import { CartItem, MenuItem } from "../models/types";
import { makeId } from "../services/storage";
import { calculateItemTotal } from "../services/menuService";

type CartState = {
  items: CartItem[];
  addToCart: (menuItemId: string, customisation: CartItem["customisation"], quantity: number) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  updateCustomisation: (cartItemId: string, customisation: CartItem["customisation"]) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  getTotal: (menu: MenuItem[]) => number;
};

const CartContext = createContext<CartState | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const value = useMemo<CartState>(() => ({
    items,
    addToCart: (menuItemId, customisation, quantity) => {
      setItems((prev) => [{ id: makeId("cart"), menuItemId, customisation, quantity }, ...prev]);
    },
    updateQuantity: (cartItemId, quantity) => {
      setItems((prev) => prev.map((i) => (i.id === cartItemId ? { ...i, quantity: Math.max(1, quantity) } : i)));
    },
    updateCustomisation: (cartItemId, customisation) => {
      setItems((prev) => prev.map((i) => (i.id === cartItemId ? { ...i, customisation } : i)));
    },
    removeFromCart: (cartItemId) => setItems((prev) => prev.filter((i) => i.id !== cartItemId)),
    clearCart: () => setItems([]),
    getTotal: (menu) => {
      return items.reduce((sum, ci) => {
        const mi = menu.find((m) => m.id === ci.menuItemId);
        if (!mi) return sum;
        return sum + calculateItemTotal(mi, ci.customisation.extrasSelected, ci.quantity);
      }, 0);
    },
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
