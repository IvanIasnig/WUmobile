import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import useToken from "../customHooks/useToken";
import UseDecodeToken from "../customHooks/UseDecodeToken";
import WeeklyMealPlan from "../Component/WeeklyMealPlan";

import Bg from "../images/foodbg.jpg";
import Mon from "../images/foodmon.jpg";
import Tue from "../images/foodtue.jpg";
import Thu from "../images/foodthu.jpg";
import Wed from "../images/foodwed.jpg";
import Fri from "../images/foodfri.jpg";
import Sat from "../images/foodsat.jpg";
import Sun from "../images/foodsun.jpg";

function Diet() {
  const [weekDiet, setWeekDiet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        const token = await useToken();
        if (token) {
          const userId = UseDecodeToken(token);
          await fetchAndSetDiet(userId, token);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchTokenAndData();
  }, []);

  const fetchAndSetDiet = async (userId, token) => {
    try {
      const response = await axios.get(
        `http://192.168.0.75:3001/user/diet/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWeekDiet(response.data);
    } catch (error) {
      console.error("Error fetching diet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDiet = async () => {
    const token = await useToken();
    const userId = UseDecodeToken(token);

    try {
      const response = await axios.delete(
        `http://192.168.0.75:3001/user/diet/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setWeekDiet(response.data);
    } catch (error) {
      console.error("Error :", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const dayBackgrounds = [Mon, Tue, Thu, Wed, Fri, Sat, Sun];

  return (
    <ImageBackground source={Bg} style={styles.background}>
      <ScrollView>
        {weekDiet ? (
          weekDiet.dayDiets.map((day, index) => (
            <View key={index} style={styles.card}>
              <ImageBackground
                source={dayBackgrounds[index]}
                style={styles.cardContent}
              >
                <Text style={styles.dayName}>{day.dayName}</Text>
                {[
                  "breakfast",
                  "morningSnack",
                  "lunch",
                  "afternoonSnack",
                  "dinner",
                ].map((meal) => (
                  <View key={meal} style={styles.meal}>
                    <Text style={styles.mealName}>
                      {meal.charAt(0).toUpperCase() + meal.slice(1)}
                    </Text>
                    <Text style={styles.mealDetail}>
                      {day[meal].food} - {day[meal].grams} grams
                    </Text>
                  </View>
                ))}
              </ImageBackground>
            </View>
          ))
        ) : (
          // Replace this with your WeeklyMealPlan component tailored for React Native
          <WeeklyMealPlan />
          // <Text>NULLAAAA</Text>
        )}
        <TouchableOpacity
          onPress={() => {
            deleteDiet();
          }}
          style={styles.deleteButton}
        >
          <Text>Delete Diet</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  cardContent: {
    padding: 20,
  },
  dayName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textShadow: "2px 2px 4px black",
  },
  meal: {
    marginTop: 10,
  },
  mealName: {
    fontSize: 20,
    color: "white",
    textShadow: "2px 2px 4px black",
  },
  mealDetail: {
    fontSize: 16,
    color: "white",
    textShadow: "2px 2px 4px black",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  // Add additional styles as needed
});

export default Diet;
