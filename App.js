import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import NumberPad from './NumberPad';
import AlphabetPair from './AlphabetPair';

const CodeBreaker = ({ alphabet1, alphabet2, onNextLevel, disabled }) => {
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
        const sum = parseInt(alphabet1.numberValue) + parseInt(alphabet2.numberValue);
        if (answer === sum.toString()) {
            setMessage('Well done!');
            setAnswer('');
            onNextLevel(); // Move to the next level
        } else {
            setMessage('Try again!');
        }
    };

    return (
        <View style={styles.breakTheCode}>
            <Text style={styles.breakTheCodeHeading}>Break the code</Text>
            <Text style={styles.breakTheCodeLabel}>{alphabet1.text} + {alphabet2.text}</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.input}>{answer}</Text>
            </View>
            <NumberPad onPressNumber={onPressNumber} onClear={onClear} onConfirm={checkAnswer} disabled={disabled } />
            <Text style={styles.message}>{message}</Text>
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

const App = () => {
    const [level, setLevel] = useState(0); // State to track the current level
    const [maxLevel, setMaxLevel] = useState(5)
    const [codes, setCodes] = useState([
        { text: 'A', numberValue: '1' },
        { text: 'B', numberValue: '2' },
        { text: 'C', numberValue: '3' },
        { text: 'D', numberValue: '4' },
        { text: 'E', numberValue: '5' },
        { text: 'F', numberValue: '6' },
    ]);
    const [levelCodes, setLevelCodes] = useState([
        codes[level],
        codes[level + 1],
    ]);

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
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.levelContainer}>
                <Text style={styles.label}>Level</Text>
                <View style={[styles.levelButtons, styles.numberPad]}>
                    <View style={styles.row}>
                        {[...Array(maxLevel).keys()].map((lvl) => (
                            <LevelButton key={lvl} level={lvl} displayValue={lvl} handleLevelSelect={handleLevelSelect} active={level === lvl} />
                        ))}
                        
                    </View>
                </View>
            </View>
            <View style={styles.alphabets}>
                {codes.map((c, index) => (
                    <AlphabetPair key={index} text={c.text} numberValue={c.numberValue} />
                ))}
            </View>
            <CodeBreaker alphabet1={levelCodes[0]} alphabet2={levelCodes[1]} onNextLevel={onNextLevel} disabled={level === maxLevel} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        paddingHorizontal: 20,
        alignItems: 'center', // Center align the content
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
    levelButton: {
        backgroundColor: 'lightblue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center', // Center align the text inside button
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
        fontWeight: 'bold',
        marginBottom: 10,
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
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10
    },

    buttonText: {
        fontSize: 18,
    },
    levelButton: {
        backgroundColor: 'lightblue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
});

export default App;
