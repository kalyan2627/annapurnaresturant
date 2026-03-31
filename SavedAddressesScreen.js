import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const INITIAL_ADDRESSES = [
  {
    id: "1",
    tag: "Home",
    tagIcon: "🏠",
    name: "Annapurna User",
    line1: "Flat 4B, Sunshine Apartments",
    line2: "Road No. 5, Banjara Hills",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500034",
    phone: "98765 43210",
    isDefault: true,
  },
  {
    id: "2",
    tag: "Work",
    tagIcon: "💼",
    name: "Annapurna User",
    line1: "3rd Floor, Cyber Towers, Block B",
    line2: "HITEC City, Madhapur",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    phone: "98765 43210",
    isDefault: false,
  },
  {
    id: "3",
    tag: "Parents",
    tagIcon: "👨‍👩‍👧",
    name: "Ravi Kumar",
    line1: "H.No 12-4-56, Ashok Nagar",
    line2: "Near Water Tank, Old City",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500024",
    phone: "91234 56789",
    isDefault: false,
  },
  {
    id: "4",
    tag: "Other",
    tagIcon: "📍",
    name: "Suresh Reddy",
    line1: "Plot 77, Sri Nagar Colony",
    line2: "Ameerpet",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500016",
    phone: "99887 66554",
    isDefault: false,
  },
];

const TAG_STYLES = {
  Home:    { bg: "#e8f5e9", color: "#43a047" },
  Work:    { bg: "#e3f2fd", color: "#1e88e5" },
  Parents: { bg: "#fff3e0", color: "#fb8c00" },
  Other:   { bg: "#f3e5f5", color: "#8e24aa" },
  House:   { bg: "#e8f5e9", color: "#43a047" },
  Office:  { bg: "#e3f2fd", color: "#1e88e5" },
};

export default function SavedAddressScreen({ navigation }) {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const setDefault = (id) =>
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));

  const doDelete = () => {
    setAddresses((prev) => prev.filter((a) => a.id !== deleteTarget));
    setDeleteTarget(null);
  };

  const handleEdit = (addr) => {
    navigation.navigate("EditAddress", {
      address: addr,
      onSave: (updated) => {
        setAddresses((prev) =>
          prev.map((a) => (a.id === updated.id ? updated : a))
        );
      },
    });
  };

  const handleAdd = () => {
    navigation.navigate("EditAddress", {
      address: null,
      onSave: (newAddr) => {
        setAddresses((prev) => [...prev, newAddr]);
      },
    });
  };

  return (
    <View style={styles.container}>

      {/* Delete Confirm Modal */}
      <Modal visible={!!deleteTarget} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalIcon}>🗑️</Text>
            <Text style={styles.modalTitle}>Delete Address?</Text>
            <Text style={styles.modalSub}>
              This address will be permanently removed.
            </Text>
            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setDeleteTarget(null)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={doDelete}>
                <Text style={styles.deleteBtnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#1a1a2e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Addresses</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Address List */}
      <ScrollView
        style={styles.listScroll}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {addresses.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No saved addresses yet</Text>
          </View>
        )}

        {addresses.map((addr) => {
          const ts = TAG_STYLES[addr.tag] || TAG_STYLES["Other"];
          return (
            <View
              key={addr.id}
              style={[styles.addrCard, addr.isDefault && styles.addrCardDefault]}
            >
              {/* Top Row */}
              <View style={styles.cardTopRow}>
                <View style={[styles.tagChip, { backgroundColor: ts.bg }]}>
                  <Text style={[styles.tagChipText, { color: ts.color }]}>
                    {addr.tagIcon} {addr.tag}
                  </Text>
                </View>
                {addr.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>✓ Default</Text>
                  </View>
                )}
              </View>

              {/* Body */}
              <Text style={styles.addrName}>{addr.name}</Text>
              <Text style={styles.addrLine}>{addr.line1},</Text>
              {addr.line2 ? (
                <Text style={styles.addrLine}>{addr.line2},</Text>
              ) : null}
              <Text style={styles.addrLine}>
                {addr.city}, {addr.state} – {addr.pincode}
              </Text>
              <Text style={styles.addrPhone}>📞 {addr.phone}</Text>

              {/* Actions */}
              <View style={styles.actionsRow}>
                {!addr.isDefault && (
                  <TouchableOpacity
                    style={styles.actBtn}
                    onPress={() => setDefault(addr.id)}
                  >
                    <Text style={[styles.actBtnText, { color: "#ff5722" }]}>
                      ◎ Set Default
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.actBtn}
                  onPress={() => handleEdit(addr)}
                >
                  <Text style={[styles.actBtnText, { color: "#1a1a2e" }]}>
                    ✏️ Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actBtn}
                  onPress={() => setDeleteTarget(addr.id)}
                >
                  <Text style={[styles.actBtnText, { color: "#e53935" }]}>
                    🗑️ Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Add Button */}
      <View style={styles.addBtnWrapper}>
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>＋ Add New Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf9f7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 54,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0ece8",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a2e",
  },
  listScroll: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyText: {
    color: "#aaa",
    fontSize: 15,
  },
  addrCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  addrCardDefault: {
    borderColor: "#ff5722",
    backgroundColor: "#fffaf8",
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  tagChip: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  tagChipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  defaultBadge: {
    backgroundColor: "#fff0eb",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  defaultBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#ff5722",
  },
  addrName: {
    fontWeight: "700",
    fontSize: 14,
    color: "#1a1a2e",
    marginBottom: 3,
  },
  addrLine: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
  },
  addrPhone: {
    fontSize: 12,
    color: "#888",
    marginTop: 6,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0ece8",
  },
  actBtn: {
    padding: 0,
  },
  actBtnText: {
    fontSize: 13,
    fontWeight: "600",
  },
  addBtnWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#faf9f7",
    borderTopWidth: 1,
    borderTopColor: "#f0ece8",
  },
  addBtn: {
    backgroundColor: "#ff5722",
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#ff5722",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  addBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  // Modal
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 28,
    width: 300,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 60,
    elevation: 20,
  },
  modalIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  modalTitle: {
    fontWeight: "700",
    fontSize: 17,
    color: "#1a1a2e",
    marginBottom: 6,
  },
  modalSub: {
    fontSize: 13,
    color: "#888",
    marginBottom: 20,
    textAlign: "center",
  },
  modalBtns: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: "#e0dbd5",
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  deleteBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#e53935",
  },
  deleteBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
});