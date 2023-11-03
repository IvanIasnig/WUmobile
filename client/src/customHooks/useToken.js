import AsyncStorage from "@react-native-async-storage/async-storage";

const useToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    return token;
  } catch (error) {
    console.error("Error accessing the token from AsyncStorage", error);
    return null;
  }
};

export default useToken;
