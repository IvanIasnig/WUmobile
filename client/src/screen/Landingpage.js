import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import dietImage from "../images/diet4.jpg";
import workoutImage from "../images/workout.jpg";
import statsImage from "../images/stats.jpg";
import photocameraImage from "../images/photocamera.jpg";
import exercises from "../images/exercisesLabel.jpg";

function Landingpage() {
  const navigation = useNavigation();

  const sections = [
    {
      label: "Diet",
      link: "Diet",
      backgroundImage: dietImage,
    },
    {
      label: "Workout",
      link: "Workout",
      backgroundImage: workoutImage,
    },
    {
      label: "Tables",
      link: "Tables",
      backgroundImage: statsImage,
    },
    {
      label: "Photo",
      link: "Photo",
      backgroundImage: photocameraImage,
    },
    {
      label: "Exercises",
      link: "Exercises",
      backgroundImage: exercises,
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        {sections.map((section) => (
          <ImageBackground
            key={section.label}
            source={section.backgroundImage}
            style={styles.section}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate(section.link)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{section.label}</Text>
            </TouchableOpacity>
          </ImageBackground>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    height: 230,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    // Aggiungi altri stili per il bottone se necessario
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    // Aggiungi altri stili per il testo se necessario
  },
  // Aggiungi altri stili qui se necessario
});

export default Landingpage;
