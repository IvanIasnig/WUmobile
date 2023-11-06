import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Component/Navbar";

const chartConfig = {
  backgroundGradientFrom: "#FFF",
  backgroundGradientTo: "#FFF",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const screenWidth = Dimensions.get("window").width;

function AllTables() {
  const [tables, setTables] = useState([]);
  const [tableName, setTableName] = useState("");
  const [entries, setEntries] = useState([{ entryName: "", entryValue: "" }]);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [entryName, setEntryName] = useState("");
  const [entryValue, setEntryValue] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const submitTable = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const decoded = jwtDecode(token);
    const userId = decoded.sub;

    const data = { tableName, entries };

    try {
      await axios.post(
        `http://localhost:3001/user/customtables?userId=${userId}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResponseMessage("Table created successfully");
      setTableName("");
      setEntries([{ entryName: "", entryValue: "" }]);
      await fetchData();
    } catch (error) {
      setResponseMessage("Error creating the table");
    }
  };

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const decoded = jwtDecode(token);
    const userId = decoded.sub;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        `http://localhost:3001/user/${userId}/tables`,
        config
      );
      setTables(response.data);
      setResponseMessage("Data fetched successfully");
      setIsLoading(false);
    } catch (error) {
      setResponseMessage("Error fetching the data");
    }
  };

  const addEntryToTable = async (tableId, entryName, entryValue) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      await axios.post(
        `http://localhost:3001/user/customtables/${tableId}/entries`,
        {
          entryName,
          entryValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchData();
    } catch (error) {
      console.error("Errore nell'aggiungere l'entry:", error);
    }
  };

  const deleteTable = async (tableId) => {
    const token = await AsyncStorage.getItem("authToken");
    try {
      const response = await axios.delete(
        `http://localhost:3001/user/customtables/${tableId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      await fetchData();
    } catch (error) {
      console.error("Errore nell'eliminare la tabella: ", error);
    }
  };

  const handleTableNameChange = (text) => {
    setTableName(text);
  };

  const handleEntryNameChange = (text, index) => {
    const newEntries = [...entries];
    newEntries[index].entryName = text;
    setEntries(newEntries);
  };

  const handleEntryValueChange = (text, index) => {
    const newEntries = [...entries];
    newEntries[index].entryValue = text;
    setEntries(newEntries);
  };

  const addEntryField = () => {
    setEntries([...entries, { entryName: "", entryValue: "" }]);
  };

  const renderCharts = () => {
    return tables.map((table, index) => (
      <View key={index} style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{table.name}</Text>
        <LineChart
          data={{
            labels: table.entries.map((entry) => entry.entryName),
            datasets: [
              {
                data: table.entries.map((entry) =>
                  parseFloat(entry.entryValue)
                ),
              },
            ],
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        />
        <View style={styles.entryFormContainer}>
          <TextInput
            placeholder="Entry Name"
            value={entryName}
            style={styles.input}
            onChangeText={(text) => setEntryName(text)}
          />
          <TextInput
            placeholder="Entry Value"
            keyboardType="numeric"
            value={entryValue}
            style={styles.input}
            onChangeText={(text) => setEntryValue(text)}
          />
          <Button
            title="Add Entry"
            onPress={() => {
              addEntryToTable(table.id, entryName, entryValue);
              setEntryName("");
              setEntryValue("");
            }}
          />
        </View>
        <View>
          <Button
            title="Delete Table"
            onPress={() => {
              deleteTable(table.id);
            }}
          />
        </View>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Navbar />
      <View style={styles.container}>
        <Text>{responseMessage}</Text>
        <TextInput
          value={tableName}
          onChangeText={handleTableNameChange}
          placeholder="Table Name"
          style={styles.input}
        />
        {entries.map((entry, index) => (
          <View key={index} style={styles.entryRow}>
            <TextInput
              value={entry.entryName}
              onChangeText={(text) => handleEntryNameChange(text, index)}
              placeholder="Entry Name"
              style={styles.input}
            />
            <TextInput
              value={entry.entryValue}
              onChangeText={(text) => handleEntryValueChange(text, index)}
              placeholder="Entry Value"
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
        ))}
        <Button title="Add Entry" onPress={addEntryField} />
        <Button title="Submit Table" onPress={submitTable} />
        {isLoading ? <Text>Loading...</Text> : renderCharts()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    margin: 10,
    width: "80%",
  },
  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
  },
});

export default AllTables;
