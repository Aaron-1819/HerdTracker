import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Config from "../Config";
import { TouchableOpacity } from "react-native";

const Account = ({ navigation, route }) => {
  const [herds, setHerds] = useState([]);
  const [paddocks, setPaddocks] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const fetchHerds = async () => {
    try {
      const response = await fetch(`${Config.API_URL}/herds/view`);
      const data = await response.json();
      setHerds(data.herds ?? []);
    } catch (error) {
      console.error("Failed to fetch herds:", error);
    }
  };
  const fetchPaddocks = async () => {
    try {
      const response = await fetch(`${Config.API_URL}/paddocks/view`);
      const data = await response.json();
      setPaddocks(data.paddocks ?? []);
    } catch (error) {
      console.error("Failed to fetch paddocks:", error);
    }
  };
  const fetchUser = async () => {
    try {
      const response = await fetch(`${Config.API_URL}/users/view`);
      const data = await response.json();
      const fetchedUsers = data.users ?? [];
      setUsers(fetchedUsers);
      setCurrentUser(fetchedUsers);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchHerds();
  }, []);

  useEffect(() => {
    fetchPaddocks();
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const createTwoButtonAlert = () =>
    Alert.alert("Logout", "Are you sure you want to logout? ", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => navigation.navigate("Login") },
    ]);

  const changeUsername = () => {
    navigation.navigate("ChangeEmail", { userData: currentUser });
  };

  const changePassword = () => {
    navigation.navigate("ChangePassword", { userData: users });
  };
  return (
    <ScrollView style={{ backgroundColor: "#ffffff" }}>
      <View
        style={{
          width: "95%",
          alignSelf: "center",
          flex: 1,
          marginTop: 50,
        }}
      >
        {/* <View style={{ paddingTop: 20, width: "100%", height: 70 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#ffffff",
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/img/user.png")}
              resizeMode="cover"
              style={{
                width: 50,
                height: 50,
                borderWidth: 0.5,
                borderRadius: 50,
                backgroundColor: "red",
                left: 5,
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                paddingLeft: "5%",
                fontFamily: "JosefinSans-Bold",
                fontSize: 18,
              }}
            >
              Logged in as: {currentUser.firstName} {currentUser.lastName}
            </Text>
          </View>
        </View> */}
        <TouchableOpacity onPress={changeUsername}>
          <View style={{ paddingTop: 20, width: "100%", height: 70 }}>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#ffffff",
                borderRadius: 10,
                width: "100%",
                height: 50,
              }}
            >
              <Image
                source={require("../assets/img/account1.png")}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                  borderWidth: 0.5,
                  borderRadius: 50,
                  left: 5,
                }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  paddingLeft: "5%",
                  fontFamily: "JosefinSans-Bold",
                  fontSize: 18,
                }}
              >
                Change Email
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={changePassword}>
          <View style={{ paddingTop: 20, width: "100%", height: 70 }}>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#ffffff",
                borderRadius: 10,
                width: "100%",
                height: 50,
              }}
            >
              <Image
                source={require("../assets/img/account.png")}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                  borderWidth: 0.5,
                  borderRadius: 50,
                  left: 5,
                }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  paddingLeft: "5%",
                  fontFamily: "JosefinSans-Bold",
                  fontSize: 18,
                }}
              >
                Change Password
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ paddingTop: 20, width: "100%", height: 70 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#ffffff",
              borderRadius: 10,
              width: "100%",
              height: 50,
            }}
          >
            <Image
              source={require("../assets/img/herd.png")}
              resizeMode="contain"
              style={{
                width: 50,
                height: 50,
                borderWidth: 0.5,
                borderRadius: 50,
                left: 5,
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                paddingLeft: "5%",
                fontFamily: "JosefinSans-Bold",
                fontSize: 18,
              }}
            >
              Number of herds: {herds.length}
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: 20, width: "100%", height: 70 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#ffffff",
              borderRadius: 10,
              width: "100%",
              height: 50,
            }}
          >
            <Image
              source={require("../assets/img/herd1.png")}
              resizeMode="contain"
              style={{
                width: 50,
                height: 50,
                borderWidth: 0.5,
                borderRadius: 50,
                left: 5,
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                paddingLeft: "5%",
                fontFamily: "JosefinSans-Bold",
                fontSize: 18,
              }}
            >
              Number of paddocks: {paddocks.length}
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: 20, width: "100%", height: 70 }}>
          <TouchableOpacity onPress={createTwoButtonAlert}>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#ffffff",
                borderRadius: 10,
                width: "100%",
                height: 50,
              }}
            >
              <Image
                source={require("../assets/img/logout.png")}
                resizeMode="center"
                style={{
                  width: 50,
                  height: 50,
                  borderWidth: 0.5,
                  borderRadius: 50,
                  left: 5,
                }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  paddingLeft: "5%",
                  fontFamily: "JosefinSans-Bold",
                  fontSize: 18,
                }}
              >
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({});
