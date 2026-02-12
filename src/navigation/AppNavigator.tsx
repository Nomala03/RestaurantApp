import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../context/AuthContext";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import HomeScreen from "../screens/main/HomeScreen";
import ItemDetailsScreen from "../screens/main/ItemDetailsScreen";
import CartScreen from "../screens/main/CartScreen";
import EditCartItemScreen from "../screens/main/EditCartItemScreen";
import CheckoutScreen from "../screens/main/CheckoutScreen";
import OrdersScreen from "../screens/main/OrdersScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import AdminLoginScreen from "../screens/admin/AdminLoginScreen";
import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen";
import RestaurantInfoScreen from "../screens/admin/RestaurantInfoScreen";
import OrderHistoryScreen from "../screens/admin/OrderHistoryScreen";

/*
import ManageFoodScreen from "../screens/admin/ManageFoodScreen";

*/
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;

  ItemDetails: { menuItemId: string };
  EditCartItem: { cartItemId: string };
  Checkout: undefined;

  AdminAuth: undefined;
  Admin: undefined;
  ManageFood: undefined;
  RestaurantInfo: undefined;
  OrderHistory: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();
const AuthStackNav = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Cart" component={CartScreen} />
      <Tabs.Screen name="Orders" component={OrdersScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

function AuthStack() {
  return (
    <AuthStackNav.Navigator>
      <AuthStackNav.Screen name="Login" component={LoginScreen} />
      <AuthStackNav.Screen name="Register" component={RegisterScreen} />
    </AuthStackNav.Navigator>
  );
}
export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="ItemDetails"
          component={ItemDetailsScreen}
          options={{ title: "View Item" }}
        />
        <Stack.Screen name="EditCartItem" component={EditCartItemScreen} options={{ title: "Edit Item" }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Checkout" }} />
<Stack.Screen name="AdminAuth" component={AdminLoginScreen} options={{ title: "Admin Login" }} />
     <Stack.Screen name="Admin" component={AdminDashboardScreen} options={{ title: "Admin Dashboard" }} />    
     <Stack.Screen name="RestaurantInfo" component={RestaurantInfoScreen} options={{ title: "Restaurant Info" }} />
     <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: "Order History" }} />

     {/* 
        <Stack.Screen name="ManageFood" component={ManageFoodScreen} options={{ title: "Manage Food" }} />
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
