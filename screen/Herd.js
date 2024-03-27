import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useCallback, setForceUpdate } from "react";
import { Searchbar } from "react-native-paper";
import { Entypo } from "react-native-vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import Config from "../Config";
import moment from "moment";

const Herd = ({ navigation }) => {
  const [herdData, setHerdData] = useState([]);
  const [filteredHerds, setFilteredHerds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const fetchHerds = useCallback(async () => {
    try {
      const response = await fetch(`${Config.API_URL}/herds/view`);
      const data = await response.json();
      setHerdData(data.herds ?? []);
    } catch (error) {
      console.error("Failed to fetch herds:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchHerds();
    }, [fetchHerds])
  );

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = herdData.filter((herd) =>
        herd.herdName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHerds(filtered);
    } else {
      setFilteredHerds(herdData);
    }
  }, [searchQuery, herdData]);

  const handleItemPress = (herd) => {
    navigation.navigate("ViewHerd", { herd });
  };

  const handleAnimalPress = (herdData) => {
    navigation.navigate("AddAnimal", { herdData });
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Image
            source={require("../assets/img/logos.png")}
            resizeMode="cover"
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Herd List</Text>
      </View>
      <View>
        <Searchbar
          style={styles.searchBar}
          placeholder="Search available herds"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <View style={styles.twoButton}>
        <TouchableOpacity
          style={styles.addHerdButton}
          onPress={() => navigation.navigate("AddHerd")}
        >
          <Text style={styles.addHerdButtonText}>Add Herd</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addHerdButton}
          onPress={() => handleAnimalPress({ herdData })}
        >
          <Text style={styles.addHerdButtonText}>Add Single Livestock</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {filteredHerds.length > 0 ? (
          filteredHerds.map((herd, index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => handleItemPress(herd)}
            >
              <View style={{ left: "2%" }}>
                <Text style={styles.itemName}>
                  Herd Name:
                  <Text style={{ fontFamily: "JosefinSans-BoldItalic" }}>
                    {herd.herdName}{" "}
                  </Text>
                </Text>
              </View>
              <View style={{ width: "100%", height: "70%" }}>
                <Image
                  source={getImage(herd.imageUrl)}
                  resizeMode="center"
                  style={styles.itemImage}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    left: "2%",
                  }}
                >
                  <Entypo name="time-slot" size={18} color="green" />
                  <Text style={styles.itemName}>
                    Days until herds are moved:{" "}
                    {moment(herd.exitDate).diff(moment(), "days")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noHerdsHeader}>No herds found.</Text>
        )}
      </ScrollView>
    </View>
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
  headerText: {
    fontFamily: "JosefinSans-BoldItalic",
    fontSize: 22,
    marginLeft: 15,
  },
  backButton: {
    marginLeft: 10,
  },
  container: {
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    flex: 1,
    overflow: "hidden",
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  itemContainer: {
    width: "96%",
    height: 200,
    alignSelf: "center",
    marginTop: "3%",
    backgroundColor: "#ffff",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  itemName: {
    fontSize: 14,
    fontFamily: "JosefinSans-Regular",
    padding: 5,
  },
  searchBar: {
    marginTop: 8,
    marginBottom: 10,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#ffff",
    borderColor: "gray",
    borderWidth: 1,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
  noHerdsHeader: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "JosefinSans-BoldItalic",
    fontSize: 20,
    marginTop: "50%",
  },
  addHerdButton: {
    marginBottom: 8,
    width: "40%",
    height: 50,
    backgroundColor: "#007000",
    borderWidth: 0.75,
    borderColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: "center",
  },
  addHerdButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  twoButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 5,
    marginBottom: 5,
  },
});

export default Herd;
