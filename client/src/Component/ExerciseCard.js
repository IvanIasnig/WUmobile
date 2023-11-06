import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ExerciseCard = ({
  name,
  difficulty,
  muscle,
  equipment,
  instructions,
  isExpanded,
  onToggle,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Difficulty: {difficulty}</Text>
        <Text style={styles.detail}>Muscle: {muscle}</Text>
        <Text style={styles.detail}>Equipment: {equipment}</Text>
        {isExpanded && (
          <Text style={styles.instructions}>
            Instructions: "{instructions}"
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={isExpanded ? styles.buttonOpen : styles.button}
        onPress={onToggle}
      >
        <Text style={styles.buttonText}>
          {isExpanded ? "Close" : "Read all"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent", // you can change this to match your design
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "rgba(0,0,0,0.5)", // Or any other color with some transparency
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

export default ExerciseCard;
