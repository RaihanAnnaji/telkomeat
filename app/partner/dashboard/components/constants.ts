import { SalesData, Order } from "./types"

export const SALES_DATA: SalesData[] = [
  { date: "Sen", orders: 12, revenue: 250.5 },
  { date: "Sel", orders: 15, revenue: 320.75 },
  { date: "Rab", orders: 10, revenue: 210.0 },
  { date: "Kam", orders: 18, revenue: 380.25 },
  { date: "Jum", orders: 22, revenue: 450.5 },
  { date: "Sab", orders: 25, revenue: 520.0 },
  { date: "Min", orders: 20, revenue: 420.75 },
]

export const RECENT_ORDERS: Order[] = [
  { id: "ORD-001", customer: "John Doe", items: 3, amount: 45.5, status: "Selesai" },
  { id: "ORD-002", customer: "Jane Smith", items: 2, amount: 32.0, status: "Menunggu" },
  { id: "ORD-003", customer: "Bob Wilson", items: 4, amount: 58.75, status: "Selesai" },
  { id: "ORD-004", customer: "Alice Brown", items: 2, amount: 28.0, status: "Diproses" },
  { id: "ORD-005", customer: "Charlie Davis", items: 5, amount: 72.25, status: "Selesai" },
]