import { Order } from "./types"

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    items: [{ name: "Royal Cheese Burger", quantity: 2 }],
    total: 45.5,
    status: "pending",
    timestamp: "2025-11-05 10:30 AM",
    notes: "Antar ke Gedung A, Kamar 101",
    paymentProof: "https://i.ibb.co/6WfHnR1/sample-proof.jpg",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    items: [
      { name: "The Classics for 3", quantity: 1 },
      { name: "Iced Drink", quantity: 2 },
    ],
    total: 58.75,
    status: "confirmed",
    timestamp: "2025-11-05 11:15 AM",
    notes: "Tambahkan saus ekstra",
  },
  {
    id: "ORD-003",
    customer: "Bob Wilson",
    items: [{ name: "Classic Burger with Fries", quantity: 3 }],
    total: 72.25,
    status: "pending",
    timestamp: "2025-11-05 12:00 PM",
  },
]