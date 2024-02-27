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


const CodeBox = ({ title, heading }) => (
    <View style={styles.smallBox}>
        <Text style={styles.codeText}>{title}</Text>
        <Text style={[styles.codeText, styles.codeNumber]}>{heading}</Text>
    </View>
);

export const CodesPanel = ({ codes }) => {
    const numberOfRows = Math.ceil(codes.length / 5);
    
    const rows = [];
    for (let i = 0; i < numberOfRows; i++) {
        const row = [];
        for (let j = 0; j < Math.min(5, codes.length - i * 5); j++) {
            row.push(<CodeBox key={i * 5 + j} title={codes[i * 5 + j].text} heading={codes[i * 5 + j].numberValue} />);
        }
        rows.push(<View key={i} style={styles.codeBoxRow}>{row}</View>);
    }

    return (
        <View style={styles.codesContainer}>
            {rows}
        </View>
    );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        //backgroundColor: '#8BF89E', // variant of green
        //backgroundColor: 'orange', 
        justifyContent: 'space-between',
        padding: 5,
    },
    codesContainer: {
        flex: 1,
        //backgroundColor: '#8BF89E', // variant of green
        justifyContent: 'center'
    },
    box: {
        flex: 1,
    },
    row: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: '95%', // Set width to 80%
        borderRadius: 5,
        backgroundColor: 'orange', // slightly darker blue color
    },
    largerText: {
        fontSize: 46, // slightly larger font size
        padding: 20,
    },
    codeBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow', // bright blue
        borderRadius: 10,
        marginHorizontal: 2,
    },
    codeText: {
        fontSize: 18, // adjusted font size
        color: 'white',
        textAlign: 'center'
    },
    codeNumber: {
        fontSize: 26, // slightly larger font size
        padding: 5,
    },
    smallBox: {
        width: 60,
        height: 60,
        padding: 12,
        marginHorizontal: 5,
        backgroundColor: 'orange',
        // backgroundColor: '#8BF89E', // variant of green (use this for theme)
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    boxText: {
        color: 'white',
        fontSize: 20,
    },
    codeBoxRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});

export default InfoPanel;
