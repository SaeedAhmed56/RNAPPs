import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button, Alert } from "react-native";
import axios from "axios"; // Import Axios

const StudentSearch = () => {
  // State hooks for storing user input and fetched data
  const [FindRollNo, setFindRollNo] = useState(""); // State for input Roll Number
  const [RollNo, setRollNo] = useState(""); // State for displaying Roll No
  const [StudentName, setStudentName] = useState(""); // State for displaying Student Name
  const [Course, setCourse] = useState(""); // State for displaying Course

  // Search Record function that calls the API using axios
  const SearchRecord = async () => {
    if (!FindRollNo.trim()) {
      Alert.alert("Validation Error", "Roll Number is required!");
      return;
    }

    const SearchAPIUrl = "http://192.168.1.14/myapis/search.php"; // Ensure this URL is correct for your server

    const data = { FindRollNo };

    try {
      // Make the POST request using Axios
      const response = await axios.post(SearchAPIUrl, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // Handle the response from the server
      const responseJson = response.data;

      if (responseJson.RollNo) {
        // Update the state with the fetched data
        setRollNo(responseJson.RollNo);
        setStudentName(responseJson.StudentName);
        setCourse(responseJson.Course);
      } else {
        Alert.alert("Not Found", "No record found for the given Roll Number.");
        // Reset state if no record is found
        setRollNo("");
        setStudentName("");
        setCourse("");
      }
    } catch (error) {
      console.error("Axios Error:", error);
      Alert.alert("Network Error", "Unable to fetch data. Check your network connection.");
    }
  };

  return (
    <View style={styles.viewStyle}>
      {/* Input for Roll Number */}
      <TextInput
        placeholder="Enter Roll No"
        placeholderTextColor="#ff0000"
        keyboardType="numeric"
        style={styles.txtStyle}
        onChangeText={setFindRollNo} // Using setState directly with the setter function
        value={FindRollNo} // Bind input value to state
      />

      {/* Search Button */}
      <Button title="Find Record" onPress={SearchRecord} />

      {/* Display Fetched Data */}
      <TextInput
        placeholder="Roll No"
        value={RollNo}
        style={styles.txtStyle}
        editable={false}
      />
      <TextInput
        placeholder="Student Name"
        value={StudentName}
        style={styles.txtStyle}
        editable={false}
      />
      <TextInput
        placeholder="Course"
        value={Course}
        style={styles.txtStyle}
        editable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    padding: 10,
    marginTop: 20,
    backgroundColor: "#f8f9fa",
  },
  txtStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "red",
    marginBottom: 20,
    fontSize: 16,
    paddingHorizontal: 5,
  },
});

export default StudentSearch;
