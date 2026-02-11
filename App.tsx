import React, { useEffect } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import { ensureMenuSeeded } from "./src/services/menuService";

export default function App() {
  useEffect(() => {
    ensureMenuSeeded();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </AuthProvider>
  );
}
