import React from 'react';
import { Text, StyleSheet, View} from 'react-native';

var SUITS = {
    diamonds: {color: 'red', icon: '♦'},
    hearts: {color: 'red', icon: '♥'},
    clubs: {color:'black', icon: '♣'},
    spades: {color:'black', icon: '♠'}
};

const Card = ({suit, value, id}) => {
    if (suit === null)
    {
        return <View style={styles.empty}>
            <Text>{id}</Text>
        </View>
    }

    return <View style={styles.card}>
        <Text style={{ fontSize: 22, color: SUITS[suit].color}}>{value}</Text>
        <Text style={{ fontSize: 18, color: SUITS[suit].color}}>{SUITS[suit].icon}</Text>
    </View>;
};

const styles = StyleSheet.create({
    card: {
        height: 75,
        width: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 3,
        padding: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty: {
        height: 75,
        width: 50,
        backgroundColor: '#389203',
        borderRadius: 5,
        margin: 3,
        fontSize: 10,
    }
});

export default Card;