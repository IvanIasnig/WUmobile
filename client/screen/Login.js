import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useAuth } from "../provider/AuthProvider"; // Assicurati che il provider funzioni con React Native
//import Logo from "../component/Logo"; // Questo componente dovrà essere anch'esso refactored per React Native
import gymLogin from "../images/gymLogin.jpg";

function Login({ navigation }) {
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });
  //const [logoVisible, setLogoVisible] = useState(true);
  const [loginError, setLoginError] = useState("");

  const { login } = useAuth();

  //   useEffect(() => {
  //     const logoTimeout = setTimeout(() => {
  //       setLogoVisible(false);
  //     }, 5000);

  //     return () => clearTimeout(logoTimeout);
  //   }, []);

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await login({ mail: formData.mail, password: formData.password });
      navigation.navigate("Landingpage");
    } catch (error) {
      console.error("Errore durante il login:", error);
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  return (
    <ImageBackground source={gymLogin} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* {logoVisible ? (
          <Logo />
        ) : ( */}
        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            Please enter your login and password!
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#ffffff90"
            onChangeText={(value) => handleChange("mail", value)}
            value={formData.mail}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ffffff90"
            onChangeText={(value) => handleChange("password", value)}
            value={formData.password}
            secureTextEntry
          />
          {loginError.length > 0 && (
            <Text style={styles.errorText}>{loginError}</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
            <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
        {/* )} */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#ffffff90",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#ffffff30",
    color: "#fff",
    width: "100%",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  errorText: {
    color: "red",
    marginTop: 8,
  },
  button: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  linkText: {
    color: "#ffffff90",
    marginTop: 20,
  },
});

export default Login;
