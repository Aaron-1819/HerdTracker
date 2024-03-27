import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "react-native-vector-icons";
import { TouchableOpacity, Alert } from "react-native";
import Config from "../Config";

const AddPaddock = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const images = [
    require("../assets/img/paddock1.jpg"),
    require("../assets/img/paddock2.jpg"),
    require("../assets/img/paddock3.jpg"),
    require("../assets/img/paddock4.jpg"),
  ];

  const [randomImage, setRandomImage] = useState(null);
  const [paddockName, setPaddockName] = useState("");
  const [paddockNumber, setPaddockNumber] = useState("");
  const [sizeAcres, setSizeAcres] = useState("");
  const [landOwner, setLandOwner] = useState("");
  const [costType, setCostType] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [cropType, setCropType] = useState("");
  const [yearSeeded, setYearSeeded] = useState("");
  const [yearRenovated, setYearRenovated] = useState("");

  const [paddockNameError, setPaddockNameError] = useState("");
  const [paddockNumberError, setPaddockNumberError] = useState("");
  const [sizeAcresError, setSizeAcresError] = useState("");
  const [landOwnerError, setLandOwnerError] = useState("");
  const [costTypeError, setCostTypeError] = useState("");
  const [unitCostError, setUnitCostError] = useState("");

  const validatePaddockName = () => {
    const isValid = paddockName.trim() !== "";
    setPaddockNameError(isValid ? "" : "Paddock name cannot be empty");
    return isValid;
  };

  const validatePaddockNumber = () => {
    const isValid = paddockNumber.trim() !== "";
    setPaddockNumberError(isValid ? "" : "Paddock number must be a number");
    return isValid;
  };

  const validateSizeAcres = () => {
    const isValid = sizeAcres.trim() !== "";
    setSizeAcresError(isValid ? "" : "Size (Acres) must be a number");
    return isValid;
  };

  const validateLandOwner = () => {
    const isValid = landOwner.trim() !== "";
    setLandOwnerError(isValid ? "" : "Land owner cannot be empty");
    return isValid;
  };

  const validateCostType = () => {
    const isValid = costType.trim() !== "";
    setCostTypeError(isValid ? "" : "Cost type cannot be empty");
    return isValid;
  };

  const validateUnitCost = () => {
    const isValid = unitCost.trim() !== "";
    setUnitCostError(isValid ? "" : "Unit cost must be a number");
    return isValid;
  };

  const getRandomImageUrl = () => {
    const images = [
      "../assets/img/paddock1.jpg",
      "../assets/img/paddock2.jpg",
      "../assets/img/paddock3.jpg",
      "../assets/img/paddock4.jpg",
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const handleSave = async () => {
    const isPaddockNameValid = validatePaddockName(paddockName);
    const isPaddockNumberValid = validatePaddockNumber(paddockNumber);
    const isSizeAcresValid = validateSizeAcres(sizeAcres);
    const isLandOwnerValid = validateLandOwner(landOwner);
    const isCostTypeValid = validateCostType(costType);
    const isUnitCostValid = validateUnitCost(unitCost);

    if (
      isPaddockNameValid &&
      isPaddockNumberValid &&
      isSizeAcresValid &&
      isLandOwnerValid &&
      isCostTypeValid &&
      isUnitCostValid
    ) {
      const newPaddockData = {
        paddockName,
        paddockNumber,
        sizeAcres,
        landOwner,
        costType,
        unitCost,
        cropType,
        yearSeeded,
        yearRenovated,
        imageUrl: getRandomImageUrl(),
      };

      fetch(`${Config.API_URL}/paddocks/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPaddockData),
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            Alert.alert("Success", "Paddock added successfully");
            navigation.navigate("Paddock");
          } else {
            Alert.alert(
              "Creation Failed",
              data.message || "An error occurred during the creation process"
            );
          }
        })
        .catch((error) => {
          console.error("Network Error:", error);
          Alert.alert("Network Error", "Unable to connect to the server");
        });
    } else {
      Alert.alert("Validation Error", "Please check your input and try again");
    }
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <MaterialIcons name="arrow-back" size={35} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Create Paddock</Text>
          </View>

          <View
            style={{ width: "97%", height: 280, alignSelf: "center", top: 15 }}
          >
            {randomImage && (
              <Image
                source={randomImage}
                resizeMode="stretch"
                style={{ width: "100%", height: 250, borderRadius: 10 }}
              />
            )}
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
              onBlur={validatePaddockName}
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
            {paddockNameError !== "" && (
              <Text style={styles.errorText}>{paddockNameError}</Text>
            )}

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
                  onBlur={validatePaddockNumber}
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
                {paddockNumberError !== "" && (
                  <Text style={styles.errorText}>{paddockNumberError}</Text>
                )}
              </View>

              <View style={{ width: "49%" }}>
                <TextInput
                  placeholder="Size (Acres)"
                  value={sizeAcres}
                  onChangeText={(text) => setSizeAcres(text)}
                  onBlur={validateSizeAcres}
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
                {sizeAcresError !== "" && (
                  <Text style={styles.errorText}>{sizeAcresError}</Text>
                )}
              </View>
            </View>
            <View>
              <TextInput
                placeholder="Land Owner"
                value={landOwner}
                onChangeText={(text) => setLandOwner(text)}
                onBlur={validateLandOwner}
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
              {landOwnerError !== "" && (
                <Text style={styles.errorText}>{landOwnerError}</Text>
              )}
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
                  onBlur={validateCostType}
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
                {costTypeError !== "" && (
                  <Text style={styles.errorText}>{costTypeError}</Text>
                )}
              </View>

              <View style={{ width: "48%" }}>
                <TextInput
                  placeholder="Unit Cost"
                  value={unitCost}
                  onChangeText={(text) => setUnitCost(text)}
                  onBlur={validateUnitCost}
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
                {unitCostError !== "" && (
                  <Text style={styles.errorText}>{unitCostError}</Text>
                )}
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
                  Create Paddock
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

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
});

export default AddPaddock;
