import React from "react";
import { View, StyleSheet, Text } from "react-native";

const CodeBox = ({ title, heading }) => (
  <View style={styles.smallBox}>
    <Text style={styles.codeText}>{title}</Text>
    <Text style={[styles.codeText, styles.codeNumber]}>{heading}</Text>
  </View>
);

const CodesPanel = ({ codes }) => {
  const numberOfRows = Math.ceil(codes.length / 5);
  //const isTablet = DeviceInfo.isTablet();
  const rows = [];
  for (let i = 0; i < numberOfRows; i++) {
    const row = [];
    for (let j = 0; j < Math.min(5, codes.length - i * 5); j++) {
      row.push(
        <CodeBox
          key={i * 5 + j}
          title={codes[i * 5 + j].text}
          heading={codes[i * 5 + j].numberValue}
        />
      );
    }
    rows.push(
      <View key={i} style={styles.codeBoxRow}>
        {row}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>{rows}</View>
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
  codeText: {
    fontSize: 18, // adjusted font size
    color: "white",
    textAlign: "center",
  },
  codeNumber: {
    fontSize: 26, // slightly larger font size
    padding: 5,
  },
  smallBox: {
    width: 63,
    height: "auto",
    marginHorizontal: 5,
    backgroundColor: "orange",
    borderRadius: 10,
  },
  codeBoxRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default CodesPanel;
