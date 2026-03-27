import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import logotp from "./assets/logotp.png";

export default function OTP({ navigation }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    if (otp.includes("")) {
      alert("Please enter complete OTP");
      return;
    }
    navigation.navigate("Success");
  };

  return (
    <View style={styles.container}>

      {/* LOGO */}
      <View style={styles.imageContainer}>
        <Image source={logotp} style={styles.image} />
      </View>

      {/* ICON BADGE */}
      <View style={styles.otpIconCircle}>
        <Text style={styles.otpEmoji}>🔐</Text>
      </View>

      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to your registered number.
      </Text>

      {/* OTP BOXES */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={[styles.otpBox, digit !== "" && styles.otpBoxFilled]}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>

      {/* RESEND */}
      <Text style={styles.resend}>
        Didn't receive the code?{" "}
        <Text style={styles.resendAccent}>Resend</Text>
      </Text>

      {/* SUBMIT */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Verify & Continue</Text>
        <Text style={{ color: "#fff", fontSize: 16, marginLeft: 8 }}>→</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#faf9f7",
    padding: 24,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 4,
  },
  image: {
    width: 180,
    height: 130,
    resizeMode: "contain",
  },

  otpIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#fff0eb",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  otpEmoji: {
    fontSize: 30,
  },

  title: {
    fontSize: 22,
    fontFamily: "PoppinsBold",
    color: "#1a1a2e",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13.5,
    fontFamily: "PoppinsRegular",
    color: "#888",
    marginBottom: 28,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
  },

  // OTP BOXES
  otpContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  otpBox: {
    width: 46,
    height: 54,
    borderWidth: 1.5,
    borderColor: "#ede8e4",
    backgroundColor: "#fff",
    borderRadius: 14,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "PoppinsBold",
    color: "#1a1a2e",
    elevation: 2,
  },
  otpBoxFilled: {
    borderColor: "#ff5722",
    backgroundColor: "#fff0eb",
  },

  resend: {
    fontFamily: "PoppinsRegular",
    fontSize: 13,
    color: "#888",
    marginBottom: 28,
  },
  resendAccent: {
    fontFamily: "PoppinsSemiBold",
    color: "#ff5722",
  },

  button: {
    backgroundColor: "#ff5722",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 18,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    elevation: 4,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "PoppinsSemiBold",
    fontSize: 15,
    letterSpacing: 0.4,
  },
});
