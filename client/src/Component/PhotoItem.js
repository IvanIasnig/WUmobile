import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const PhotoItem = ({ item, onSelectImage, onDelete, onDownload }) => (
  <View style={styles.card}>
    <TouchableOpacity onPress={() => onSelectImage(item)}>
      <Image
        style={styles.image}
        source={{ uri: `data:image/png;base64,${item.data}` }}
      />
    </TouchableOpacity>
    <Text style={styles.description}>{item.description}</Text>
    <Text style={styles.date}>{item.date}</Text>
    <Button title="Delete" onPress={() => onDelete(item.id)} />
    <Button title="Download" onPress={() => onDownload(item.data)} />
  </View>
);

const styles = StyleSheet.create({
  // Definisci qui i tuoi stili per card, image, description, e date
});

export default PhotoItem;
