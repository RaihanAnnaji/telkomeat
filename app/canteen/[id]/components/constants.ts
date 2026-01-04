import { CanteenInfo, MenuItem } from "./types"

export const CANTEENS: Record<string, CanteenInfo> = {
  kaf: {
    id: "1", // ← tambahkan id sesuai database
    name: "Kantin Kaf",
    location: "Gedung DC",
    distance: " Pesanan Tiba 20-30 menit",
    hours: "Buka 06:00 - 17:00",
    operationalHours: [
      { day: "Senin", hours: "06:00  - 17:00" },
      { day: "Selasa", hours: "06:00  - 17:00" },
      { day: "Rabu", hours: "06:00  - 17:00" },
      { day: "Kamis", hours: "06:00  - 17:00" },
      { day: "Jumat", hours: "06:00  - 17:00" },
    ],
    phone: "+62 857-4712-3410",
    image:
      "/images/kantin_kaf.jpg",
  },

  neo01: {
    id: "2", // ← sesuai database
    name: "Kantin Neo01",
    location: "Gedung DC",
    distance: " Pesanan Tiba 20-30 menit",
    hours: "Buka 06:00 - 17:00",
    operationalHours: [
      { day: "Senin", hours: "06:00  - 17:00" },
      { day: "Selasa", hours: "06:00  - 17:00" },
      { day: "Rabu", hours: "06:00  - 17:00" },
      { day: "Kamis", hours: "06:00  - 17:00" },
      { day: "Jumat", hours: "06:00  - 17:00" },
    ],
    phone: "+62 822-2511-7860",
    image:
      "/images/kantin_neoo1.jpg",
  },
}


export const MENU_ITEMS: MenuItem[] = [
  // Makanan
  {
    id: "1",
    name: "Royal Cheese Burger with Soda",
    description: "Cheeseburger* | Big Mac** | McChicken***",
    price: 23.1,
    image: "/royal-cheese-burger-combo.jpg",
    category: "makanan",
  },
  {
    id: "2",
    name: "The classics for 3",
    description: "Classic Burger* | Fried Chicken | Small soda",
    price: 23.1,
    image: "/burger-fried-chicken-combo.jpg",
    category: "makanan",
  },
  {
    id: "3",
    name: "Fried Chicken Meal",
    description: "Classic Burger* | Fried Chicken | Small soda",
    price: 23.1,
    image: "/fried-chicken-meal.jpg",
    category: "makanan",
  },
  {
    id: "4",
    name: "Chicken Meal Combo",
    description: "Classic Burger* | Fried Chicken | Small soda",
    price: 23.1,
    image: "/chicken-meal.jpg",
    category: "makanan",
  },
  {
    id: "5",
    name: "Burger Combo",
    description: "Classic Burger* | Fried Chicken | Small soda",
    price: 23.1,
    image: "/burger-combo.png",
    category: "makanan",
  },
  {
    id: "6",
    name: "Meal Combo Deluxe",
    description: "Classic Burger* | Fried Chicken | Small soda",
    price: 23.1,
    image: "/meal-combo.jpg",
    category: "makanan",
  },
  // Snack
  {
    id: "7",
    name: "Royal Cheese Burger with Fries",
    description: "Cheeseburger* | Big Mac** | Fries",
    price: 23.1,
    image: "/classic-burger-fries.png",
    category: "snack",
  },
  {
    id: "8",
    name: "French Fries Combo",
    description: "Classic Burger* | French Fries | 3 cold drinks",
    price: 23.1,
    image: "/french-fries-snack.jpg",
    category: "snack",
  },
  {
    id: "9",
    name: "Snack Fries Combo",
    description: "Classic Burger* | French Fries | 3 cold drinks",
    price: 23.1,
    image: "/snack-fries.jpg",
    category: "snack",
  },
  {
    id: "10",
    name: "Crispy Fries",
    description: "Classic Burger* | French Fries | 3 cold drinks",
    price: 23.1,
    image: "/crispy-fries.jpg",
    category: "snack",
  },
  {
    id: "11",
    name: "Snack Combo Box",
    description: "Classic Burger* | French Fries | 3 cold drinks",
    price: 23.1,
    image: "/snack-combo.jpg",
    category: "snack",
  },
  {
    id: "12",
    name: "Fries Combo Large",
    description: "Classic Burger* | French Fries | 3 cold drinks",
    price: 23.1,
    image: "/fries-combo.jpg",
    category: "snack",
  },
  // Minuman
  {
    id: "13",
    name: "Royal Cheese Burger with Drink",
    description: "Cheeseburger* | Big Mac** | Soft Drink",
    price: 23.1,
    image: "/refreshing-soft-drink.png",
    category: "minuman",
  },
  {
    id: "14",
    name: "Iced Drink Combo",
    description: "Classic Burger* | Iced Coffee | 3 cold drinks",
    price: 23.1,
    image: "/iced-drink.jpg",
    category: "minuman",
  },
  {
    id: "15",
    name: "Juice Drink Combo",
    description: "Classic Burger* | Iced Coffee | 3 cold drinks",
    price: 23.1,
    image: "/juice-drink.jpg",
    category: "minuman",
  },
  {
    id: "16",
    name: "Refreshing Beverage",
    description: "Classic Burger* | Iced Coffee | 3 cold drinks",
    price: 23.1,
    image: "/refreshing-beverage.png",
    category: "minuman",
  },
  {
    id: "17",
    name: "Drink Combo",
    description: "Classic Burger* | Iced Coffee | 3 cold drinks",
    price: 23.1,
    image: "/drink-combo.jpg",
    category: "minuman",
  },
  {
    id: "18",
    name: "Cold Drink Selection",
    description: "Classic Burger* | Iced Coffee | 3 cold drinks",
    price: 23.1,
    image: "/cold-drink.jpg",
    category: "minuman",
  },
]