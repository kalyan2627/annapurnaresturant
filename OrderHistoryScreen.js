import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ORDERS = [
  {
    id: "ORD-2024-1183",
    date: "18 Jun 2025",
    time: "7:42 PM",
    status: "Delivered",
    statusColor: "#43a047",
    statusBg: "#e8f5e9",
    statusIcon: "checkmark-circle",
    deliveryAddress: "Home – Banjara Hills",
    items: [
      { name: "Paneer Butter Masala", qty: 1, price: 220 },
      { name: "Butter Naan (×2)", qty: 2, price: 60 },
      { name: "Mango Lassi", qty: 1, price: 90 },
    ],
    subtotal: 370,
    discount: 130,
    deliveryFee: 0,
    total: 240,
  },
  {
    id: "ORD-2024-1044",
    date: "29 May 2025",
    time: "1:15 PM",
    status: "Delivered",
    statusColor: "#43a047",
    statusBg: "#e8f5e9",
    statusIcon: "checkmark-circle",
    deliveryAddress: "Work – HITEC City",
    items: [
      { name: "Chicken Biryani", qty: 1, price: 280 },
      { name: "Raita", qty: 1, price: 50 },
      { name: "Gulab Jamun (×2)", qty: 2, price: 70 },
    ],
    subtotal: 400,
    discount: 70,
    deliveryFee: 30,
    total: 360,
  },
  {
    id: "ORD-2024-0876",
    date: "4 Apr 2025",
    time: "8:05 PM",
    status: "Cancelled",
    statusColor: "#e53935",
    statusBg: "#ffebee",
    statusIcon: "close-circle",
    deliveryAddress: "Home – Banjara Hills",
    items: [
      { name: "Veg Thali (Special)", qty: 2, price: 360 },
      { name: "Sweet Lassi", qty: 2, price: 100 },
    ],
    subtotal: 460,
    discount: 40,
    deliveryFee: 0,
    total: 420,
  },
  {
    id: "ORD-2024-0712",
    date: "10 Mar 2025",
    time: "12:50 PM",
    status: "Delivered",
    statusColor: "#43a047",
    statusBg: "#e8f5e9",
    statusIcon: "checkmark-circle",
    deliveryAddress: "Parents – Old City",
    items: [
      { name: "Dal Tadka", qty: 1, price: 160 },
      { name: "Jeera Rice", qty: 1, price: 130 },
      { name: "Masala Papad (×3)", qty: 3, price: 60 },
      { name: "Kheer", qty: 1, price: 80 },
    ],
    subtotal: 430,
    discount: 80,
    deliveryFee: 0,
    total: 350,
  },
];

