import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Logo = require("../images/icon.png"); // Ensure you have the logo in your assets and correct path is provided

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <Image source={Logo} style={styles.logo} />
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Diet")}>
          <Text style={styles.navItem}>Diet</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Workout")}>
          <Text style={styles.navItem}>Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Tables")}>
          <Text style={styles.navItem}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
          <Text style={styles.navItem}>My Photos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Exercises")}>
          <Text style={styles.navItem}>Exercises</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(30, 30, 30)",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logo: {
    height: 40,
    marginRight: 20,
    // Add resizeMode if your logo doesn't fit well
    resizeMode: "contain",
  },
  linksContainer: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between", // Depending on your layout, you may want 'space-around'
  },
  navItem: {
    color: "white",
    fontWeight: "bold",
    padding: 8,
    // fontSize, fontFamily, etc., should match your web styles if you want exact parity
  },
});

export default Navbar;
