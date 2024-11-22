import React, { useState } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";

export default function App() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Unable to fetch data");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Fetch Data" onPress={fetchData} />
      {data && (
        <View style={styles.dataContainer}>
          <Text>Title: {data.title}</Text>
          <Text>Body: {data.body}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dataContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
});
