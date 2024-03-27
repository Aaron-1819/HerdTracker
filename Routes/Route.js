import { Image, StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Herd from "../screen/Herd";
import Paddock from "../screen/Paddock";
import Account from "../screen/Account";
import AddHerd from "../screen/AddHerd";
import AddAnimal from "../screen/AddAnimal";
import AddPaddock from "../screen/AddPaddock";
import Login from "../screen/Login";
import ForgotPassword from "../screen/ForgotPassword";
import ViewHerd from "../screen/ViewHerd";
import ViewPaddock from "../screen/ViewPaddock";
import UpdateHerd from "../screen/UpdateHerd";
import UpdatePaddock from "../screen/UpdatePaddock";
import SignUp from "../screen/SignUp";
import Settings from "../screen/Settings";
import ChangeEmail from "../screen/ChangeEmail";
import ChangePassword from "../screen/ChangePassword";
import RemoveAnimal from "../screen/RemoveAnimal";
import MoveAnimals from "../screen/MoveAnimals";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#0a0712" },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize = size;
          let labelStyle = { fontSize: 23 };

          if (route.name === "Herd") {
            return (
              <Image
                source={
                  focused
                    ? require("../assets/img/herd.png")
                    : require("../assets/img/herd1.png")
                }
                style={{ width: "28%", height: "100%", resizeMode: "contain" }}
              />
            );
          } else if (route.name === "Paddock") {
            return (
              <Image
                source={
                  focused
                    ? require("../assets/img/paddock1.png")
                    : require("../assets/img/paddock.png")
                }
                style={{ width: "28%", height: "100%", resizeMode: "contain" }}
              />
            );
          } else if (route.name === "Settings") {
            return (
              <Image
                source={
                  focused
                    ? require("../assets/img/account.png")
                    : require("../assets/img/account1.png")
                }
                resizeMode="center"
                style={{ width: "28%", height: "100%", resizeMode: "contain" }}
              />
            );
          }

          if (focused) {
            iconSize += 10;
            labelStyle = { fontSize: 30, fontWeight: "bold" };
          }

          return (
            <Ionicons
              name={iconName}
              size={iconSize}
              color={color}
              style={labelStyle}
            />
          );
        },
      })}
      tabBarOptions={{
        tabBarInactiveBackgroundColor: "black",
        activeTintColor: "purple",
        inactiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Herd"
        component={Herd}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Paddock"
        component={Paddock}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={Account}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddHerd"
          component={AddHerd}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddPaddock"
          component={AddPaddock}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ViewHerd"
          component={ViewHerd}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ViewPaddock"
          component={ViewPaddock}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UpdateHerd"
          component={UpdateHerd}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UpdatePaddock"
          component={UpdatePaddock}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangeEmail"
          component={ChangeEmail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddAnimal"
          component={AddAnimal}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RemoveAnimal"
          component={RemoveAnimal}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MoveAnimals"
          component={MoveAnimals}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;

const styles = StyleSheet.create({});
