import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import {
  MaterialIcons,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import Modal from "react-native-modal";
import Config from "../Config";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";

const ViewHerd = ({ navigation, route }) => {
  const { herd } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [herdDetails, setHerdDetails] = useState(herd);

  const goBack = () => {
    navigation.goBack();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchHerdDetails = (id) => {
    fetch(`${Config.API_URL}/herds/view/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setHerdDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching herd details:", error);
      });
  };

  // useEffect(() => {
  //   if (herd && herd.id) {
  //     fetchHerdDetails(herd.id);
  //   }
  // }, [herd]);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (herd && herd.id) {
  //       fetchHerdDetails(herd.id);
  //     }
  //   }, [herd])
  // );

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this herd?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteHerd(herd.id),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );

  const deleteHerd = (id) => {
    fetch(`${Config.API_URL}/herds/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.ok) {
          Alert.alert("Success", "Herd deleted successfully");
          navigation.navigate("Herd");
        } else {
          const data = await response.json();
          Alert.alert(
            "Deletion Failed",
            data.message || "An error occurred during the deletion process"
          );
        }
      })
      .catch((error) => {
        console.error("Network Error:", error);
        Alert.alert("Network Error", "Unable to connect to the server");
      });
  };

  const getImage = (imageName) => {
    switch (imageName) {
      case "../assets/img/cow1.jpg":
        return require("../assets/img/cow1.jpg");
      case "../assets/img/cow2.jpg":
        return require("../assets/img/cow2.jpg");
      case "../assets/img/cow3.jpg":
        return require("../assets/img/cow3.jpg");
      case "../assets/img/cow4.jpg":
        return require("../assets/img/cow4.jpg");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <MaterialIcons name="arrow-back" size={35} />
          </TouchableOpacity>
          <Text style={styles.headerText}>View Herd</Text>

          <TouchableOpacity
            style={{ position: "absolute", right: 10, padding: 10 }}
            onPress={toggleModal}
          >
            <Entypo name="dots-three-vertical" size={22} />
          </TouchableOpacity>
        </View>

        {/* Display alert message within the component */}
        <View style={{ width: "97%", alignSelf: "center", top: 15 }}>
          <Image
            source={getImage(herd.imageUrl)}
            resizeMode="stretch"
            style={{ width: "100%", height: 250, borderRadius: 10 }}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.herdInformationTitle}>Herd Information</Text>
          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Herd Name</Text>
              <Text style={styles.infoContent}>{herd.herdName}</Text>
            </View>

            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Land Owner</Text>
              <Text style={styles.infoContent}>{herd.landOwner}</Text>
            </View>
          </View>

          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Paddock Number</Text>
              <Text style={styles.infoContent}>{herd.paddockNumber}</Text>
            </View>

            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Cattle Class</Text>
              <Text style={styles.infoContent}>{herd.cattleClass}</Text>
            </View>
          </View>

          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Head Size</Text>
              <Text style={styles.infoContent}>{herdDetails.headSize}</Text>
            </View>

            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>AU Value</Text>
              <Text style={styles.infoContent}>{herd.auValue}</Text>
            </View>
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Status</Text>
              <Text style={styles.infoContent}>
                {herd.herdStatus ? herd.herdStatus : "N/A"}
              </Text>
            </View>
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Comments</Text>
              <Text style={styles.infoContent}>
                {herd.comments ? herd.comments : "N/A"}
              </Text>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Date Entered</Text>
              <Text style={styles.infoContent}>{herd.dateEntered}</Text>
            </View>

            <View>
              <Text style={styles.infoTitle}>Exit Date</Text>
              <Text style={styles.infoContent}>{herd.exitDate}</Text>
            </View>
            <View>
              <Text style={styles.infoTitle}>Days Until Move</Text>
              <Text style={styles.infoContent}>
                {moment(herd.exitDate).diff(moment(), "days")}
              </Text>
            </View>
          </View>
        </View>

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          animationInTiming={500}
          animationOutTiming={500}
          style={{
            width: "100%",
            marginLeft: 0,
            marginBottom: 0,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 10,
          }}
        >
          <View style={styles.modalContainer}>
            <View style={{ padding: 10, flex: 1 }}>
              <View
                style={{
                  padding: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "black",
                }}
              >
                <FontAwesome name="edit" size={30} color="blue" />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("UpdateHerd", {
                      herdData: herd,
                    });
                  }}
                  style={{ marginLeft: 10 }}
                >
                  <Text style={{ fontFamily: "JosefinSans-Medium" }}>
                    Edit herd
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  padding: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "black",
                }}
              >
                <FontAwesome name="edit" size={30} color="black" />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("MoveAnimals", {
                      herdData: herd,
                    });
                  }}
                  style={{ marginLeft: 10 }}
                >
                  <Text style={{ fontFamily: "JosefinSans-Medium" }}>
                    Move animals to other herd
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  padding: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "black",
                }}
              >
                <MaterialCommunityIcons
                  name="delete-empty"
                  size={30}
                  color="green"
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("RemoveAnimal", {
                      herdData: herd,
                    });
                  }}
                  style={{ marginLeft: 10 }}
                >
                  <Text style={{ fontFamily: "JosefinSans-Medium" }}>
                    Delete specific animal
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  padding: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "black",
                }}
              >
                <MaterialCommunityIcons
                  name="delete-empty"
                  size={30}
                  color="red"
                />
                <TouchableOpacity
                  onPress={createTwoButtonAlert}
                  style={{ marginLeft: 10 }}
                >
                  <Text style={{ fontFamily: "JosefinSans-Medium" }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    flex: 1,
    overflow: "hidden",
  },
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
  modalContainer: {
    width: "100%",
    height: "50%",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoTitle: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 15,
    color: "#333",
    fontFamily: "JosefinSans-BoldItalic",
  },
  infoContent: {
    fontSize: 18,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  herdInformationTitle: {
    fontSize: 26,
    textAlign: "center",
    borderColor: "black",
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    fontFamily: "JosefinSans-BoldItalic",
    marginBottom: 10,
  },
  textContainer: {
    marginTop: 10,
    padding: 10,
  },

  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderRadius: 20,
    borderBottomWidth: 1,
    borderColor: "black",
    padding: 10,
    backgroundColor: "#f2f2f2",
  },

  itemContainer: {
    flex: 1,
    marginRight: 10,
  },

  dateContainer: {
    marginBottom: 10,
    borderRadius: 20,
    borderBottomWidth: 1,
    borderColor: "black",
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
});

export default ViewHerd;
