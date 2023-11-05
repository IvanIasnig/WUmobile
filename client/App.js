import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screen/Login";
import { AuthProvider } from "./src/provider/AuthProvider";
import Registration from "./src/screen/Registration";
import Landingpage from "./src/screen/Landingpage";
import Diet from "./src/screen/Diet";
import Workout from "./src/screen/Workout";
import Photo from "./src/screen/Photo";
import AllTables from "./src/screen/AllTables";
import Exercises from "./src/screen/Exercises";

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
          <Stack.Screen name="Photo" component={Photo} />
          <Stack.Screen name="Tables" component={AllTables} />
          <Stack.Screen name="Exercises" component={Exercises} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
