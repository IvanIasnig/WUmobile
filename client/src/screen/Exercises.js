import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Picker,
  Button,
  SafeAreaView,
  StatusBar,
} from "react-native";
import axios from "axios";
// import Loading from "../component/Loading"; // Make sure you have a React Native compatible loading component

function Exercises() {
  const [help, setHelp] = useState(null);
  const [muscle, setMuscle] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //const exeBg = "../images/exercisesBg.jpg"; // Make sure the image is added to your project

  const muscles = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
  ];

  const exe = async () => {
    const key = "O8Wud7XdQacxnNvNgPTVhA==JLgBvWH7PqMR9mM1";
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`,
        {
          headers: { "X-Api-Key": key },
        }
      );

      const exer = response.data;
      setHelp(exer);
    } catch (error) {
      console.error("Error" + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    exe();
  }, []);

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  //   if (isLoading) {
  //     return <Loading />;
  //   }

  return (
    <ImageBackground
      //source={require(exeBg)} // Ensure the image is in the correct folder
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Exercise Finder</Text>
          <Button title="Cerca" onPress={() => exe()} color="#06bcee" />
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={muscle}
            onValueChange={(itemValue) => setMuscle(itemValue)}
            style={styles.picker}
            mode="dropdown" // Android only
          >
            <Picker.Item label="Select Muscle Group" value="" />
            {muscles.map((muscleOption) => (
              <Picker.Item
                key={muscleOption}
                label={
                  muscleOption.charAt(0).toUpperCase() + muscleOption.slice(1)
                }
                value={muscleOption}
              />
            ))}
          </Picker>
        </View>
        <FlatList
          data={help}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>
              <View style={styles.detailsContainer}>
                <Text style={styles.detail}>Difficulty: {item.difficulty}</Text>
                <Text style={styles.detail}>Muscle: {item.muscle}</Text>
                <Text style={styles.detail}>Equipment: {item.equipment}</Text>
                {expandedId === index && (
                  <Text style={styles.instructions}>
                    Instructions: "{item.instructions}"
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={expandedId === index ? styles.buttonOpen : styles.button}
                onPress={() => handleExpandClick(index)}
              >
                <Text style={styles.buttonText}>
                  {expandedId === index ? "Close" : "Read all"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  header: {
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  picker: {
    height: 50,
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  detailsContainer: {
    marginTop: 10,
  },
  detail: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  instructions: {
    marginTop: 10,
    fontStyle: "italic",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#06bcee",
    padding: 10,
    borderRadius: 5,
  },
  buttonOpen: {
    marginTop: 10,
    backgroundColor: "#ff5252",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default Exercises;
