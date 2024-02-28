import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NumberButton = ({ displayText, value, disabled, onPress, onAdminPress }) => {
    return (
        <TouchableOpacity
            style={[styles.numberButton, disabled ? styles.buttonDisabled : styles.buttonEnabled]}
            onPress={() => onPress(value)}
            onLongPress={onAdminPress}
            disabled={disabled}>
            <Text style={styles.buttonText}>{displayText}</Text>
        </TouchableOpacity>
    );
};

const NumberPad = ({ onPressNumber, onClear, onConfirm, onReset, disabled }) => {
    return (
        <View style={ styles.breakTheCode}>
            <View style={styles.row}>
                <NumberButton displayText="1" value="1" onPress={onPressNumber} disabled={disabled} />
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
                <NumberButton displayText="Clear" onPress={onClear} onAdminPress={onReset} />
                <NumberButton displayText="0" value="0" onPress={onPressNumber} disabled={disabled} />
                <NumberButton displayText="Confirm" onPress={onConfirm} disabled={disabled} />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
    },
    numberButton: {
        marginHorizontal: 5,
        borderRadius: 10,
        height: 50,
        minWidth: '30%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonEnabled: {
        backgroundColor: 'lightblue',
    },
    buttonDisabled: {
        backgroundColor: 'lightgrey',
    },
    breakTheCode: {
        alignItems: 'center',
    },
});

export default NumberPad;
