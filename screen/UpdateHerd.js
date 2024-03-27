import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "react-native-vector-icons";
import { TouchableOpacity } from "react-native";
import Textarea from "react-native-textarea/src/Textarea";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Config from "../Config";

const UpdateHerd = ({ navigation, route }) => {
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
  const [herdName, setHerdName] = useState(herdData.herdName ?? "");
  const [landOwner, setLandOwner] = useState(herdData.landOwner ?? "");
  const [paddockNumber, setPaddockNumber] = useState(
    herdData.paddockNumber ?? ""
  );
  const [cattleClass, setCattleClass] = useState(herdData.cattleClass ?? "");
  const [cattleClassValue, setCattleClassValue] = useState(null);
  const [headSize, setHeadSize] = useState("");
  const [herdStatus, setHerdStatus] = useState(herdData.herdStatus ?? "");
  const [auValue, setAuValue] = useState(herdData.auValue ?? "");
  const [comments, setComments] = useState(herdData.comments ?? "");
  const [value, setValue] = useState(null);
  const [cattleClassError, setCattleClassError] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [dateEntered, setDateEntered] = useState(
    new Date(herdData.dateEntered ?? "")
  );
  const [openDateEntered, setOpenDateEntered] = useState(false);

  const [exitDate, setExitDate] = useState(new Date(herdData.exitDate ?? ""));
  const [openExitDate, setOpenExitDate] = useState(false);
  const onDateEnteredChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateEntered;
    setOpenDateEntered(false);
    setDateEntered(currentDate);
  };

  const onExitDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || exitDate;
    setOpenExitDate(false);
    setExitDate(currentDate);
  };

  const cattleData = [
    { label: "Cow", value: "Cow" },
    { label: "Bull", value: "Bull" },
    { label: "Yearling", value: "Yearling" },
  ];
  const confirmExit = () => {
    Alert.alert(
      "Confirm Exit",
      "Are you sure you want to exit editing? Your changes will not be saved.",
      [
        {
          text: "Yes",
          onPress: () => navigation.navigate("Herd"),
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    );
  };
  const handleSave = async () => {
    const updatedHerdData = {
      herdName,
      landOwner,
      paddockNumber,
      cattleClass,
      headSize,
      auValue,
      herdStatus,
      comments,
      dateEntered: moment(dateEntered).format("YYYY-MM-DD"),
      exitDate: moment(exitDate).format("YYYY-MM-DD"),
    };

    fetch(`${Config.API_URL}/herds/edit/${herdData.id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedHerdData),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          Alert.alert("Success", "Herd updated successfully", [
            { text: "OK", onPress: () => navigation.navigate("Herd") },
          ]);
        } else {
          Alert.alert(
            "Update Failed",
            data.message || "An error occurred during the update process"
          );
        }
      })
      .catch((error) => {
        console.error("Network Error:", error);
        Alert.alert("Network Error", "Unable to connect to the server");
      });
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);
  useEffect(() => {
    setHeadSize(herdData.headSize ?? "");
  }, [herdData.headSize]);
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
            <Text style={styles.headerText}>Edit Herd</Text>
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
          <View style={styles.editingContainer}>
            <Text style={styles.editingTitle}>
              Currently Editing Herd #{herdData.herdName}
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
              placeholder="Enter Herd Name"
              value={herdName}
              onChangeText={setHerdName}
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
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              alignSelf: "center",
              marginTop: 10,
              marginBottom: 10,
              paddingHorizontal: 5,
            }}
          >
            <View
              style={{
                width: "100%",
                height: 50,
                borderRadius: 10,
                borderWidth: 0.6,
                backgroundColor: "#ffff",
                marginRight: 4,
              }}
            >
              <TextInput
                placeholder="Paddock Number"
                value={paddockNumber}
                onChangeText={(text) => setPaddockNumber(text)}
                style={{
                  // width: "100%",
                  height: 50,
                  fontFamily: "JosefinSans-Medium",
                  fontSize: 17,
                  borderRadius: 10,
                  paddingLeft: 10,
                }}
              />
            </View>

            {/* <View
              style={{
                width: "49%",
                height: 50,
                borderWidth: 0.6,
                borderRadius: 10,
                backgroundColor: "#ffff",
                marginLeft: 4,
                fontFamily: "JosefinSans-Medium",
              }}
            >
              <Picker
                selectedValue={cattleClass}
                onValueChange={(itemValue, itemIndex) => {
                  setCattleClass(itemValue);
                }}
              >
                <Picker.Item label="Cattle Class" value="placeholder" />
                <Picker.Item label="Cow" value="Cow" />
                <Picker.Item label="Bull" value="Bull" />
                <Picker.Item label="Yearling" value="Yearling" />
              </Picker>
            </View> */}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "center",
              paddingHorizontal: 5,
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
              // marginBottom: 10,
              marginTop: 10,
              width: "100%",
              alignSelf: "center",
              paddingHorizontal: 5,
            }}
          >
            <View style={{ width: "49%" }}>
              <TextInput
                placeholder="Head Size"
                value={`${herdData.headSize ?? ""}`}
                onChangeText={(text) => setHeadSize(text)}
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
            </View>

            <View style={{ width: "49%" }}>
              <TextInput
                placeholder="AU Value"
                value={auValue}
                onChangeText={(text) => setAuValue(text)}
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
              alignItems: "center",
              marginTop: 10,
              width: "100%",
              alignSelf: "center",
              marginTop: 10,
              paddingHorizontal: 5,
            }}
          >
            <TextInput
              placeholder="Status"
              value={herdStatus}
              onChangeText={(text) => setHerdStatus(text)}
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
              <TouchableOpacity onPress={() => setOpenDateEntered(true)}>
                <Text>Date Entered</Text>
                <Text
                  style={{
                    width: "100%",
                    color: "#000000",
                    fontSize: 17,
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
                  onChange={onDateEnteredChange}
                />
              )}
            </View>
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
              <TouchableOpacity onPress={() => setOpenExitDate(true)}>
                <Text>Exit Date</Text>
                <Text
                  style={{
                    width: "100%",
                    color: "#000000",
                    fontSize: 17,
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
                  onChange={onExitDateChange}
                />
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
                Edit Herd
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UpdateHerd;

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
  rowErrorText: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
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
});
