import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "react-native-vector-icons";
import { TouchableOpacity } from "react-native";
import Config from "../Config";

const RemoveAnimal = ({ navigation, route }) => {
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
  const [dropdownData, setDropdownData] = useState([]);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <View styles={styles.livestockDropdown}>
          <Text style={[styles.label, isFocus && { color: "blue" }]}>
            Select animal:
          </Text>
        </View>
      );
    }
    return null;
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

  useEffect(() => {
    if (herdData && herdData.id) {
      const url = `${Config.API_URL}/animals/view/${herdData.id}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const formattedData = data.animals.map((animal) => ({
            label: `Tag: ${animal.tagNumber}`,
            value: animal.id,
          }));
          setDropdownData(formattedData);
        })
        .catch((error) => {
          console.error("Error fetching animals with URL " + url + ": ", error);
        });
    }
  }, [herdData]);

  // const handleRemoveAnimal = async () => {
  //   const newAnimalData = {
  //     imageUrl: getRandomImageUrl(),
  //   };
  // };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this animal?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteAnimal(value),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );

  const deleteAnimal = (animalId) => {
    fetch(`${Config.API_URL}/animals/delete/${animalId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
            <Text style={styles.headerText}>Remove Livestock</Text>
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
              width: "100%",
              fontFamily: "JosefinSans-Medium",
            }}
          >
            {renderLabel()}
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
              placeholder={!isFocus ? "Select animal via animal tag:" : "..."}
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
              onPress={createTwoButtonAlert}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "JosefinSans-Bold",
                  color: "white",
                }}
              >
                Remove Animal
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RemoveAnimal;

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 50,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "JosefinSans-BoldItalic",
    fontSize: 22,
    marginLeft: 15,
  },
  backButton: {
    marginLeft: 10,
  },
  dropdown: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginTop: 10,
  },
  livestockDropdown: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginTop: 10,
  },
  container: {
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    flex: 1,
    overflow: "hidden",
  },
  label: {
    color: "black",
    fontFamily: "JosefinSans-Medium",
    fontSize: 16,
  },
  placeholderStyle: {
    color: "black",
    fontFamily: "JosefinSans-Medium",
    fontSize: 16,
  },
  selectedTextStyle: {
    color: "black",
    fontFamily: "JosefinSans-Medium",
    fontSize: 16,
  },
  inputSearchStyle: {
    color: "black",
    fontFamily: "JosefinSans-Medium",
    fontSize: 16,
  },
  iconStyle: {
    color: "black",
  },
});
