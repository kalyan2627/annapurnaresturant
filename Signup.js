import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import logotp from "./assets/logotp.png";

export default function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = () => {
    if (!username.trim() || !mobile || !password || !confirmPassword) {
      alert("Please enter all details");
      return;
    }
    if (!/^[A-Za-z ]{3,}$/.test(username.trim())) {
      alert("Enter valid full name (only letters)");
      return;
    }
    if (!/^[0-9]{10}$/.test(mobile)) {
      alert("Enter valid 10-digit mobile number");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    navigation.navigate("Otpscreen");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.content}>

            {/* LOGO */}
            <View style={styles.imageContainer}>
              <Image source={logotp} style={styles.image} />
            </View>

            {/* TABS */}
            <View style={styles.tabs}>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.inactiveTab}>Login</Text>
              </TouchableOpacity>
              <View style={styles.activeTabWrap}>
                <Text style={styles.activeTab}>Sign up</Text>
              </View>
            </View>

            {/* FULL NAME */}
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={18} color="#aaa" style={styles.inputIcon} />
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#bbb"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />
            </View>

            {/* MOBILE */}
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={18} color="#aaa" style={styles.inputIcon} />
              <TextInput
                placeholder="Mobile Number"
                placeholderTextColor="#bbb"
                style={styles.input}
                value={mobile}
                onChangeText={(text) => {
                  const filtered = text.replace(/[^0-9]/g, "");
                  if (filtered.length <= 10) setMobile(filtered);
                }}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>

            {/* PASSWORD */}
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color="#aaa" style={styles.inputIcon} />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#bbb"
                style={[styles.input, { flex: 1 }]}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ paddingRight: 4 }}>
                <Ionicons name={showPassword ? "eye" : "eye-off"} size={18} color="#aaa" />
              </TouchableOpacity>
            </View>

            {/* CONFIRM PASSWORD */}
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color="#aaa" style={styles.inputIcon} />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#bbb"
                style={[styles.input, { flex: 1 }]}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={{ paddingRight: 4 }}>
                <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={18} color="#aaa" />
              </TouchableOpacity>
            </View>

            {/* BUTTON */}
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Sign up</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 8 }} />
            </TouchableOpacity>

            {/* LOGIN LINK */}
            <Text style={styles.loginLink}>
              Already a member?{" "}
              <Text style={styles.loginLinkAccent} onPress={() => navigation.navigate("Login")}>
                Login
              </Text>
            </Text>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf9f7",
    padding: 24,
  },
  content: {
    flex: 1,
    paddingTop: 30,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  image: {
    width: 220,
    height: 160,
    resizeMode: "contain",
  },

  // TABS
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
    marginBottom: 28,
  },
  activeTabWrap: {
    borderBottomWidth: 2,
    borderColor: "#ff5722",
    paddingBottom: 4,
  },
  activeTab: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
    color: "#ff5722",
  },
  inactiveTab: {
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    color: "#bbb",
    paddingBottom: 4,
  },

  // INPUTS
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ede8e4",
    elevation: 1,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    color: "#1a1a2e",
    paddingVertical: 13,
  },

  // BUTTON
  button: {
    backgroundColor: "#ff5722",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    elevation: 4,
    marginTop: 6,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "PoppinsSemiBold",
    fontSize: 15,
    letterSpacing: 0.4,
  },

  loginLink: {
    fontFamily: "PoppinsRegular",
    fontSize: 13,
    color: "#888",
    textAlign: "center",
  },
  loginLinkAccent: {
    fontFamily: "PoppinsSemiBold",
    color: "#ff5722",
  },
});
