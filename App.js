import React, { useEffect, useState } from "react";
//import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from "react-native";
import NumberPad from "./NumberPad";
import { getSymbolByName } from "./utilities/MathOperation";
import InfoPanel from "./components/HeaderBlock";
import { getCodes, initializeCodes } from "./utilities/CodeUtility";
import {
  fetchUserInfo,
  getData,
  resetUserInfo,
  storeData,
  storeMultipleData,
} from "./utilities/StorageUtils";
import CodesPanel from "./components/CodeLanguageBlock";
import PuzzleBlock from "./components/PuzzleBlock";
import {
  getLevelOperation,
  getSecondOperandLevel,
} from "./utilities/LevelManager";
import MyComponent from "./components/Puzzle";

const App = () => {
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(); // State to track the current level
  const [maxLevel, setMaxLevel] = useState();
  const [codeIndex, setCodeIndex] = useState();
  const [levelOperation, setLevelOperation] = useState();
  const [puzzle, setPuzzle] = useState();
  const [opA, setOpA] = useState();
  const [opB, setOpB] = useState();
  const [codes, setCodes] = useState([]);

  // Function to handle pressing a number
  const onPressNumber = (number) => {
    setAnswer(answer + number);
  };

  // Function to handle clearing the answer
  const onClear = () => {
    setAnswer("");
  };

  // Function to handle checking the answer
  const checkAnswer = async () => {
    let result = 0;
    if (levelOperation == "-") {
      result = parseInt(opA) - parseInt(opB);
    } else {
      result = parseInt(opA) + parseInt(opB);
    }

    if (answer === result.toString()) {
      await onCorrectAnswer(); // Move to the next level
    } else {
      onWrongAnswer();
    }
  };

  const configurePuzzle = (code1, code2, operation) => {
    let ops = [code1, code2];
    const max = ops.reduce(function (prev, current) {
      return prev && prev.numberValue > current.numberValue ? prev : current;
    }); //returns the object with max value

    ops.sort((a, b) =>
      a.numberValue > b.numberValue ? -1 : b.numberValue > a.numberValue ? 1 : 0
    ); // sort desc
    setOpA(ops[0].numberValue);
    setOpB(ops[1].numberValue);
    if (operation === "-") {
      setPuzzle(`${ops[0].text} ${operation} ${ops[1].text}`); // first code is bigger
    } else {
      setPuzzle(`${ops[1].text} ${operation} ${ops[0].text}`);
    }
  };

  const getLevelInfo = () => {
    getData("BTCUserLevel");
  };

  const storeLevelInfo = async (level, score) => {
    await storeMultipleData({
      BTCUserLevel: level.toString(),
      BTCScore: score.toString(),
    });
  };

  // Function to handle level selection
  const handleLevelSelect = async (selectedLevel, currentIndex) => {
    currentIndex = parseInt(currentIndex) || 0;

    let operation = getLevelOperation(currentIndex);
    let randLevel = getSecondOperandLevel(currentIndex + 1, maxLevel);

    let operandA = codes[currentIndex];
    let operandB = codes[randLevel];

    setLevelOperation(operation);
    configurePuzzle(operandA, operandB, operation);
  };

  // Function to handle moving to the next level
  const onCorrectAnswer = async () => {
    let newCodeIndex = codeIndex + 1;
    let newLevel = level + 1;
    let newScore = score + 5;
    setCodeIndex(newCodeIndex);
    setLevel(newLevel);
    setScore(newScore);
    setAnswer("");

    await storeLevelInfo(newLevel, newScore);
    if (newLevel > maxLevel) {
      await initializeData(newLevel);
    } else {
      setCodeIndex(newCodeIndex);
      await handleLevelSelect(newLevel, newCodeIndex);
    }
  };

  const onWrongAnswer = () => {
    onClear();
  };

  const resetGameData = async () => {
    let success = await resetUserInfo();
    if (success) {
      await initializeData(0);
    }
  };

  const reset = async () => {
    setCodeIndex(0);
    setLevel(userLevel);
    await handleLevelSelect(0, 0);
    //setMaxLevel(0);
    setScore(0);
    setAnswer("");
  };

  const retrieveUserData = async () => {
    return await fetchUserInfo();
  };

  const configStartup = async () => {
    const userInfo = await retrieveUserData();
    let userLevel = 0;
    let userScore = 0;
    if (Object.keys(userInfo).length > 0 && userInfo.BTCUserLevel) {
      userLevel = parseInt(userInfo.BTCUserLevel) || 0;
      userScore = parseInt(userInfo.BTCScore) || 0;
    }

    setLevel(userLevel);
    setScore(userScore);
    await handleLevelSelect(userLevel, 0);
    setAnswer("");
  };

  useEffect(() => {
    if (codes.length === 0) return;

    configStartup();
  }, [codes]);

  const initializeData = async (level) => {
    let userLevel = parseInt(level) || 0;
    let userInfo = await retrieveUserData();
    if (
      level < 0 &&
      Object.keys(userInfo).length > 0 &&
      userInfo.BTCUserLevel
    ) {
      userLevel = parseInt(userInfo.BTCUserLevel) || 0;
    }

    await initializeCodes(userLevel);

    let c = getCodes();
    setCodeIndex(0);
    setMaxLevel(userLevel + c.length - 1);
    setCodes(c);
  };

  useEffect(() => {
    initializeData(-1);
  }, []);

  return (
    <View style={styles.container}>
      <InfoPanel
        box1Title={"Level"}
        box1Heading={level}
        box2Title={"Score"}
        box2Heading={score}
      />
      <CodesPanel codes={codes} />
      <PuzzleBlock
        qTitle={"Break The Code"}
        qPuzzle={puzzle}
        answer={answer}
        onLongPress={() => resetGameData()}
      />
      {/* <MyComponent /> testing here for moving all the puzzle logic out*/}
      <NumberPad
        onPressNumber={onPressNumber}
        onClear={onClear}
        onConfirm={() => checkAnswer()}
        onReset={reset}
        disabled={level > maxLevel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Adjust as per your requirement
    paddingBottom: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#4ABEFF", // bright blue
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  levelButton: {
    flex: 1,
    height: 50, // Adjust height as per your requirement
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  levelText: {
    flex: 1,
    height: 50, // Adjust height as per your requirement
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  levelContainer: {
    alignItems: "center",
  },

  levelButtons: {
    //flexDirection: 'row',
    //justifyContent: 'space-between',
    //marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center", // Center align the buttons
  },

  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  selectedLevelButton: {
    backgroundColor: "lightgreen",
  },
  disabledLevelButton: {
    backgroundColor: "lightgrey",
  },
  alphabets: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  alphabet: {
    alignItems: "center",
  },
  alphabetText: {
    backgroundColor: "lightgreen",
    padding: 10,
    borderRadius: 50,
    marginBottom: 5,
    textAlign: "center",
  },
  alphabetNumber: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  breakTheCodeLabel: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  message: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  breakTheCodeHeading: {
    fontSize: 20,
    //fontWeight: 'bold',
    margin: 10,
  },
  inputContainer: {
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    minWidth: 200,
    alignItems: "center",
    minHeight: 28, // Adjust according to your design
  },
  input: {
    fontSize: 18,
  },
  numberPad: {
    flexDirection: "column",
    alignItems: "center",
  },
});

export default App;
