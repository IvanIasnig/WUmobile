import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Picker,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import bg from "../images/exercisesBg.jpg";
import ExerciseCard from "../Component/ExerciseCard";
import Loading from "../Component/Loading";
// import Loading from "../component/Loading"; // Make sure you have a React Native compatible loading component

function Exercises() {
  const [help, setHelp] = useState(null);
  const [muscle, setMuscle] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
  }, [muscle]);

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (isLoading) {
    return <Loading isVisible={true} />;
  }

  return (
    <ImageBackground source={bg} style={styles.backgroundImage}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={muscle}
            onValueChange={(itemValue, itemIndex) => {
              setMuscle(itemValue);
            }}
            style={styles.picker}
            mode="dropdown"
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
            <ExerciseCard
              {...item}
              isExpanded={expandedId === index}
              onToggle={() => handleExpandClick(index)}
            />
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
    backgroundColor: "transparent",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    textAlign: "left",
  },
  searchButton: {
    backgroundColor: "#06bcee",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
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