export default function OrderHistoryScreen({ navigation }) {
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#1a1a2e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {ORDERS.map((order) => {
          const isOpen = expanded === order.id;
          return (
            <View key={order.id} style={styles.card}>
              {/* ORDER TOP */}
              <TouchableOpacity style={styles.cardTop} onPress={() => toggle(order.id)} activeOpacity={0.75}>
                <View style={styles.orderMeta}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <View style={styles.dateRow}>
                    <Ionicons name="calendar-outline" size={12} color="#aaa" />
                    <Text style={styles.dateText}>{order.date}  ·  {order.time}</Text>
                  </View>
                  <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={12} color="#aaa" />
                    <Text style={styles.locationText}>{order.deliveryAddress}</Text>
                  </View>
                </View>

                <View style={styles.orderRight}>
                  <View style={[styles.statusChip, { backgroundColor: order.statusBg }]}>
                    <Ionicons name={order.statusIcon} size={13} color={order.statusColor} />
                    <Text style={[styles.statusText, { color: order.statusColor }]}>{order.status}</Text>
                  </View>
                  <Text style={styles.totalAmt}>₹{order.total}</Text>
                  <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={16}
                    color="#ccc"
                    style={{ marginTop: 8 }}
                  />
                </View>
              </TouchableOpacity>

              {/* EXPANDED DETAILS */}
              {isOpen && (
                <View style={styles.expandedBody}>
                  <View style={styles.itemsHeader}>
                    <Text style={styles.itemsTitle}>Items Ordered</Text>
                  </View>
                  {order.items.map((item, idx) => (
                    <View key={idx} style={styles.itemRow}>
                      <View style={styles.itemDot} />
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemPrice}>₹{item.price}</Text>
                    </View>
                  ))}

                  {/* BILL SUMMARY */}
                  <View style={styles.billBox}>
                    <View style={styles.billRow}>
                      <Text style={styles.billKey}>Subtotal</Text>
                      <Text style={styles.billVal}>₹{order.subtotal}</Text>
                    </View>
                    {order.discount > 0 && (
                      <View style={styles.billRow}>
                        <Text style={[styles.billKey, { color: "#43a047" }]}>Discount</Text>
                        <Text style={[styles.billVal, { color: "#43a047" }]}>–₹{order.discount}</Text>
                      </View>
                    )}
                    <View style={styles.billRow}>
                      <Text style={styles.billKey}>Delivery Fee</Text>
                      <Text style={styles.billVal}>
                        {order.deliveryFee === 0 ? "Free" : `₹${order.deliveryFee}`}
                      </Text>
                    </View>
                    <View style={[styles.billRow, styles.billTotal]}>
                      <Text style={styles.billTotalKey}>Total Paid</Text>
                      <Text style={styles.billTotalVal}>₹{order.total}</Text>
                    </View>
                  </View>

                  {/* REORDER */}
                  {order.status !== "Cancelled" && (
                    <TouchableOpacity style={styles.reorderBtn}>
                      <Ionicons name="refresh-outline" size={16} color="#ff5722" />
                      <Text style={styles.reorderText}>Reorder</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#faf9f7" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 54,
    paddingHorizontal: 18,
    marginBottom: 20,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0ece8",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { fontSize: 20, fontFamily: "PoppinsSemiBold", color: "#1a1a2e" },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 18,
    marginBottom: 14,
    elevation: 2,
    overflow: "hidden",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  orderMeta: { flex: 1 },
  orderId: { fontFamily: "PoppinsSemiBold", fontSize: 14, color: "#1a1a2e", marginBottom: 5 },
  dateRow: { flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 4 },
  dateText: { fontFamily: "PoppinsRegular", fontSize: 12, color: "#888" },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  locationText: { fontFamily: "PoppinsRegular", fontSize: 12, color: "#888" },

  orderRight: { alignItems: "flex-end" },
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 6,
  },
  statusText: { fontFamily: "PoppinsMedium", fontSize: 11 },
  totalAmt: { fontFamily: "PoppinsBold", fontSize: 16, color: "#1a1a2e" },

  // EXPANDED
  expandedBody: {
    borderTopWidth: 1,
    borderTopColor: "#f0ece8",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 12,
  },
  itemsHeader: { marginBottom: 8 },
  itemsTitle: { fontFamily: "PoppinsSemiBold", fontSize: 13, color: "#1a1a2e" },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    gap: 8,
  },
  itemDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ff5722",
  },
  itemName: { flex: 1, fontFamily: "PoppinsRegular", fontSize: 13, color: "#444" },
  itemPrice: { fontFamily: "PoppinsMedium", fontSize: 13, color: "#1a1a2e" },

  billBox: {
    backgroundColor: "#faf9f7",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    marginBottom: 12,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  billKey: { fontFamily: "PoppinsRegular", fontSize: 13, color: "#888" },
  billVal: { fontFamily: "PoppinsMedium", fontSize: 13, color: "#444" },
  billTotal: {
    borderTopWidth: 1,
    borderTopColor: "#e0dbd6",
    marginTop: 6,
    paddingTop: 8,
  },
  billTotalKey: { fontFamily: "PoppinsSemiBold", fontSize: 14, color: "#1a1a2e" },
  billTotalVal: { fontFamily: "PoppinsBold", fontSize: 14, color: "#ff5722" },

  reorderBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#ff5722",
    borderRadius: 12,
    paddingVertical: 10,
    gap: 6,
    backgroundColor: "#fff0eb",
  },
  reorderText: { fontFamily: "PoppinsSemiBold", fontSize: 13, color: "#ff5722" },
});
