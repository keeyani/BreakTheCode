import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NumberButton = ({ displayText, value, disabled, onPress }) => {
    return (
        <TouchableOpacity style={[styles.numberButton, disabled ? styles.buttonDisabled : styles.buttonEnabled]} onPress={() => onPress(value)} disabled={disabled}>
            <Text style={styles.buttonText}>{displayText}</Text>
        </TouchableOpacity>
    );
};

const NumberPad = ({ onPressNumber, onClear, onConfirm, disabled }) => {
    return (
        <View style={styles.numberPad}>
            <View style={styles.row}>
                <NumberButton displayText="1" value="1" onPress={onPressNumber} disabled={disabled}/>
                <NumberButton displayText="2" value="2" onPress={onPressNumber} disabled={disabled} />
                <NumberButton displayText="3" value="3" onPress={onPressNumber} disabled={disabled} />
            </View>
            <View style={styles.row}>
                <NumberButton displayText="4" value="4" onPress={onPressNumber} disabled={disabled} />
                <NumberButton displayText="5" value="5" onPress={onPressNumber} disabled={disabled} />
                <NumberButton displayText="6" value="6" onPress={onPressNumber} disabled={disabled} />
            </View>
            <View style={styles.row}>
                <NumberButton displayText="7" value="7" onPress={onPressNumber} disabled={disabled} />
                <NumberButton displayText="8" value="8" onPress={onPressNumber} disabled={disabled} />
                <NumberButton displayText="9" value="9" onPress={onPressNumber} disabled={disabled} />
            </View>
            <View style={styles.row}>
                <NumberButton displayText="Clear" onPress={onClear} disabled={disabled} />
                <NumberButton displayText="0" value="0" onPress={onPressNumber} disabled={disabled} />
                <NumberButton displayText="Confirm" onPress={onConfirm} disabled={disabled} />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    numberPad: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    numberButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        borderRadius: 10,
        width: 80, // Set a fixed width for all buttons
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
    },
    buttonEnabled: {
        backgroundColor: 'lightblue',
    },
    buttonDisabled: {
        backgroundColor: 'lightgrey',
    }
});

export default NumberPad;
