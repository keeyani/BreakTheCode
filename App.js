import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NumberPad from './NumberPad';
import AlphabetPair from './AlphabetPair';
import { getSymbolByName } from './Utility/MathOperation';
import InfoPanel from './InfoPanel';


const CodeBreaker = ({ alphabet1, alphabet2, operation, onNextLevel, disabled }) => {
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');

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
        if (operation == '-') {
            result = parseInt(alphabet1.numberValue) - parseInt(alphabet2.numberValue);
        } else {
            result = parseInt(alphabet1.numberValue) + parseInt(alphabet2.numberValue);
        }

        if (answer === result.toString()) {
            setAnswer('');
            onNextLevel(); // Move to the next level
        } else {
            setMessage('Try again!');
        }
    };

    return (
        <View style={styles.breakTheCode}>
            <View style={[styles.inputContainer, styles.row]}>
                <Text style={styles.input}>{answer}</Text>
            </View>
            <NumberPad onPressNumber={onPressNumber} onClear={onClear} onConfirm={checkAnswer} disabled={disabled} />
        </View>
    );
};

const LevelButton = ({ level, displayValue, handleLevelSelect, active }) => {
    return (
        <TouchableOpacity
            onPress={() => handleLevelSelect(level)}
            style={[styles.levelButton, active ? styles.selectedLevelButton : styles.disabledLevelButton]}
            disabled={!active}
        >
            <Text style={styles.buttonText}>{displayValue}</Text>
        </TouchableOpacity>
    );
};

const Header = ({ text }) => {
    return (
        <TouchableOpacity
            style={styles.levelText}
            disabled
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const App = () => {
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(0); // State to track the current level
    const [maxLevel, setMaxLevel] = useState(7)
    const [levelOperation, setLevelOperation] = useState();
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
    ]);
    const [levelCodes, setLevelCodes] = useState([
        codes[level],
        codes[level + 1],
    ]);

    const getLevelOperation = () => {
        if (level < 2)
            return getLevelOperation('Add')

        return getLevelOperation('Minus');
    }

    // Function to handle level selection
    const handleLevelSelect = (selectedLevel) => {
        setLevel(selectedLevel);
        setLevelCodes([
            codes[selectedLevel],
            codes[selectedLevel + 1]
        ]);
    };

    // Function to handle moving to the next level
    const onNextLevel = () => {
        if (level < maxLevel) {
            handleLevelSelect(level + 1);
            setScore(score + 5);
        }
    };

    return (
        <View style={styles.container}>
            <InfoPanel box1Title={'Level'} box1Heading={level} box2Title={'Score'} box2Heading={score} />
            <InfoPanel box1Title={'Break The Code'} box1Heading={`${levelCodes[0].text} + ${levelCodes[1].text}`}/>

            <View style={styles.row}>
                <Header text="Letters" />
                {codes.map((c, index) => (
                    <AlphabetPair key={index} text={c.text} numberValue={c.numberValue} />
                ))}
            </View>
            <CodeBreaker alphabet1={levelCodes[0]} alphabet2={levelCodes[1]} operation={() => getLevelOperation()} onNextLevel={onNextLevel} disabled={level === maxLevel} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10, // Adjust as per your requirement
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
    breakTheCode: {
        alignItems: 'center',
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
