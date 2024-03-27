import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MultiSelect, Dropdown } from "react-native-element-dropdown";
import Config from "../Config";

const MoveAnimals = ({ navigation, route }) => {
  const { herdData } = route.params;
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [destinationHerd, setDestinationHerd] = useState(null);

  const [herds, setHerds] = useState([]);
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchHerds = async () => {
      try {
        const response = await fetch(`${Config.API_URL}/herds/view`);
        const data = await response.json();

        const filteredHerds = data.herds.filter(
          (herd) => herd.id !== herdData.id
        );
        setHerds(
          filteredHerds.map((herd) => ({
            label: herd.herdName,
            value: herd.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching herds:", error);
      }
    };

    const fetchAnimals = async () => {
      if (herdData && herdData.id) {
        const url = `${Config.API_URL}/animals/view/${herdData.id}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          const formattedData = data.animals.map((animal) => ({
            label: `Tag: ${animal.tagNumber}`,
            value: animal.id,
          }));
          setAnimals(formattedData);
        } catch (error) {
          console.error("Error processing animals data:", error);
        }
      }
    };

    fetchHerds();
    fetchAnimals();
  }, [herdData]);

  const moveAnimals = () => {
    if (selectedAnimals.length === 0 || !destinationHerd) {
      Alert.alert(
        "Error",
        "Please select at least one animal and a destination herd."
      );
      return;
    }

    fetch(`${Config.API_URL}/animals/move`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        animalIds: selectedAnimals,
        destinationHerdId: destinationHerd,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        Alert.alert("Success", data.message);
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Error moving animals. Please try again.");
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Move Animal</Text>
        </View>

        <Text style={styles.label}>Select Animals to Move:</Text>
        <MultiSelect
          style={styles.dropdown}
          data={animals}
          valueField="value"
          labelField="label"
          iconStyle={styles.iconStyle}
          selectedValues={selectedAnimals}
          onChange={(selectedItems) => {
            setSelectedAnimals(selectedItems);
          }}
          search
        />

        {selectedAnimals.length > 0 && (
          <>
            <Text style={styles.label}>Selected Animals:</Text>
            {animals
              .filter((animal) => selectedAnimals.includes(animal.value))
              .map((animal, index) => (
                <View key={index} style={styles.selectedAnimalDetails}>
                  <Text>{animal.label}</Text>
                </View>
              ))}

            <Text style={styles.label}>Select Destination Herd:</Text>
            <Dropdown
              style={styles.dropdown}
              data={herds}
              valueField="value"
              labelField="label"
              selected={destinationHerd}
              onChange={(item) => setDestinationHerd(item.value)}
            />

            <TouchableOpacity style={styles.button} onPress={moveAnimals}>
              <Text style={styles.buttonText}>Move Animal</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    flex: 1,
    overflow: "hidden",
  },
  headerContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontFamily: "JosefinSans-BoldItalic",
    fontSize: 22,
    marginLeft: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "JosefinSans-BoldItalic",
  },
  dropdown: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  dropdownText: {
    color: "black",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "JosefinSans-BoldItalic",
  },
  multiDropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  iconStyle: {
    color: "black",
  },
});

export default MoveAnimals;
