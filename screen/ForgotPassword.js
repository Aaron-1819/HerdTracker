import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Form, TextValidator } from "react-native-validator-form";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");

  const handleResetPassword = () => {
    setEmailError("");

    if (!email || !email.trim()) {
      setEmailError("Email cannot be empty");
      return;
    }
    Alert.alert(
      "Password Reset",
      "A password reset email has been sent to your email address."
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/img/logos.png")}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.signUpText}>Forgot Email?</Text>
        <Form>
          <TextValidator
            styles={styles.input}
            name="email"
            label="email"
            validators={["required", "isEmail"]}
            errorMessages={["This field is required", "Email invalid"]}
            placeholder=""
            type="text"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {/* {emailError !== "" && (
            <Text style={styles.errorText}>{emailError}</Text>
          )} */}
        </Form>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleResetPassword}
        >
          <Text style={styles.loginButtonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  container: {
    alignItems: "center",
    marginTop: "20%",
    width: "100%",
  },
  signUpText: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "JosefinSans-Regular",
    marginTop: 10,
  },
  input: {
    width: "10%",
    height: 50,
    alignSelf: "center",
    fontFamily: "JosefinSans-Medium",
    fontSize: 17,
    borderWidth: 0.6,
    borderRadius: 10,
    paddingLeft: 10,
    borderWidth: 1.5,
    marginTop: "5%",
    backgroundColor: "#ffff",
  },
  loginButton: {
    width: "55%",
    height: 50,
    backgroundColor: "#007000",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderWidth: 1.5,
    alignSelf: "center",
  },
  loginButtonText: {
    fontSize: 18,
    color: "#ffff",
    fontFamily: "JosefinSans-Bold",
  },
  errorText: {
    color: "red",
    fontSize: 15,
    marginTop: 5,
    paddingLeft: 10,
    fontFamily: "JosefinSans-Regular",
    alignSelf: "flex-start",
  },
  logoContainer: {
    width: "95%",
    paddingTop: 40,
    alignSelf: "center",
    borderRadius: 10,
  },
  logoImage: {
    width: "100%",
    alignSelf: "center",
    height: 100,
  },
});
export default ForgotPassword;
