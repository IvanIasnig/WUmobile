import React from "react";
import { View, Modal, Text, StyleSheet } from "react-native";
import Lottie from "react-native-web-lottie"; // Importa Lottie dalla libreria corretta

import animationData from "../images/loading.json";

const Loading = ({ isVisible }) => {
  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.loadingBox}>
          <Lottie source={animationData} autoPlay loop style={styles.lottie} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  loadingBox: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lottie: {
    width: 100,
    height: 100,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default Loading;
