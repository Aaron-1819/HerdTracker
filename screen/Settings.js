import React, { useContext } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isNotificationsEnabled, setIsNotificationsEnabled] =
    React.useState(true);

  const toggleNotifications = () =>
    setIsNotificationsEnabled((previousState) => !previousState);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#333" : "#fff" },
      ]}
    >
      <Text
        style={[styles.title, { color: theme === "dark" ? "#fff" : "#000" }]}
      >
        Settings
      </Text>

      {/* Dark Mode Toggle */}
      <View style={styles.settingItem}>
        <Text
          style={[
            styles.settingText,
            { color: theme === "dark" ? "#fff" : "#000" },
          ]}
        >
          Dark Mode
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={theme === "dark" ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleTheme}
          value={theme === "dark"}
        />
      </View>

      {/* Notifications Toggle */}
      <View style={styles.settingItem}>
        <Text
          style={[
            styles.settingText,
            { color: theme === "dark" ? "#fff" : "#000" },
          ]}
        >
          Notifications
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isNotificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleNotifications}
          value={isNotificationsEnabled}
        />
      </View>

      <View style={styles.settingSection}>
        <Text
          style={[
            styles.settingSectionTitle,
            { color: theme === "dark" ? "#fff" : "#000" },
          ]}
        >
          Account
        </Text>

        <TouchableOpacity onPress={() => {}}>
          <Text
            style={[
              styles.settingText,
              styles.settingItem,
              { color: theme === "dark" ? "#fff" : "#000" },
            ]}
          >
            Change Password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Text
            style={[
              styles.settingText,
              styles.settingItem,
              { color: theme === "dark" ? "#fff" : "#000" },
            ]}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
  },
  settingSection: {
    marginTop: 10,
  },
  settingSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
