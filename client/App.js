import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screen/Login";
import { AuthProvider } from "./src/provider/AuthProvider";
import Registration from "./src/screen/Registration";
import Landingpage from "./src/screen/Landingpage";
import Diet from "./src/screen/Diet";
import Workout from "./src/screen/Workout";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Landingpage" component={Landingpage} />
          <Stack.Screen name="Diet" component={Diet} />
          <Stack.Screen name="Workout" component={Workout} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
