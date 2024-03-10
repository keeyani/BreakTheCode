import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import DisplayBox from "./DisplayBox";
//import { DeviceInfo } from 'react-native-device-info';

const HeaderBlock = ({ box1Title, box1Heading, box2Title, box2Heading }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.row}>
          <DisplayBox title={box1Title} heading={box1Heading} />
        </View>
      </View>
      {box2Title && (
        <View style={styles.box}>
          <View style={styles.row}>
            <DisplayBox title={box2Title} heading={box2Heading} />
          </View>
        </View>
      )}
    </View>
  );
};

function isTabletBasedOnRatio(ratio) {
  if (ratio > 1.6) {
    return false;
  } else {
    return true;
  }
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: '#8BF89E', // variant of green
    justifyContent: "space-between",
    padding: 5,
  },
  box: {
    flex: 1,
  },
  boxPuzzle: {
    //flex: 2,
    flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HeaderBlock;
