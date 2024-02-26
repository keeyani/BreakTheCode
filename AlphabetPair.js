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
       // alignItems: 'center',
       // backgroundColor: 'lightgreen',
       // borderRadius: 10,

        flex: 1,
       // height: 50, // Adjust height as per your requirement
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
        //marginHorizontal: 5,
        borderRadius: 5,
    },
    alphabetText: {
        padding: 10,
        textAlign: 'center',
    },
    alphabetNumber: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default AlphabetPair;
