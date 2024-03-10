import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DisplayBox = ({ title, heading }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{title}</Text>
      <Text style={[styles.text, styles.largerText]}>{heading}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20, // adjusted font size
    color: "white",
    textAlign: "center",
  },
  textContainer: {
    width: "95%", // Set width to 80%
    borderRadius: 5,
    backgroundColor: "orange", // slightly darker blue color
  },
  largerText: {
    fontSize: 46, // slightly larger font size
    padding: 20,
  },
});

export default DisplayBox;
