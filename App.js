import React, { useEffect, useState } from 'react';
//import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import NumberPad from './NumberPad';
import { getSymbolByName } from './Utility/MathOperation';
import InfoPanel, { CodesPanel, QPanel } from './InfoPanel';

const App = () => {
    const [answer, setAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(); // State to track the current level
    const [maxLevel, setMaxLevel] = useState(8)
    const [levelOperation, setLevelOperation] = useState();
    const [puzzle, setPuzzle] = useState();
    const [opA, setOpA] = useState();
    const [opB, setOpB] = useState();
    const [codes, setCodes] = useState([
        { text: 'A', numberValue: '1' },
        { text: 'B', numberValue: '2' },
        { text: 'C', numberValue: '3' },
        { text: 'D', numberValue: '4' },
        { text: 'E', numberValue: '5' },
        { text: 'F', numberValue: '6' },
        { text: 'G', numberValue: '7' },
        { text: 'H', numberValue: '8' },
        { text: 'I', numberValue: '9' },
        { text: 'J', numberValue: '10' },
    ]);

    const [levelCodes, setLevelCodes] = useState([]);

    // Function to handle pressing a number
    const onPressNumber = (number) => {
        setAnswer(answer + number);
    };

    // Function to handle clearing the answer
    const onClear = () => {
        setAnswer('');
    };

    // Function to handle checking the answer
    const checkAnswer = () => {
        let result = 0;
        if (levelOperation == '-') {
            result = parseInt(opA) - parseInt(opB);
        } else {
            result = parseInt(opA) + parseInt(opB);
        }

        if (answer === result.toString()) {
            onCorrectAnswer(); // Move to the next level
        } else {
            onWrongAnswer();
        }
    };

    const configurePuzzle = (code1, code2, operation) => {
        let ops = [code1, code2];
        const max = ops.reduce(function (prev, current) {
            return (prev && prev.numberValue > current.numberValue) ? prev : current
        }); //returns the object with max value

        ops.sort((a, b) => (a.numberValue > b.numberValue) ? -1 : ((b.numberValue > a.numberValue) ? 1 : 0)); // sort desc

        setOpA(ops[0].numberValue);
        setOpB(ops[1].numberValue);
        if (operation === '-') {
            setPuzzle(`${ops[0].text} ${operation} ${ops[1].text}`);    // first code is bigger
        } else {
            setPuzzle(`${ops[1].text} ${operation} ${ops[0].text}`);
        }
        
    }

    const getLevelOperation = (value) => {
        if (value <= 2)
            return getSymbolByName('Add')

        return getSymbolByName('Minus');
    }

    function getRandomLevel(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    // Function to handle level selection
    const handleLevelSelect = (selectedLevel) => {
        setLevel(selectedLevel);
        let operation = getLevelOperation(selectedLevel);
        let randLevel = getRandomLevel(selectedLevel + 1, maxLevel);
        let operandA = codes[selectedLevel];
        let operandB = codes[randLevel];
        //setLevelCodes([operandA, operandB]); // future use for dynamic
        setLevelOperation(operation);
        configurePuzzle(operandA, operandB, operation);
    };

    // Function to handle moving to the next level
    const onCorrectAnswer = () => {
        if (level < maxLevel) {
            handleLevelSelect(level + 1);
            setScore(score + 5);
            setAnswer('');
        }
    };

    const onWrongAnswer = () => {
        onClear();
    }

    const reset = () => {
        handleLevelSelect(0);
        setScore(0);
        setAnswer();
    }

    useEffect(() => {
        handleLevelSelect(0);
    }, [])

    return (
        <View style={styles.container}>
            <InfoPanel box1Title={'Level'} box1Heading={level} box2Title={'Score'} box2Heading={score} />
            <CodesPanel codes={codes} />
            <QPanel
                qTitle={'Break The Code'}
                qPuzzle={puzzle}
                answer={answer} />

            <NumberPad
                onPressNumber={onPressNumber}
                onClear={onClear}
                onConfirm={() => checkAnswer()}
                onReset={reset}
                disabled={level === maxLevel}
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
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#4ABEFF', // bright blue
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    levelButton: {
        flex: 1,
        height: 50, // Adjust height as per your requirement
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    levelText: {
        flex: 1,
        height: 50, // Adjust height as per your requirement
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30
    },
    levelContainer: {
        alignItems: 'center',
    },

    levelButtons: {
        //flexDirection: 'row',
        //justifyContent: 'space-between',
        //marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center', // Center align the buttons
    },

    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    selectedLevelButton: {
        backgroundColor: 'lightgreen',
    },
    disabledLevelButton: {
        backgroundColor: 'lightgrey',
    },
    alphabets: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    alphabet: {
        alignItems: 'center',
    },
    alphabetText: {
        backgroundColor: 'lightgreen',
        padding: 10,
        borderRadius: 50,
        marginBottom: 5,
        textAlign: 'center',
    },
    alphabetNumber: {
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    breakTheCodeLabel: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    message: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    breakTheCodeHeading: {
        fontSize: 20,
        //fontWeight: 'bold',
        margin: 10,
    },
    inputContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        minWidth: 200,
        alignItems: 'center',
        minHeight: 28, // Adjust according to your design
    },
    input: {
        fontSize: 18,
    },
    numberPad: {
        flexDirection: 'column',
        alignItems: 'center',
    }
});

export default App;
