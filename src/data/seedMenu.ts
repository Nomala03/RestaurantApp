import { MenuItem } from "../models/types";

export const seedMenu: MenuItem[] = [
  // =========================
  // STARTERS (ANTIPASTI)
  // =========================
  {
    id: "st1",
    category: "Starters",
    name: "Bruschetta Classica",
    description: "Toasted ciabatta topped with tomatoes, basil, olive oil, and garlic.",
    basePrice: 65,
    image: require("../../assets/menu/bruschetta.jpg"),
    includedChoiceGroups: [],
    extras: [
      { id: "st1e1", name: "Extra Balsamic Glaze", price: 6 },
      { id: "st1e2", name: "Add Mozzarella", price: 15 },
      { id: "st1e3", name: "Extra Tomato", price: 8 },
    ],
    removableIngredients: ["Garlic", "Basil"],
  },
  {
    id: "st2",
    category: "Starters",
    name: "Caprese Salad",
    description: "Fresh mozzarella, vine tomatoes, basil, olive oil, balsamic glaze.",
    basePrice: 75,
    image: require("../../assets/menu/caprese.jpg"),
    includedChoiceGroups: [],
    extras: [
      { id: "st2e1", name: "Extra Mozzarella", price: 18 },
      { id: "st2e2", name: "Avocado", price: 15 },
      { id: "st2e3", name: "Olives", price: 12 },
    ],
    removableIngredients: ["Balsamic glaze", "Basil"],
  },
  {
    id: "st3",
    category: "Starters",
    name: "Arancini",
    description: "Golden fried risotto balls stuffed with mozzarella, served with marinara.",
    basePrice: 85,
    image: require("../../assets/menu/arancini.jpg"),
    includedChoiceGroups: [
      {
        id: "st3g1",
        title: "Choose 1 dip (included)",
        maxSelect: 1,
        options: [
          { id: "st3d1", name: "Marinara", price: 0 },
          { id: "st3d2", name: "Garlic Aioli", price: 0 },
        ],
      },
    ],
    extras: [
      { id: "st3e1", name: "Extra Dip", price: 8 },
      { id: "st3e2", name: "Parmesan Sprinkle", price: 6 },
    ],
    removableIngredients: ["Parmesan"],
  },

  // =========================
  // MAINS (PASTA / RISOTTO / PIZZA)
  // =========================
  {
    id: "m1",
    category: "Mains",
    name: "Creamy Alfredo Pasta",
    description: "Fettuccine, parmesan, cream, garlic, herbs.",
    basePrice: 110,
    image: require("../../assets/menu/alfredo.jpg"),
    includedChoiceGroups: [
      {
        id: "m1g1",
        title: "Choose 1 side (included)",
        maxSelect: 1,
        options: [
          { id: "m1s1", name: "Side Salad", price: 0 },
          { id: "m1s2", name: "Garlic Bread", price: 0 },
        ],
      },
      {
        id: "m1g2",
        title: "Choose 1 drink (included)",
        maxSelect: 1,
        options: [
          { id: "m1d1", name: "Still Water", price: 0 },
          { id: "m1d2", name: "Sparkling Water", price: 0 },
        ],
      },
    ],
    extras: [
      { id: "m1e1", name: "Grilled Chicken", price: 25 },
      { id: "m1e2", name: "Mushrooms", price: 15 },
      { id: "m1e3", name: "Extra Parmesan", price: 10 },
      { id: "m1e4", name: "Chilli Flakes", price: 5 },
    ],
    removableIngredients: ["Garlic", "Parmesan", "Cream"],
  },
  {
    id: "m2",
    category: "Mains",
    name: "Spaghetti Bolognese",
    description: "Slow-cooked beef ragu, tomatoes, garlic, Italian herbs.",
    basePrice: 120,
    image: require("../../assets/menu/bolognese.jpg"),
    includedChoiceGroups: [
      {
        id: "m2g1",
        title: "Choose 1 side (included)",
        maxSelect: 1,
        options: [
          { id: "m2s1", name: "Garlic Bread", price: 0 },
          { id: "m2s2", name: "Side Salad", price: 0 },
        ],
      },
    ],
    extras: [
      { id: "m2e1", name: "Extra Meat Sauce", price: 25 },
      { id: "m2e2", name: "Extra Parmesan", price: 10 },
      { id: "m2e3", name: "Chilli Oil", price: 8 },
    ],
    removableIngredients: ["Garlic", "Parmesan"],
  },
  {
    id: "m3",
    category: "Mains",
    name: "Seafood Risotto",
    description: "Creamy arborio rice with prawns, calamari, herbs, lemon.",
    basePrice: 165,
    image: require("../../assets/menu/seafood_risotto.jpg"),
    includedChoiceGroups: [
      {
        id: "m3g1",
        title: "Choose 1 side (included)",
        maxSelect: 1,
        options: [
          { id: "m3s1", name: "Side Salad", price: 0 },
          { id: "m3s2", name: "Garlic Bread", price: 0 },
        ],
      },
    ],
    extras: [
      { id: "m3e1", name: "Extra Prawns", price: 35 },
      { id: "m3e2", name: "Chilli Flakes", price: 5 },
      { id: "m3e3", name: "Extra Lemon", price: 4 },
    ],
    removableIngredients: ["Garlic", "Chilli flakes"],
  },

  // Pizza (kept under "Mains")
  {
    id: "pz1",
    category: "Mains",
    name: "Margherita Pizza",
    description: "Wood-fired pizza with tomato sauce, mozzarella, fresh basil.",
    basePrice: 95,
    image: require("../../assets/menu/margherita.jpg"),
    includedChoiceGroups: [
      {
        id: "pz1g1",
        title: "Choose 1 crust (included)",
        maxSelect: 1,
        options: [
          { id: "pz1c1", name: "Classic Crust", price: 0 },
          { id: "pz1c2", name: "Thin Crust", price: 0 },
        ],
      },
    ],
    extras: [
      { id: "pz1e1", name: "Extra Mozzarella", price: 15 },
      { id: "pz1e2", name: "Mushrooms", price: 15 },
      { id: "pz1e3", name: "Olives", price: 12 },
      { id: "pz1e4", name: "Chilli Flakes", price: 5 },
    ],
    removableIngredients: ["Basil", "Cheese"],
  },
  {
    id: "pz2",
    category: "Mains",
    name: "Diavola Pizza",
    description: "Wood-fired pizza with mozzarella, spicy salami, chilli flakes.",
    basePrice: 125,
    image: require("../../assets/menu/diavola.jpg"),
    includedChoiceGroups: [
      {
        id: "pz2g1",
        title: "Choose 1 crust (included)",
        maxSelect: 1,
        options: [
          { id: "pz2c1", name: "Classic Crust", price: 0 },
          { id: "pz2c2", name: "Thin Crust", price: 0 },
        ],
      },
    ],
    extras: [
      { id: "pz2e1", name: "Extra Salami", price: 20 },
      { id: "pz2e2", name: "Extra Mozzarella", price: 15 },
      { id: "pz2e3", name: "Jalapeños", price: 12 },
    ],
    removableIngredients: ["Chilli flakes", "Cheese"],
  },
  {
    id: "pz3",
    category: "Mains",
    name: "Quattro Formaggi Pizza",
    description: "Wood-fired pizza with mozzarella, parmesan, gorgonzola, ricotta.",
    basePrice: 135,
    image: require("../../assets/menu/quattro_formaggi.jpg"),
    includedChoiceGroups: [
      {
        id: "pz3g1",
        title: "Choose 1 crust (included)",
        maxSelect: 1,
        options: [
          { id: "pz3c1", name: "Classic Crust", price: 0 },
          { id: "pz3c2", name: "Thin Crust", price: 0 },
        ],
      },
    ],
    extras: [
      { id: "pz3e1", name: "Extra Cheese", price: 18 },
      { id: "pz3e2", name: "Mushrooms", price: 15 },
    ],
    removableIngredients: ["Gorgonzola", "Parmesan"],
  },

  // =========================
  // BURGERS
  // =========================
  {
    id: "b1",
    category: "Burgers",
    name: "Italian Beef Burger",
    description: "Beef patty, tomato, basil mayo, mozzarella, pickles.",
    basePrice: 115,
    image: require("../../assets/menu/italian_burger.jpg"),
    includedChoiceGroups: [
      {
        id: "b1g1",
        title: "Choose up to 2 sides (included)",
        maxSelect: 2,
        options: [
          { id: "b1s1", name: "Chips", price: 0 },
          { id: "b1s2", name: "Pap", price: 0 },
          { id: "b1s3", name: "Side Salad", price: 0 },
        ],
      },
      {
        id: "b1g2",
        title: "Choose 1 sauce (included)",
        maxSelect: 1,
        options: [
          { id: "b1sa1", name: "Basil Mayo", price: 0 },
          { id: "b1sa2", name: "BBQ Sauce", price: 0 },
          { id: "b1sa3", name: "Chilli Mayo", price: 0 },
        ],
      },
    ],
    extras: [
      { id: "b1e1", name: "Extra Chips", price: 20 },
      { id: "b1e2", name: "Cheese Slice", price: 10 },
      { id: "b1e3", name: "Bacon", price: 18 },
      { id: "b1e4", name: "Sauce (extra)", price: 6 },
    ],
    removableIngredients: ["Pickles", "Cheese", "Basil mayo", "Tomato"],
  },

  // =========================
  // DESSERTS
  // =========================
  {
    id: "ds1",
    category: "Desserts",
    name: "Tiramisu",
    description: "Coffee-soaked sponge, mascarpone cream, cocoa dusting.",
    basePrice: 75,
    image: require("../../assets/menu/tiramisu.jpg"),
    includedChoiceGroups: [],
    extras: [
      { id: "ds1e1", name: "Extra Cocoa Dusting", price: 5 },
      { id: "ds1e2", name: "Whipped Cream", price: 10 },
    ],
    removableIngredients: ["Cocoa"],
  },
  {
    id: "ds2",
    category: "Desserts",
    name: "Panna Cotta",
    description: "Silky vanilla panna cotta served with berry compote.",
    basePrice: 70,
    image: require("../../assets/menu/panna_cotta.jpg"),
    includedChoiceGroups: [
      {
        id: "ds2g1",
        title: "Choose 1 topping (included)",
        maxSelect: 1,
        options: [
          { id: "ds2t1", name: "Berry Compote", price: 0 },
          { id: "ds2t2", name: "Caramel", price: 0 },
        ],
      },
    ],
    extras: [
      { id: "ds2e1", name: "Extra Topping", price: 10 },
      { id: "ds2e2", name: "Crushed Nuts", price: 12 },
    ],
    removableIngredients: ["Caramel"],
  },
  {
    id: "ds3",
    category: "Desserts",
    name: "Cannoli",
    description: "Crisp pastry tubes filled with sweet ricotta cream.",
    basePrice: 65,
    image: require("../../assets/menu/cannoli.jpg"),
    includedChoiceGroups: [],
    extras: [
      { id: "ds3e1", name: "Chocolate Chips", price: 10 },
      { id: "ds3e2", name: "Crushed Pistachio", price: 12 },
    ],
    removableIngredients: ["Chocolate chips", "Pistachio"],
  },

  // =========================
  // BEVERAGES
  // =========================
  {
    id: "bv1",
    category: "Beverages",
    name: "Soft Drink",
    description: "Coke, Coke Zero, Fanta, Sprite (chilled).",
    basePrice: 25,
    image: require("../../assets/menu/soft_drink.jpg"),
    includedChoiceGroups: [
      {
        id: "bv1g1",
        title: "Choose 1 drink",
        maxSelect: 1,
        options: [
          { id: "bv1o1", name: "Coke", price: 0 },
          { id: "bv1o2", name: "Coke Zero", price: 0 },
          { id: "bv1o3", name: "Fanta", price: 0 },
          { id: "bv1o4", name: "Sprite", price: 0 },
        ],
      },
      {
        id: "bv1g2",
        title: "Choose 1 size (included)",
        maxSelect: 1,
        options: [
          { id: "bv1s1", name: "Regular", price: 0 },
          { id: "bv1s2", name: "Large", price: 10 },
        ],
      },
    ],
    extras: [
      { id: "bv1e1", name: "Extra Ice", price: 0 },
      { id: "bv1e2", name: "Lemon Slice", price: 3 },
    ],
    removableIngredients: [],
  },
  {
    id: "bv2",
    category: "Beverages",
    name: "Italian Soda",
    description: "Sparkling Italian-style soda. Blood Orange or Lemon & Mint.",
    basePrice: 35,
    image: require("../../assets/menu/italian_soda.jpg"),
    includedChoiceGroups: [
      {
        id: "bv2g1",
        title: "Choose 1 flavour (included)",
        maxSelect: 1,
        options: [
          { id: "bv2f1", name: "Blood Orange", price: 0 },
          { id: "bv2f2", name: "Lemon & Mint", price: 0 },
        ],
      },
    ],
    extras: [
      { id: "bv2e1", name: "Extra Mint", price: 4 },
      { id: "bv2e2", name: "Extra Lemon", price: 4 },
    ],
    removableIngredients: ["Mint"],
  },
  {
    id: "bv3",
    category: "Beverages",
    name: "Coffee",
    description: "Espresso, Cappuccino, or Latte (freshly brewed).",
    basePrice: 35,
    image: require("../../assets/menu/coffee.jpg"),
    includedChoiceGroups: [
      {
        id: "bv3g1",
        title: "Choose 1 type",
        maxSelect: 1,
        options: [
          { id: "bv3t1", name: "Espresso", price: 0 },
          { id: "bv3t2", name: "Cappuccino", price: 5 },
          { id: "bv3t3", name: "Latte", price: 8 },
        ],
      },
      {
        id: "bv3g2",
        title: "Choose 1 milk (included)",
        maxSelect: 1,
        options: [
          { id: "bv3m1", name: "Full Cream", price: 0 },
          { id: "bv3m2", name: "Low Fat", price: 0 },
          { id: "bv3m3", name: "Oat Milk", price: 8 },
        ],
      },
    ],
    extras: [
      { id: "bv3e1", name: "Extra Shot", price: 10 },
      { id: "bv3e2", name: "Vanilla Syrup", price: 8 },
    ],
    removableIngredients: [],
  },

  // =========================
  // MOCKTAILS
  // =========================
  {
    id: "mk1",
    category: "Mocktails",
    name: "Italian Sunset",
    description: "Citrus, grenadine, sparkling fizz (non-alcoholic).",
    basePrice: 55,
    image: require("../../assets/menu/italian_sunset.jpg"),
    includedChoiceGroups: [
      {
        id: "mk1g1",
        title: "Choose 1 sweetness level (included)",
        maxSelect: 1,
        options: [
          { id: "mk1sw1", name: "Less Sweet", price: 0 },
          { id: "mk1sw2", name: "Regular", price: 0 },
          { id: "mk1sw3", name: "Extra Sweet", price: 0 },
        ],
      },
    ],
    extras: [
      { id: "mk1e1", name: "Extra Fizz", price: 5 },
      { id: "mk1e2", name: "Extra Citrus", price: 6 },
    ],
    removableIngredients: ["Grenadine"],
  },
  {
    id: "mk2",
    category: "Mocktails",
    name: "Amalfi Cooler",
    description: "Lemon, mint, cucumber, sparkling water (non-alcoholic).",
    basePrice: 55,
    image: require("../../assets/menu/amalfi_cooler.jpg"),
    includedChoiceGroups: [
      {
        id: "mk2g1",
        title: "Choose 1 strength (included)",
        maxSelect: 1,
        options: [
          { id: "mk2st1", name: "Light", price: 0 },
          { id: "mk2st2", name: "Regular", price: 0 },
          { id: "mk2st3", name: "Extra Minty", price: 0 },
        ],
      },
    ],
    extras: [
      { id: "mk2e1", name: "Extra Cucumber", price: 5 },
      { id: "mk2e2", name: "Extra Lemon", price: 4 },
    ],
    removableIngredients: ["Mint", "Cucumber"],
  },
];
