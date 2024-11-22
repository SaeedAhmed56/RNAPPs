import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios'; // Import axios

const StudentInsert = () => {
  // State hooks for storing input values
  const [RollNo, setRollNo] = useState('');
  const [StudentName, setStudentName] = useState('');
  const [Course, setCourse] = useState('');

  const insertRecord = () => {
    if (!RollNo || !StudentName || !Course) {
      Alert.alert("Validation Error", "Required Field Is Missing");
      return;
    } else {
      const InsertUrl = "http://192.168.1.9/myapis/insert.php"; // Ensure the URL is correct
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      const Data = {
        RollNo,
        StudentName,
        Course,
      };

      // Axios POST request
      axios
        .post(InsertUrl, Data, { headers })
        .then((response) => {
          Alert.alert("Success", response.data[0].message); // Adjust according to your API response structure
        })
        .catch((error) => {
          console.error("Error:", error);
          Alert.alert("Error", "Error: " + error.message);
        });
    }
  };

  return (
    <View style={styles.viewStyle}>
      {/* Input for Roll Number */}
      <TextInput
        placeholder={"RollNo"}
        placeholderTextColor={"#FF0000"}
        keyboardType={"numeric"}
        style={styles.txtStyle}
        value={RollNo}
        onChangeText={setRollNo} // Using setter function directly
      />

      {/* Input for Student Name */}
      <TextInput
        placeholder={"StudentName"}
        placeholderTextColor={"#FF0000"}
        style={styles.txtStyle}
        value={StudentName}
        onChangeText={setStudentName} // Using setter function directly
      />

      {/* Input for Course */}
      <TextInput
        placeholder={'Course'}
        placeholderTextColor={"#FF0000"}
        style={styles.txtStyle}
        value={Course}
        onChangeText={setCourse} // Using setter function directly
      />

      {/* Save Button */}
      <Button title={"Save Record"} onPress={insertRecord} />
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  txtStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    marginBottom: 20,
    fontSize: 16,
  },
});

export default StudentInsert;
