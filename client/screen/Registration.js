import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useAuth } from "../provider/AuthProvider";

function RegistrationApp({ navigation }) {
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    age: "",
    sex: "",
    password: "",
    mail: "",
    username: "",
    height: "",
    weight: "",
    activity: "",
  });

  const formFields = [
    { label: "Surname", name: "surname", type: "text" },
    { label: "Name", name: "name", type: "text" },
    { label: "Age", name: "age", type: "number" },
    { label: "Sex", name: "sex", type: "text" },
    { label: "Password", name: "password", type: "password" },
    { label: "Email", name: "mail", type: "email" },
    { label: "Username", name: "username", type: "text" },
    { label: "Height", name: "height", type: "number" },
    { label: "Weight", name: "weight", type: "number" },
    { label: "Activity", name: "activity", type: "text" },
  ];

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await register(formData);
      await login({ mail: formData.mail, password: formData.password });
      navigation.navigate("Landingpage");
      console.log("Registrazione riuscita!");
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
    }
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require("../images/gymLogin.jpg")}
        style={styles.container}
      >
        <View style={styles.card}>
          <Text style={styles.header}>Register</Text>
          {formFields.map((field, index) => (
            <View key={index} style={styles.inputContainer}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => handleChange(field.name, value)}
                value={formData[field.name]}
                secureTextEntry={field.type === "password"}
                keyboardType={field.type === "number" ? "numeric" : "default"}
                autoCapitalize="none"
              />
            </View>
          ))}
          <Button title="Registra" onPress={handleSubmit} color="#000" />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "2%",
  },
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 25,
    padding: 20,
    width: "80%",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: "#000",
    shadowOffset: { height: 4, width: 0 },
  },
  header: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    color: "#FFF",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
  },
  // ... altri stili che potrebbero servire
});

export default RegistrationApp;
