import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Config from "../Config";

const Login = ({ navigation }) => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!email || !email.trim()) {
      setEmailError("Email cannot be empty");
      isValid = false;
    }

    // Validate password
    if (!password || !password.trim()) {
      setPasswordError("Password cannot be empty");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const userData = {
      email,
      password,
    };

    fetch(`${Config.API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          navigation.navigate("HomeTabs");
        } else {
          Alert.alert(
            "Login Failed",
            data.message || "Email or password is incorrect"
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Login Failed", "An error occurred during login.");
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/img/logo.png")}
            resizeMode="stretch"
            style={styles.logoImage}
          />
        </View>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          onBlur={() => {
            if (!email.trim()) setEmailError("Email cannot be empty");
          }}
        />
        {emailError !== "" && (
          <Text style={styles.errorText}>{emailError}</Text>
        )}

        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          onBlur={() => {
            if (!password.trim()) setPasswordError("Password cannot be empty");
          }}
        />
        {passwordError !== "" && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.signUpText}>
          Need an account?{" "}
          <Text
            style={styles.signUpLink}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up Here
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  container: {
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    flex: 1,
    overflow: "hidden",
  },
  logoContainer: {
    width: "95%",
    height: 190,
    paddingTop: 40,
    alignSelf: "center",
    borderRadius: 10,
  },
  logoImage: {
    width: "90%",
    alignSelf: "center",
    height: 100,
  },
  input: {
    width: "95%",
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
    width: "95%",
    height: 50,
    backgroundColor: "#007000",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1.5,
    alignSelf: "center",
  },
  loginButtonText: {
    color: "white",
    fontFamily: "JosefinSans-Bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  forgotPasswordText: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "JosefinSans-Medium",
    color: "black",
    textAlign: "right",
    marginBottom: 10,
  },
  signUpText: {
    textAlign: "center",
    fontFamily: "JosefinSans-MediumItalic",
    fontSize: 18,
    marginTop: 20,
  },
  signUpLink: {
    fontFamily: "JosefinSans-BoldItalic",
    color: "#007000",
    fontSize: 20,
  },
});

export default Login;
