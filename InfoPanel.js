import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const InfoBox = ({ title, heading }) => {
    return (<View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
        <Text style={[styles.text, styles.largerText]}>{heading}</Text>
    </View>);
}

const InfoPanel = ({ box1Title, box1Heading, box2Title, box2Heading }) => {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.row}>
                    <InfoBox title={box1Title} heading={box1Heading} />
                </View>
            </View>
            {box2Title && (<View style={styles.box}>
                <View style={styles.row}>
                    <InfoBox title={box2Title} heading={box2Heading} />
                </View>
            </View>)}

        </View>
    );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        //backgroundColor: '#8BF89E', // variant of green
        backgroundColor: 'orange', // variant of green
        justifyContent: 'space-between',
        padding: 5,
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4ABEFF', // bright blue
        borderRadius: 10,
        marginHorizontal: 5,
    },
    row: {
        flex: 1,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // backgroundColor: 'orange'
    },
    bottomAlign: {
        justifyContent: 'flex-end',
    },
    text: {
        fontSize: 20, // adjusted font size
        color: 'white',
        textAlign: 'center'
    },
    textContainer: {
        width: '90%', // Set width to 80%
        borderRadius: 5,
        backgroundColor: 'orange', // slightly darker blue color
    },
    largerText: {
        fontSize: 46, // slightly larger font size
        padding: 20,
    },
});

export default InfoPanel;
