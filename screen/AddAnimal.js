import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "react-native-vector-icons";
import { TouchableOpacity } from "react-native";
import Textarea from "react-native-textarea/src/Textarea";
import Config from "../Config";

const AddAnimal = ({ navigation, route }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const images = [
    require("../assets/img/cow1.jpg"),
    require("../assets/img/cow2.jpg"),
    require("../assets/img/cow3.jpg"),
    require("../assets/img/cow4.jpg"),
  ];
  const { herdData } = route.params;

  const [randomImage, setRandomImage] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [tagNumber, setTagNumber] = useState("");
  const [cattleClass, setCattleClass] = useState(null);
  const [cattleClassValue, setCattleClassValue] = useState(null);
  const [herdStatus, setHerdStatus] = useState("");
  const [comments, setComments] = useState("");
  const [dropdownData, setDropdownData] = useState([]);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [tagNumberError, setTagNumberError] = useState("");
  const [cattleClassError, setCattleClassError] = useState("");

  const validateDateOfBirth = () => {
    const isValid = /^(\d{4}-\d{2}-\d{2}|\d{8})$/.test(dateOfBirth.trim());
    setDateOfBirthError(
      isValid ? "" : "Enter a valid date in YYYY-MM-DD or YYYYMMDD format"
    );
    return isValid;
  };

  const validateTagNumber = () => {
    const isValid = tagNumber.trim() !== "";
    setTagNumberError(isValid ? "" : "Tag Number cannot be empty");
    return isValid;
  };

  const validateCattleClass = () => {
    const isValid = cattleClass.trim() !== "";
    setCattleClassError(isValid ? "" : "Cattle Class needed");
    return isValid;
  };

  const validateHerdStatus = () => {
    const isValid = herdStatus.trim() == "";
    return isValid;
  };

  const validateComments = () => {
    const isValid = comments.trim() !== "";
    return isValid;
  };

  const getRandomImageUrl = () => {
    const images = [
      "../assets/img/cow1.jpg",
      "../assets/img/cow2.jpg",
      "../assets/img/cow3.jpg",
      "../assets/img/cow4.jpg",
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const cattleData = [
    { label: "Cow", value: "Cow" },
    { label: "Bull", value: "Bull" },
    { label: "Yearling", value: "Yearling" },
  ];

  useEffect(() => {
    if (herdData && herdData.herdData && herdData.herdData.length) {
      const formattedData = herdData.herdData.map((herd) => ({
        label: herd.herdName,
        value: herd.id,
      }));
      setDropdownData(formattedData);
    }
  }, [herdData]);

  const handleSave = async () => {
    const isDateOfBirthValid = validateDateOfBirth(dateOfBirth);
    const isTagNumberValid = validateTagNumber(tagNumber);
    const isCattleClassValid = validateCattleClass(cattleClass);

    if (isDateOfBirthValid && isTagNumberValid && isCattleClassValid) {
      const newHerdData = {
        herdId: value,
        dateOfBirth,
        tagNumber,
        cattleClass,
        status: herdStatus,
        comments,
        imageUrl: getRandomImageUrl(),
      };
      fetch(`${Config.API_URL}/animals/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHerdData),
      })
        .then(async (response) => {
          const text = await response.text();
          try {
            const data = JSON.parse(text);
            if (response.ok) {
              Alert.alert("Success", "Animal added successfully");
              navigation.navigate("Herd");
            } else {
              Alert.alert(
                "Creation Failed",
                data.message || "An error occurred during the creation process"
              );
            }
          } catch (error) {
            console.error("JSON parsing error:", error);
            console.log("Original response text:", text);
            Alert.alert("Parsing Error", "Failed to parse server response");
          }
        })
        .catch((error) => {
          console.error("Network Error:", error);
          Alert.alert("Network Error", "Unable to connect to the server");
        });
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
            <Text style={styles.headerText}>Add Livestock</Text>
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
              placeholder="Date of Birth (YYYY-MM-DD)"
              value={dateOfBirth}
              onChangeText={(text) => setDateOfBirth(text)}
              onBlur={validateDateOfBirth}
              style={{
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
            {dateOfBirthError !== "" && (
              <Text style={styles.errorText}>{dateOfBirthError}</Text>
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
              placeholder="Enter Tag Number"
              value={tagNumber}
              onChangeText={(text) => setTagNumber(text)}
              onBlur={validateTagNumber}
              style={{
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
            {tagNumberError !== "" && (
              <Text style={styles.errorText}>{tagNumberError}</Text>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "center",
              paddingHorizontal: 5,
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: "100%",
                fontFamily: "JosefinSans-Medium",
              }}
            >
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={cattleData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select Cattle Class"}
                value={cattleClassValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setCattleClassValue(item.value);
                  setCattleClass(item.value);
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "center",
              paddingHorizontal: 5,
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: "100%",
                fontFamily: "JosefinSans-Medium",
              }}
            >
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={dropdownData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Add to which herd?" : "..."}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              alignSelf: "center",
              paddingHorizontal: 5,
              marginTop: 10,
            }}
          >
            <TextInput
              placeholder="Status"
              value={herdStatus}
              onChangeText={(text) => setHerdStatus(text)}
              onBlur={validateHerdStatus}
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
          <View
            style={{
              alignItems: "center",
              marginTop: 10,
              width: "100%",
              alignSelf: "center",
              paddingHorizontal: 5,
            }}
          >
            <Textarea
              placeholder="Comments"
              value={comments}
              onChangeText={(text) => setComments(text)}
              onBlur={validateComments}
              style={{
                width: "100%",
                height: 150,
                fontFamily: "JosefinSans-Medium",
                fontSize: 17,
                borderWidth: 0.6,
                borderRadius: 10,
                paddingLeft: 10,
                backgroundColor: "#ffff",
              }}
            />
          </View>

          <View style={{ width: "100%", paddingHorizontal: 5 }}>
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
                Add Livestock
              </Text>
            </TouchableOpacity>
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
    marginTop: 2,
    paddingLeft: 10,
    fontFamily: "JosefinSans-SemiBoldItalic",
  },
  pickerErrorText: {
    color: "red",
    fontSize: 12,
    marginTop: -2,
    paddingLeft: 10,
    fontFamily: "JosefinSans-SemiBoldItalic",
  },
  livestockDropdown: {
    width: "100%",
    height: 50,
    borderWidth: 0.6,
    borderRadius: 10,
    paddingLeft: 10,
    borderBlockColor: "black",
    backgroundColor: "#0000",
    marginBottom: 20,
  },
  dropdown: {
    ...Platform.select({
      ios: {
        width: "100%",
        height: 50,
        borderWidth: 0.6,
        borderRadius: 10,
        paddingLeft: 10,
        borderBlockColor: "black",
        backgroundColor: "#ffff",
      },
      android: {
        width: "100%",
        height: 50,
        borderWidth: 0.6,
        borderRadius: 10,
        paddingLeft: 10,
        borderBlockColor: "black",
        backgroundColor: "#ffff",
      },
    }),
  },
  placeholderStyle: {
    fontFamily: "JosefinSans-Medium",
    fontSize: 17,
  },
  selectedTextStyle: {
    fontSize: 17,
  },
  label: {
    fontSize: 17,
    fontFamily: "JosefinSans-Medium",
    color: "black",
    marginLeft: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
});

export default AddAnimal;
