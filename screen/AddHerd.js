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
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "react-native-vector-icons";
import { TouchableOpacity } from "react-native";
import Textarea from "react-native-textarea/src/Textarea";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Config from "../Config";

const AddHerd = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const images = [
    require("../assets/img/cow1.jpg"),
    require("../assets/img/cow2.jpg"),
    require("../assets/img/cow3.jpg"),
    require("../assets/img/cow4.jpg"),
  ];

  const [randomImage, setRandomImage] = useState(null);
  const [herdName, setHerdName] = useState("");
  const [landOwner, setLandOwner] = useState("");
  const [paddockNumber, setPaddockNumber] = useState("");
  const [cattleClass, setCattleClass] = useState(null);
  const [cattleClassValue, setCattleClassValue] = useState(null);
  const [headSize, setHeadSize] = useState("");
  const [herdStatus, setHerdStatus] = useState("");

  const [dateEntered, setDateEntered] = useState(new Date());
  const [openDateEntered, setOpenDateEntered] = useState(false);

  const [exitDate, setExitDate] = useState(new Date());
  const [openExitDate, setOpenExitDate] = useState(false);

  const [auValue, setAuValue] = useState("");
  const [comments, setComments] = useState("");

  const [herdNameError, setHerdNameError] = useState("");
  const [landOwnerError, setLandOwnerError] = useState("");
  const [paddockNumberError, setPaddockNumberError] = useState("");
  const [value, setValue] = useState(null);
  const [cattleClassError, setCattleClassError] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const [headSizeError, setHeadSizeError] = useState("");
  const [auValueError, setAuValueError] = useState("");
  const [dateEnteredError, setDateEnteredError] = useState("");
  const [exitDateError, setExitDateError] = useState("");

  const momentDateEntered = moment(dateEntered);
  const momentExitDate = moment(exitDate);
  const today = moment().format("YYYY-MM-DD");

  const differenceInDays = Math.round(momentExitDate.diff(today, "days", true));
  const formattedDateEntered = moment(dateEntered).format("YYYY-MM-DD");
  const formattedExitDate = moment(exitDate).format("YYYY-MM-DD");

  const validateHerdName = () => {
    const isValid = herdName.trim() !== "";
    setHerdNameError(isValid ? "" : "Herd Name cannot be empty");
    return isValid;
  };

  const validateLandOwner = () => {
    const isValid = landOwner.trim() !== "";
    setLandOwnerError(isValid ? "" : "Land Owner cannot be empty");
    return isValid;
  };

  const validatePaddockNumber = () => {
    const isValid = paddockNumber.trim() !== "";
    setPaddockNumberError(isValid ? "" : "Paddock Number needed");
    return isValid;
  };

  const validateCattleClass = () => {
    const isValid = cattleClass.trim() !== "";
    setCattleClassError(isValid ? "" : "Cattle Class needed");
    return isValid;
  };

  const validateHeadSize = () => {
    const isValid = headSize.trim() !== "";
    setHeadSizeError(isValid ? "" : "Head Size cannot be empty");
    return isValid;
  };
  const validateAuValue = () => {
    const isValid = auValue.trim() !== "";
    setAuValueError(isValid ? "" : "AU Value cannot be empty");
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

  const validateDateEntered = () => {
    const isValid = dateEntered instanceof Date && !isNaN(dateEntered);
    setDateEnteredError(isValid ? "" : "Date Entered is not valid");
    return isValid;
  };

  const validateExitDate = () => {
    const isValid = exitDate instanceof Date && !isNaN(exitDate);
    setExitDateError(isValid ? "" : "Exit Date is not valid");
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

  const handleSave = async () => {
    const isHerdNameValid = validateHerdName(herdName);
    const isLandOwnerValid = validateLandOwner(landOwner);
    const isPaddockNumberValid = validatePaddockNumber(paddockNumber);
    const isCattleClassValid = validateCattleClass(cattleClass);
    const isHeadSizeValid = validateHeadSize(headSize);
    const isAuValueValid = validateAuValue(auValue);
    const isDateEnteredValid = validateDateEntered(dateEntered);
    const isExitDateValid = validateExitDate(exitDate);

    if (
      isHerdNameValid &&
      isLandOwnerValid &&
      isPaddockNumberValid &&
      isCattleClassValid &&
      isHeadSizeValid &&
      isAuValueValid &&
      isDateEnteredValid &&
      isExitDateValid
    ) {
      const newHerdData = {
        herdName,
        landOwner,
        paddockNumber,
        cattleClass,
        headSize,
        auValue,
        herdStatus,
        comments,
        dateEntered: formattedDateEntered,
        exitDate: formattedExitDate,
        differenceInDays,
        imageUrl: getRandomImageUrl(),
      };
      console.log(newHerdData);
      fetch(`${Config.API_URL}/herds/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHerdData),
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            Alert.alert("Success", "Herd added successfully");
            navigation.navigate("Herd");
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
            <Text style={styles.headerText}>Create Herd</Text>
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
              placeholder="Enter Herd Name"
              value={herdName}
              onChangeText={(text) => setHerdName(text)}
              onBlur={validateHerdName}
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
            {herdNameError !== "" && (
              <Text style={styles.errorText}>{herdNameError}</Text>
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
              placeholder="Enter Land Owner"
              value={landOwner}
              onChangeText={(text) => setLandOwner(text)}
              onBlur={validateLandOwner}
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
            {landOwnerError !== "" && (
              <Text style={styles.errorText}>{landOwnerError}</Text>
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
              placeholder="Paddock Number"
              value={paddockNumber}
              onChangeText={(text) => setPaddockNumber(text)}
              onBlur={validatePaddockNumber}
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
            {paddockNumberError !== "" && (
              <Text style={styles.errorText}>{paddockNumberError}</Text>
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
              alignItems: "flex-start",
              marginTop: 10,
              width: "100%",
              alignSelf: "center",
              paddingHorizontal: 5,
            }}
          >
            <View style={{ width: "49%" }}>
              <TextInput
                placeholder="Head Size"
                value={headSize}
                onChangeText={(text) => setHeadSize(text)}
                onBlur={validateHeadSize}
                style={{
                  width: "100%",
                  height: 50,
                  fontFamily: "JosefinSans-Medium",
                  fontSize: 17,
                  borderWidth: 0.6,
                  borderRadius: 10,
                  paddingLeft: 10,
                  marginRight: 4,
                  backgroundColor: "#ffff",
                }}
              />
              <Text style={[styles.rowErrorText]}>{headSizeError}</Text>
            </View>

            <View style={{ width: "49%" }}>
              <TextInput
                placeholder="AU Value"
                value={auValue}
                onChangeText={(text) => setAuValue(text)}
                onBlur={validateAuValue}
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
              <Text style={[styles.rowErrorText]}>{auValueError}</Text>
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              alignSelf: "center",
              paddingHorizontal: 5,
            }}
          >
            <View
              style={{
                width: "49%",
                height: 85,
                borderRadius: 10,
                backgroundColor: "#ffff",
                marginRight: 4,
                borderWidth: 0.6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => setOpenDateEntered(true)}
                style={styles.touchableOpacityStyle}
              >
                <Text>Date Entered</Text>
                <Text
                  style={{
                    width: "100%",
                    color: "#000000",
                    // fontSize: 17,
                    fontFamily: "JosefinSans-Medium",
                  }}
                >
                  {dateEntered
                    ? dateEntered.toDateString()
                    : "Select Enter Date"}
                </Text>
                {dateEntered && (
                  <Text
                    style={{
                      width: "100%",
                      color: "#000000",
                      fontSize: 15,
                      fontFamily: "JosefinSans-Medium",
                    }}
                  >
                    Time:
                    {` ${dateEntered.getHours()}:${
                      dateEntered.getMinutes() < 10 ? "0" : ""
                    }${dateEntered.getMinutes()}`}
                  </Text>
                )}
              </TouchableOpacity>

              {openDateEntered && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateEntered}
                  mode={"date"}
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || dateEntered;
                    setOpenDateEntered(Platform.OS === "ios");
                    setDateEntered(currentDate);
                  }}
                />
              )}

              {dateEnteredError !== "" && (
                <Text style={styles.errorText}>{dateEnteredError}</Text>
              )}
            </View>
            <View
              style={{
                width: "49%",
                height: 85,
                borderRadius: 10,
                backgroundColor: "#ffff",
                // marginRight: 4,
                borderWidth: 0.6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => setOpenExitDate(true)}>
                <Text>Exit Date</Text>
                <Text
                  style={{
                    width: "100%",
                    color: "#000000",
                    // fontSize: 17,
                    fontFamily: "JosefinSans-Medium",
                  }}
                >
                  {exitDate ? exitDate.toDateString() : "Select Exit Date"}
                </Text>
                {exitDate && (
                  <Text
                    style={{
                      width: "100%",
                      color: "#000000",
                      fontSize: 15,
                      fontFamily: "JosefinSans-Medium",
                    }}
                  >
                    Time:
                    {` ${exitDate.getHours()}:${
                      exitDate.getMinutes() < 10 ? "0" : ""
                    }${exitDate.getMinutes()}`}
                  </Text>
                )}
              </TouchableOpacity>

              {openExitDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={exitDate}
                  mode={"date"}
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || exitDate;
                    setOpenExitDate(Platform.OS === "ios");
                    setExitDate(currentDate);
                  }}
                />
              )}

              {exitDateError !== "" && (
                <Text style={styles.errorText}>{exitDateError}</Text>
              )}
            </View>
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
                Create Herd
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
    marginBottom: 10,
    fontFamily: "JosefinSans-SemiBoldItalic",
  },
  rowErrorText: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
    paddingLeft: 10,
    fontFamily: "JosefinSans-SemiBoldItalic",
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
  iconStyle: {
    marginRight: 10,
  },
  touchableOpacityStyle: {
    // padding: Platform.OS === "android" ? 10 : 5,
    // padding: Platform.OS === "ios" ? 10 : 5,
    fontSize: Platform.OS === "android" ? 15 : 12,
    // fontSize: Platform.OS === "ios" ? 7 : 5,
  },
  textStyle: {
    padding: Platform.OS === "android" ? 5 : 2,
    fontSize: Platform.OS === "android" ? 15 : 12,
  },
});

export default AddHerd;
