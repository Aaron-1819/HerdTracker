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
import { MaterialIcons } from "@expo/vector-icons";
import Config from "../Config";

const ChangeEmail = ({ navigation, route }) => {
  const { userData } = route.params;
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [confirmEmailError, setConfirmEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isValidEmail = (email) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const handleChangeEmail = async () => {
    if (isLoading) return;

    setEmailError("");
    setConfirmEmailError("");
    setPasswordError("");

    let hasErrors = false;
    if (!newEmail || !isValidEmail(newEmail)) {
      setEmailError("Please enter a valid email");
      hasErrors = true;
    }

    if (newEmail !== confirmNewEmail) {
      setConfirmEmailError("Emails do not match");
      hasErrors = true;
    }

    if (!password || !password.trim()) {
      setPasswordError("Password cannot be empty");
      hasErrors = true;
    }

    if (hasErrors) return;

    setIsLoading(true);
    try {
      const payload = JSON.stringify({
        newEmail,
        password,
      });

      const response = await fetch(
        `${Config.API_URL}/users/edits/${userData.email}`,
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
          "Email changed successfully!",
          "Navigating back to settings.",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to change email");
      }
    } catch (error) {
      console.error("Failed to change email:", error);
      Alert.alert("Failed to change email", error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    navigation.goBack();
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
        <Text style={styles.signUpText}>Change Email</Text>

        <TextInput
          placeholder="New email"
          style={styles.input}
          value={newEmail}
          onChangeText={setNewEmail}
          onBlur={() =>
            setEmailError(
              !isValidEmail(newEmail) ? "Please enter a valid email" : ""
            )
          }
        />
        {emailError !== "" && (
          <Text style={styles.errorText}>{emailError}</Text>
        )}

        <TextInput
          placeholder="Confirm new email"
          style={styles.input}
          value={confirmNewEmail}
          onChangeText={setConfirmNewEmail}
          onBlur={() =>
            setConfirmEmailError(
              newEmail !== confirmNewEmail ? "Emails do not match" : ""
            )
          }
        />
        {confirmEmailError !== "" && (
          <Text style={styles.errorText}>{confirmEmailError}</Text>
        )}

        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          onBlur={() =>
            setPasswordError(!password.trim() ? "Password cannot be empty" : "")
          }
        />
        {passwordError !== "" && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleChangeEmail}
        >
          <Text style={styles.loginButtonText}>Change Email</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ChangeEmail;

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
    top: 10,
  },
});
