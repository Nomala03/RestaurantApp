export type UID = string;

export type Card = {
  id: string;
  label: string;          // e.g. "Visa •••• 4242"
  holderName: string;
  last4: string;
  expiry: string;         // "12/28"
};

export type UserProfile = {
  uid: UID;
  name: string;
  surname: string;
  email: string;
  contactNumber: string;
  address: string;
  cards: Card[];
};

export type MenuCategory =
  | "Starters"
  | "Mains"
  | "Burgers"
  | "Desserts"
  | "Beverages"
  | "Mocktails";

export type ExtraOption = {
  id: string;
  name: string;
  price: number; // add-on (can be 0 for included options)
};

export type IncludedChoiceGroup = {
  id: string;
  title: string;                 // e.g. "Choose 1 side"
  maxSelect: number;             // e.g. 1 or 2
  options: ExtraOption[];        // price can be 0 if included
};

export type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  includedChoiceGroups: IncludedChoiceGroup[]; // sides/drink included
  extras: ExtraOption[];                       // add-on extras
  removableIngredients: string[];              // user can remove
};

export type CartItemCustomisation = {
  includedSelections: Record<string, string[]>; // groupId -> optionIds
  extrasSelected: string[];                     // extra ids
  removedIngredients: string[];                 // ingredient strings
  note?: string;
};

export type CartItem = {
  id: string; // unique in cart
  menuItemId: string;
  quantity: number;
  customisation: CartItemCustomisation;
};

export type Order = {
  id: string;
  uid: UID; // link order -> user
  createdAtISO: string;
  dropOffAddress: string;
  cardId: string;
  items: CartItem[];
  total: number;
  status: "Placed" | "Preparing" | "Out for delivery" | "Delivered";
};
