import { MenuItem } from "../models/types";

export const seedMenu: MenuItem[] = [
  {
    id: "m1",
    category: "Mains",
    name: "Creamy Alfredo Pasta",
    description: "Fettuccine, parmesan, cream, garlic, herbs.",
    basePrice: 110,
    imageUrl: "https://picsum.photos/500/300?random=11",
    includedChoiceGroups: [
      {
        id: "g1",
        title: "Choose 1 side",
        maxSelect: 1,
        options: [
          { id: "s1", name: "Side Salad", price: 0 },
          { id: "s2", name: "Garlic Bread", price: 0 },
        ],
      },
      {
        id: "g2",
        title: "Choose 1 drink (included)",
        maxSelect: 1,
        options: [
          { id: "d1", name: "Still Water", price: 0 },
          { id: "d2", name: "Sparkling Water", price: 0 },
        ],
      },
    ],
    extras: [
      { id: "e1", name: "Extra Chicken", price: 25 },
      { id: "e2", name: "Extra Parmesan", price: 10 },
      { id: "e3", name: "Chilli Flakes", price: 5 },
    ],
    removableIngredients: ["Garlic", "Parmesan", "Cream"],
  },
  {
    id: "b1",
    category: "Burgers",
    name: "Italian Beef Burger",
    description: "Beef patty, tomato, basil mayo, cheese, pickles.",
    basePrice: 95,
    imageUrl: "https://picsum.photos/500/300?random=22",
    includedChoiceGroups: [
      {
        id: "g3",
        title: "Choose up to 2 sides",
        maxSelect: 2,
        options: [
          { id: "s3", name: "Chips", price: 0 },
          { id: "s4", name: "Pap", price: 0 },
          { id: "s5", name: "Coleslaw", price: 0 },
        ],
      },
    ],
    extras: [
      { id: "e4", name: "Extra Chips", price: 15 },
      { id: "e5", name: "Sauce (BBQ)", price: 5 },
      { id: "e6", name: "Cheese Slice", price: 8 },
    ],
    removableIngredients: ["Pickles", "Cheese", "Basil mayo"],
  },
];
