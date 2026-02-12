# Savor Italiano (Expo Go) — React Native + TypeScript (Offline MVP)

An offline restaurant ordering app built with **Expo Go**, **React Native**, **TypeScript**, and **AsyncStorage** as the database.
Includes **User Auth**, **Profile Management**, **Menu Browsing**, **Item Customisation**, **Cart**, **Checkout**, **Order Placement**, and an **Admin Dashboard** with charts.

This project demonstrates full CRUD operations, authentication, state management, navigation, offline persistence, and role-based access (User vs Admin).

---

## Tech Stack

- Expo Go (React Native)
- TypeScript
- React Navigation (Stack + Bottom Tabs)
- AsyncStorage (offline database)
- react-native-chart-kit + react-native-svg (admin charts)
- StyleSheet styling (no external UI library)

---

## How to Run

(bash)
npm install
npx expo start

Scan the QR code using Expo Go on your phone or run on an emulator.

## Admin Credentials (Dev)

Email: `admin@savor.com`
Password: `Admin@123`

Admin access is separate from user login and is used to manage menu items, restaurant info, and view analytics.

## Project Structure

src/
  context/        -> Auth & Cart Context
  data/           -> Seed menu data
  models/         -> Type definitions
  navigation/     -> App navigation
  screens/
    auth/         -> Login & Register
    main/         -> Home, Item, Cart, Checkout, Orders, Profile
    admin/        -> Admin Login, Dashboard, Manage Food, Orders, Info
  services/       -> AsyncStorage logic
  styles/         -> Theme
  ui/             -> Reusable components
App.tsx

## User Features

- Register & Login
- Update profile
- Browse menu by category
- View food items
- Customise food (sides, extras, remove ingredients, quantity)
- Add to cart
- Edit cart items
- Clear cart
- Checkout
- Place orders
- View personal order history

## Admin Features

- Separate admin login
- Dashboard with charts
- Add / delete food items
- Update restaurant info
- View all orders
- See which user (UID) placed each order

## User Flow

1. Register / Login
2. Browse menu
3. View item
4. Customise item
5. Add to cart
6. View cart
7. Checkout (login required)
8. Place order
9. View order history

## Admin Flow

1. Open Admin Login
2. Login as admin
3. View dashboard
4. Manage menu
5. Update restaurant info
6. View order history

## Offline Database

All data is stored using AsyncStorage:

- User
- Menu items
- Orders
- Restaurant info

Data persists even after closing the app.

## Screenshots (Add these)

- Register Screen
- Login Screen
- Home / Menu Screen
- Item Details & Customisation
- Cart Screen
- Checkout Screen
- Orders Screen
- Profile Screen
- Admin Login
- Admin Dashboard (Charts)
- Manage Food Screen
- Order History Screen
