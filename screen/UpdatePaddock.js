import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Config from "../Config";

const UpdatePaddock = ({ navigation, route }) => {
  const { paddockData } = route.params;

  const [paddockName, setPaddockName] = useState(paddockData.paddockName);
  const [paddockNumber, setPaddockNumber] = useState(paddockData.paddockNumber);
  const [sizeAcres, setSizeAcres] = useState(paddockData.sizeAcres);
  const [landOwner, setLandOwner] = useState(paddockData.landOwner);
  const [costType, setCostType] = useState(paddockData.costType);
  const [unitCost, setUnitCost] = useState(paddockData.unitCost);
  const [cropType, setCropType] = useState(paddockData.cropType);
  const [yearSeeded, setYearSeeded] = useState(paddockData.yearSeeded);
  const [yearRenovated, setYearRenovated] = useState(paddockData.yearRenovated);
  const [imageUrl, setImageUrl] = useState(paddockData.imageUrl);

  const goBack = () => {
    navigation.goBack();
  };
  const confirmExit = () => {
    Alert.alert(
      "Confirm Exit",
      "Are you sure you want to exit editing? Your changes will not be saved.",
      [
        {
          text: "Yes",
          onPress: () => navigation.navigate("Paddock"),
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    );
  };

  const handleSave = async () => {
    const updatedPaddock = {
      id: paddockData.id,
      paddockName,
      paddockNumber,
      sizeAcres: Number(sizeAcres),
      landOwner,
      costType,
      unitCost: Number(unitCost),
      cropType,
      yearSeeded: Number(yearSeeded),
      yearRenovated: Number(yearRenovated),
      imageUrl,
    };

    try {
      const response = await fetch(
        `${Config.API_URL}/paddocks/edit/${paddockData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPaddock),
        }
      );

      const responseBody = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Paddock updated successfully.", [
          { text: "OK", onPress: () => navigation.navigate("Paddock") },
        ]);
      } else {
        throw new Error(responseBody.message || "Failed to update paddock.");
      }
    } catch (error) {
      Alert.alert("Error", error.toString());
    }
  };

  const getImage = (imageName) => {
    switch (imageName) {
      case "../assets/img/paddock1.jpg":
        return require("../assets/img/paddock1.jpg");
      case "../assets/img/paddock2.jpg":
        return require("../assets/img/paddock2.jpg");
      case "../assets/img/paddock3.jpg":
        return require("../assets/img/paddock3.jpg");
      case "../assets/img/paddock4.jpg":
        return require("../assets/img/paddock4.jpg");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={confirmExit}>
              <MaterialIcons name="arrow-back" size={35} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Update Paddock</Text>
          </View>

          <View
            style={{ width: "97%", height: 280, alignSelf: "center", top: 15 }}
          >
            <Image
              source={getImage(paddockData.imageUrl)}
              resizeMode="center"
              style={{ width: "100%", height: 250, borderRadius: 10 }}
            />
          </View>
          <View style={styles.editingContainer}>
            <Text style={styles.editingTitle}>
              Currently Editing Paddock #{paddockNumber}
            </Text>
          </View>
          <View
            style={{
              width: "97%",
              alignSelf: "center",
              top: 8,
            }}
          >
            <TextInput
              placeholder="Enter Paddock Name"
              value={paddockName}
              onChangeText={(text) => setPaddockName(text)}
              style={{
                width: "100%",
                height: 50,
                fontFamily: "JosefinSans-Medium",
                fontSize: 17,
                borderWidth: 0.6,
                borderRadius: 10,
                paddingLeft: 10,
                backgroundColor: "#ffff",
                marginBottom: 10,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "49%" }}>
                <TextInput
                  placeholder="Paddock Number"
                  value={paddockNumber}
                  onChangeText={(text) => setPaddockNumber(text)}
                  style={{
                    width: "98%",
                    height: 50,
                    fontFamily: "JosefinSans-Medium",
                    fontSize: 17,
                    borderWidth: 0.6,
                    borderRadius: 10,
                    paddingLeft: 10,
                    backgroundColor: "#ffff",
                  }}
                />
              </View>

              <View style={{ width: "49%" }}>
                <TextInput
                  placeholder="Size (Acres)"
                  value={sizeAcres}
                  onChangeText={(text) => setSizeAcres(text)}
                  style={{
                    width: "100%",
                    height: 50,
                    fontFamily: "JosefinSans-Medium",
                    fontSize: 17,
                    borderWidth: 0.6,
                    borderRadius: 10,
                    paddingLeft: 10,
                    backgroundColor: "#ffff",
                  }}
                />
              </View>
            </View>
            <View>
              <TextInput
                placeholder="Land Owner"
                value={landOwner}
                onChangeText={(text) => setLandOwner(text)}
                style={{
                  width: "100%",
                  height: 50,
                  fontFamily: "JosefinSans-Medium",
                  fontSize: 17,
                  borderWidth: 0.6,
                  borderRadius: 10,
                  paddingLeft: 10,
                  backgroundColor: "#ffff",
                  marginTop: 10,
                }}
              />
            </View>
            <View>
              <TextInput
                placeholder="Crop Type"
                value={cropType}
                onChangeText={(text) => setCropType(text)}
                style={{
                  width: "100%",
                  height: 50,
                  fontFamily: "JosefinSans-Medium",
                  fontSize: 17,
                  borderWidth: 0.6,
                  borderRadius: 10,
                  paddingLeft: 10,
                  backgroundColor: "#ffff",
                  marginTop: 10,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View style={{ width: "48%" }}>
                <TextInput
                  placeholder="Cost Type"
                  value={costType}
                  onChangeText={(text) => setCostType(text)}
                  style={{
                    width: "100%",
                    height: 50,
                    fontFamily: "JosefinSans-Medium",
                    fontSize: 17,
                    borderWidth: 0.6,
                    borderRadius: 10,
                    paddingLeft: 10,
                    backgroundColor: "#ffff",
                  }}
                />
              </View>

              <View style={{ width: "48%" }}>
                <TextInput
                  placeholder="Unit Cost"
                  value={unitCost}
                  onChangeText={(text) => setUnitCost(text)}
                  style={{
                    width: "100%",
                    height: 50,
                    fontFamily: "JosefinSans-Medium",
                    fontSize: 17,
                    borderWidth: 0.6,
                    borderRadius: 10,
                    paddingLeft: 10,
                    backgroundColor: "#ffff",
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View style={{ width: "48%" }}>
                <TextInput
                  placeholder="Year Seeded"
                  value={yearSeeded}
                  onChangeText={(text) => setYearSeeded(text)}
                  style={{
                    width: "100%",
                    height: 50,
                    fontFamily: "JosefinSans-Medium",
                    fontSize: 17,
                    borderWidth: 0.6,
                    borderRadius: 10,
                    paddingLeft: 10,
                    backgroundColor: "#ffff",
                  }}
                />
              </View>

              <View style={{ width: "48%" }}>
                <TextInput
                  placeholder="Year Renovated"
                  value={yearRenovated}
                  onChangeText={(text) => setYearRenovated(text)}
                  style={{
                    width: "100%",
                    height: 50,
                    fontFamily: "JosefinSans-Medium",
                    fontSize: 17,
                    borderWidth: 0.6,
                    borderRadius: 10,
                    paddingLeft: 10,
                    backgroundColor: "#ffff",
                  }}
                />
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  height: 50,
                  backgroundColor: "#007000",
                  borderRadius: 10,
                  marginTop: 20,
                  marginBottom: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleSave}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "JosefinSans-Bold",
                    color: "white",
                  }}
                >
                  Update Paddock
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UpdatePaddock;

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 50,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginLeft: 10,
  },
  headerText: {
    fontFamily: "JosefinSans-BoldItalic",
    fontSize: 22,
    marginLeft: 15,
  },
  container: {
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    flex: 1,
    overflow: "hidden",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    paddingLeft: 10,
    fontFamily: "JosefinSans-SemiBoldItalic",
  },
  editingContainer: {
    width: "100%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  editingTitle: {
    fontSize: 18,
    fontFamily: "JosefinSans-BoldItalic",
  },
});
