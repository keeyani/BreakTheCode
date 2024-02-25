import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AlphabetPair = ({ text, numberValue }) => {
    return (
        <View style={styles.alphabet}>
            <Text style={styles.alphabetText}>{text}</Text>
            <Text style={styles.alphabetNumber}>{numberValue}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    alphabet: {
        alignItems: 'center',
        backgroundColor: 'lightgreen',
        borderRadius: 10,
    },
    alphabetText: {
        padding: 10,
        textAlign: 'center',
    },
    alphabetNumber: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AlphabetPair;
