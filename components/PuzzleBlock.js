import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import DisplayBox from "./DisplayBox";

const AnswerBox = ({ value }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>Answer</Text>
      <Text style={[styles.text, styles.largerText]}>
        {!value ? "?" : value}
      </Text>
    </View>
  );
};

const PuzzleBlock = ({ qTitle, qPuzzle, answer, onLongPress }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        style={styles.boxPuzzle}
        onLongPress={onLongPress}
      >
        <View style={styles.row}>
          <DisplayBox title={qTitle} heading={qPuzzle} />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.box}>
        <View style={styles.row}>
          <AnswerBox value={answer} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  box: {
    flex: 1,
  },
  boxPuzzle: {
    flex: 1,
  },
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
  dding: 5,
});

export default PuzzleBlock;
