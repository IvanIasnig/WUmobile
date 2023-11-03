import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import workoutPlans from "../data/workoutPlan";

// Import images differently for React Native
const gymImages = [
  require("../images/gym1.jpg"),
  require("../images/gym2.jpg"),
  require("../images/gym3.jpg"),
  require("../images/gym4.jpg"),
  require("../images/gym5.jpg"),
  require("../images/gym6.jpg"),
];

function Workout() {
  // Get the user activity level and select the appropriate workout plan
  const userActivity = JSON.parse(localStorage.getItem("restOfData")).activity;
  const userWorkoutPlan = workoutPlans[userActivity];

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Weekly Training</Text>
      <ScrollView style={styles.scrollView}>
        {Object.entries(userWorkoutPlan.week).map(([day, exercises], idx) => (
          <ImageBackground
            key={day}
            source={gymImages[idx % gymImages.length]}
            style={styles.card}
            imageStyle={styles.cardImage}
          >
            <Text style={styles.cardHeader}>{day}</Text>
            <View style={styles.cardContent}>
              {exercises.map((exercise, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.exerciseText}>
                    <Text style={styles.exerciseName}>{exercise.exercise}</Text>{" "}
                    - {exercise.sets} sets of {exercise.reps} reps
                  </Text>
                </View>
              ))}
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
    </View>
  );
}

// Define styles for React Native components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginVertical: 16,
  },
  scrollView: {
    padding: 8,
  },
  card: {
    marginBottom: 16,
    borderRadius: 15,
    overflow: "hidden",
    // shadow properties are not supported in the same way on Android
    elevation: 5, // Only works on Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  cardImage: {
    resizeMode: "cover",
  },
  cardHeader: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    color: "white",
    paddingVertical: 10,
  },
  cardContent: {
    padding: 16,
  },
  listItem: {
    marginBottom: 10,
  },
  exerciseText: {
    fontSize: 18,
    color: "white",
  },
  exerciseName: {
    fontWeight: "bold",
  },
});

export default Workout;
