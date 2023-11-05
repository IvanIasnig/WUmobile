import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Photo = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  const handleUpload = async (imageUri) => {
    console.log(imageUri);

    const formData = new FormData();
    const response = await fetch(imageUri);
    const blob = await response.blob();

    formData.append("file", blob);
    formData.append("description", "description");
    formData.append("date", "2023-01-01");

    const token = await AsyncStorage.getItem("authToken");
    const decode = jwtDecode(token);
    const userId = decode.sub;

    if (!userId) {
      console.error("Impossibile recuperare l'ID dell'utente dal token.");
      return;
    }
    formData.append("id", userId);

    console.log(token);
    console.log(userId);

    try {
      await axios.post("http://localhost:3001/user/images", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      fetchAndSetImage(userId);
    } catch (error) {
      console.error("Errore durante l'upload dell'immagine:", error);
    }
  };

  const fetchAndSetImage = async (userId) => {
    const token = await AsyncStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `http://localhost:3001/user/${userId}/images`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setImages(response.data);

      console.log(images);
    } catch (error) {
      console.error("Errore durante il recupero dell'immagine:", error);
    }
  };

  useEffect(() => {
    // Definisci una funzione asincrona all'interno di useEffect
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const decode = jwtDecode(token);
          const userId = decode.sub;
          if (userId) {
            fetchAndSetImage(userId);
          } else {
            console.error("User ID non presente nel token.");
          }
        } else {
          console.error("Token non trovato.");
        }
      } catch (error) {
        console.error(
          "Errore durante il recupero del token o durante la decodifica:",
          error
        );
      }
    };

    fetchUserData();
  }, []);

  const handleImagePick = async () => {
    let pickerResult;
    if (Platform.OS !== "web") {
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    } else {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          handleUpload(reader.result);
        };
        reader.readAsDataURL(file);
      };
      fileInput.click();
      return;
    }

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.uri);
      handleUpload(pickerResult.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleImagePick}>
        <Text style={styles.buttonText}>Seleziona Foto</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.gridContainer}>
          {images.map((image, index) => (
            <View key={index} style={styles.gridItem}>
              <Image
                style={styles.cardMedia}
                source={{ uri: `data:image/png;base64,${image.data}` }}
                resizeMode="cover" // 'cover' tende ad essere più estetico per le immagini
              />
              <View style={styles.cardContent}>
                <Text style={styles.imageDescription}>{image.description}</Text>
                <View style={styles.dateContainer}>
                  <Ionicons name="calendar" size={16} color="#6e6e6e" />
                  <Text style={styles.imageDate}>{image.date}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Un colore di sfondo neutro per non distogliere dall'immagine
  },
  button: {
    backgroundColor: "#007AFF", // Un blu tipico dei pulsanti interattivi
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  scrollViewContent: {
    paddingBottom: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Assicura un margine equo tra gli elementi
    padding: 8,
  },
  gridItem: {
    width: "48%", // Aumentato per dare spazio visivo tra gli elementi
    aspectRatio: 1, // Mantiene le immagini quadrate, a seconda delle tue necessità
    marginBottom: 10,
    borderRadius: 15, // Bordi arrotondati per una sensazione più morbida
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 5, // Semplice elevazione per la shadow
  },
  cardMedia: {
    width: "100%",
    height: "100%",
  },
  cardContent: {
    padding: 10,
  },
  imageDescription: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  imageDate: {
    fontSize: 12,
    color: "#6e6e6e",
    marginLeft: 5,
  },
  // Resto dei tuoi stili...
});

export default Photo;
