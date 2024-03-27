import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Alert } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";
import Config from "../Config";

const ChangePassword = ({ navigation, route }) => {
  const goBack = () => {
    navigation.goBack();
  };
  const { userData } = route.params;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isValidEmail = (email) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };
  const handleChangePassword = async () => {
    let hasErrors = false;
    const updatedPassword = {
      password: password,
    };

    if (!email || !email.trim()) {
      setEmailError("Email cannot be empty");
      hasErrors = true;
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      hasErrors = true;
    }

    if (!password || !password.trim()) {
      setPasswordError("Password cannot be empty");
      hasErrors = true;
    }
    if (!confirmPassword || !confirmPassword.trim()) {
      setConfirmPasswordError("Confirm Password cannot be empty");
      hasErrors = true;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      hasErrors = true;
    }
    if (hasErrors) return;

    try {
      const payload = JSON.stringify({ email, password });
      const response = await fetch(
        `${Config.API_URL}/users/edit/${userData.password}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
        }
      );

      if (response.ok) {
        Alert.alert(
          "Password Changed Successfully!",
          "Navigating back to settings.",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to change password");
      }
    } catch (error) {
      console.error("An error occurred while changing the password", error);
      const errorMessage = error.response
        ? await error.response.text()
        : error.message;
      Alert.alert(
        "Error",
        errorMessage || "An error occurred while changing the password"
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.logoContainer}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <MaterialIcons name="arrow-back" size={35} />
        </TouchableOpacity>
        <Image
          source={require("../assets/img/logos.png")}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.signUpText}>Change Password</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          onBlur={() => {
            setEmailError(
              !email.trim()
                ? "Email cannot be empty"
                : !isValidEmail(email)
                ? "Please enter a valid email address"
                : ""
            );
          }}
        />
        {emailError !== "" && (
          <Text style={styles.errorText}>{emailError}</Text>
        )}

        <TextInput
          placeholder="New password"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
          onBlur={() =>
            setPasswordError(!password.trim() ? "Password cannot be empty" : "")
          }
        />
        {passwordError !== "" && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.showPasswordButton}
        >
          <Text style={styles.showPasswordButtonText}>
            {showPassword ? "Hide " : "Show "}
          </Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Confirm password"
          style={styles.input}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={!showConfirmPassword}
          onBlur={() =>
            setConfirmPasswordError(
              !confirmPassword.trim()
                ? "Confirm Password cannot be empty"
                : confirmPassword !== password
                ? "Passwords do not match"
                : ""
            )
          }
        />
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Text style={styles.showPasswordButtonText}>
            {showConfirmPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
        {confirmPasswordError !== "" && (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        )}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleChangePassword}
        >
          <Text style={styles.loginButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ChangePassword;

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
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    flex: 1,
    overflow: "hidden",
  },
  signUpText: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "JosefinSans-Regular",
    textAlign: "center",
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
    fontSize: 18,
    color: "white",
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
    // height: 190,
    paddingTop: 40,
    // backgroundColor: 'rgb(164, 164, 164,5)',
    alignSelf: "center",
    borderRadius: 10,
    // borderWidth: 1.5,
  },
  logoImage: {
    width: "100%",
    alignSelf: "center",
    height: 100,
  },
  showPasswordButton: {
    alignSelf: "flex-end",
    marginRight: "5%",
    marginTop: "2%",
  },
  showPasswordButtonText: {
    fontSize: 16,
    color: "black",
    fontFamily: "JosefinSans-MediumItalic",
  },
  showHideButton: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  backButton: {
    marginLeft: 10,
  },
});
