import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import UseDecodeToken from "../customHooks/UseDecodeToken";

const mealArr = function (meal) {
  if (meal === "breakfast") return "Breakfast";
  if (meal === "morningSnack") return "Morning Snack";
  if (meal === "lunch") return "Lunch";
  if (meal === "afternoonSnack") return "Afternoon Snack";
  if (meal === "dinner") return "Dinner";
};

const WeeklyMealPlan = () => {
  const [response, setResponse] = useState(null);

  const [foodData, setFoodData] = useState([]);

  var grams = async (inputGrams) => {
    const totalCalories = await totalKcal();
    return Math.floor((inputGrams * totalCalories) / 2000);
  };

  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const fetchTotalKcal = async () => {
      const total = await totalKcal();
      setTotalCalories(total);
    };
    fetchTotalKcal();
  }, []);

  const [dayDiets, setDayDiets] = useState({
    Monday: {
      breakfast: { food: "Yoplait Mixed Berry", grams: grams(100) },
      morningSnack: { food: "Smoothie", grams: grams(300) },
      lunch: { food: "Chicken Breast", grams: grams(400) },
      afternoonSnack: { food: "Multi-Grain Bread", grams: grams(120) },
      dinner: { food: "Salmon", grams: grams(400) },
    },
    Tuesday: {
      breakfast: { food: "Croissant", grams: grams(90) },
      morningSnack: { food: "Smoothie", grams: grams(200) },
      lunch: { food: "Spinach Tortellini", grams: grams(180) },
      afternoonSnack: { food: "Cherry Yogurt", grams: grams(300) },
      dinner: { food: "Low Carb Pasta", grams: grams(250) },
    },
    Wednesday: {
      breakfast: { food: "Egg", grams: grams(100) },
      morningSnack: { food: "Smoothie", grams: grams(300) },
      lunch: { food: "Chicken Breast", grams: grams(400) },
      afternoonSnack: { food: "Smoothie", grams: grams(200) },
      dinner: { food: "Salami Pizza", grams: grams(400) },
    },
    Thursday: {
      breakfast: { food: "Croissant", grams: grams(90) },
      morningSnack: { food: "Smoothie", grams: grams(200) },
      lunch: { food: "Spinach Tortellini", grams: grams(180) },
      afternoonSnack: { food: "Cherry Yogurt", grams: grams(300) },
      dinner: { food: "Low Carb Pasta", grams: grams(250) },
    },
    Friday: {
      breakfast: { food: "Yoplait Mixed Berry", grams: grams(100) },
      morningSnack: { food: "Smoothie", grams: grams(300) },
      lunch: { food: "Chicken Breast", grams: grams(400) },
      afternoonSnack: { food: "Multi-Grain Bread", grams: grams(120) },
      dinner: { food: "Salmon", grams: grams(400) },
    },
    Saturday: {
      breakfast: { food: "Egg", grams: grams(100) },
      morningSnack: { food: "Smoothie", grams: grams(300) },
      lunch: { food: "Chicken Breast", grams: grams(400) },
      afternoonSnack: { food: "Smoothie", grams: grams(200) },
      dinner: { food: "Salami Pizza", grams: grams(400) },
    },
    Sunday: {
      breakfast: { food: "Yoplait Mixed Berry", grams: grams(100) },
      morningSnack: { food: "Smoothie", grams: grams(300) },
      lunch: { food: "Chicken Breast", grams: grams(400) },
      afternoonSnack: { food: "Multi-Grain Bread", grams: grams(120) },
      dinner: { food: "Salmon", grams: grams(400) },
    },
  });

  const [availableFoods, setAvailableFoods] = useState([]);

  useEffect(() => {
    loadFoods();
  }, []);

  //const authToken = useToken();

  const loadFoods = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      console.log(authToken);
      const response = await axios.get("http://192.168.0.75:3001/api/foods", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const foods = response.data;
      console.log(foods);
      setFoodData(foods);
      setAvailableFoods([...new Set(foods.map((food) => food.foodItem))]);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  const calculateCaloriesForDay = (meals) => {
    return Object.values(meals).reduce((total, { food, grams }) => {
      const foodInfo = foodData.find((f) => f.foodItem === food);
      if (foodInfo) {
        const calsPer100gRaw = foodInfo.calsPer100grams.replace(
          /\s*\w{3}$/,
          ""
        );
        const calsPer100g = parseInt(calsPer100gRaw, 10);

        const calsForGrams = (calsPer100g / 100) * grams;
        return Math.floor(total + calsForGrams);
      }
      return total;
    }, 0);
  };

  async function totalKcal() {
    const rof = await AsyncStorage.getItem("restOfData");

    const jRof = JSON.parse(rof);
    let bmr = 0;
    if (jRof.sex === "M") {
      bmr = 66.5 + 13.75 * jRof.weight + 5.0033 * jRof.height - 6.75 * jRof.age;
    }
    if (jRof.sex === "F") {
      bmr =
        655.5 + 9.563 * jRof.weight + 1.8496 * jRof.height - 4.6756 * jRof.age;
    }
    if (jRof.activity === "SEDENTARY") bmr = bmr * 1;
    if (jRof.activity === "MILDLY") bmr = bmr * 1.1;
    if (jRof.activity === "MODERATLY") bmr = bmr * 1.2;
    if (jRof.activity === "VERY") bmr = bmr * 1.5;
    if (jRof.activity === "EXTRA") bmr = bmr * 1.7;

    return Math.floor(bmr);
  }

  const handleInputChange = (day, meal, type, value) => {
    const updatedDayDiets = { ...dayDiets };
    updatedDayDiets[day][meal][type] = value;
    setDayDiets(updatedDayDiets);
  };

  const postData = async () => {
    const authToken = await AsyncStorage.getItem("authToken");
    const userId = UseDecodeToken(authToken);
    if (!userId) {
      setResponse("Errore: impossibile ottenere l'ID dell'utente dal token.");
      return;
    }
    const url = `http://192.168.0.75:3001/user/diet/registerDiet?userId=${userId}`;

    const data = {
      dayDiets: Object.entries(dayDiets).map(([dayName, meals]) => ({
        dayName,
        ...meals,
      })),
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const result = await axios.post(url, data, config);
      setResponse(result.data);
    } catch (error) {
      console.error("Si è verificato un errore:", error.response);
      setResponse(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Total Kcal suggested per day: {totalCalories}
        </Text>
      </View>

      <ScrollView>
        {Object.entries(dayDiets).map(([day, meals]) => (
          <View key={day} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>
                {`${day} - Total Calories: ${calculateCaloriesForDay(
                  meals
                )} kcal`}
              </Text>
            </View>
            <View style={styles.cardBody}>
              {Object.entries(meals).map(([meal, details], index) => (
                <View key={`${day}-${meal}`} style={styles.row}>
                  <Text style={styles.mealText}>{mealArr(meal)}</Text>
                  <RNPickerSelect
                    //style={pickerSelectStyles} // Uncomment and define this style if you have it
                    onValueChange={(value) =>
                      handleInputChange(day, meal, "food", value)
                    }
                    items={availableFoods.map((food, index) => ({
                      label: food,
                      value: food,
                      key: `${food}-${index}`,
                    }))}
                    value={details.food}
                    placeholder={{}}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Grammi"
                    value={details.grams}
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      handleInputChange(day, meal, "grams", value)
                    }
                  />
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button onPress={postData} title="Save Meal Plan" color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "black",
  },
  infoBox: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "black",
    marginTop: 16,
    marginBottom: 16,
  },
  infoText: {
    textAlign: "center",
    color: "white",
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "black",
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  cardHeaderText: {
    textAlign: "center",
    color: "white",
  },
  cardBody: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  mealText: {
    flex: 1,
    textAlign: "center",
    color: "white",
  },
  select: {
    flex: 2,
    margin: 8,
  },
  input: {
    flex: 2,
    margin: 8,
    backgroundColor: "grey",
    color: "white",
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 16,
    alignItems: "center",
  },
});

export default WeeklyMealPlan;
