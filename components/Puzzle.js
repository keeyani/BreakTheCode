import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

class Puzzle {
  constructor(puzzleText, operands, operation) {
    this.puzzleText = puzzleText;
    this.operands = operands;
    this.operation = operation;
  }

  sortOperands(assign) {
    // Sorting the operands in descending order by NumberValue
    this.operands.sort((a, b) => b.NumberValue - a.NumberValue);

    if (assign) {
      this.assignOperands();
    }
  }

  assignOperands() {
    // Assigning the sorted operands to operand1, operand2, operand3, ...
    for (let i = 0; i < this.operands.length; i++) {
      this["operand" + (i + 1)] = this.operands[i].NumberValue;
    }
  }

  printOperands() {
    for (let i = 0; i < this.operands.length; i++) {
      console.log("ops: ", this.operands[i]);
    }
  }
}

//export default Puzzle;

const MyComponent = () => {
  const [puzzle, setPuzzle] = useState(null);

  useEffect(() => {
    // Create a Puzzle object with 3 operands
    const operands = [
      { Text: "Operand 1", NumberValue: 5 },
      { Text: "Operand 2", NumberValue: 3 },
      { Text: "Operand 3", NumberValue: 7 },
    ];

    const newPuzzle = new Puzzle("Solve the puzzle:", operands, "+");

    // Sort and assign operands
    newPuzzle.sortOperands();
    console.log("Before: ");
    newPuzzle.printOperands();
    newPuzzle.assignOperands();
    console.log("Afert: ");
    newPuzzle.printOperands();

    // Set the puzzle state
    setPuzzle(newPuzzle);
  }, []);

  if (!puzzle) {
    return null; // Or you can return a loading indicator
  }

  return (
    <View>
      <Text>{puzzle.puzzleText}</Text>
      <Text>Operation: {puzzle.operation}</Text>
      <Text>Sorted Operands:</Text>
      {puzzle.operands.map((operand, index) => (
        <Text key={index}>
          {operand.Text}: {operand.NumberValue}
        </Text>
      ))}
      {/* Accessing dynamically assigned operands */}
      {puzzle.operands.map((operand, index) => (
        <Text key={index}>
          Operand {index + 1}: {puzzle["operand" + (index + 1)]}
        </Text>
      ))}
    </View>
  );
};

export default MyComponent;
