import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

var SUITS = {
    diamonds: {color: 'red', icon: '♦'},
    hearts: {color: 'red', icon: '♥'},
    clubs: {color:'black', icon: '♣'},
    spades: {color:'black', icon: '♠'}
};

const Card = ({ suit, value, posID, activeCard, placeCard, cribPlayer, activePlayer }) => {
    if (suit === null)
    {
        if(cribPlayer && activePlayer != cribPlayer) {
            return <View style={styles.empty} />;
        }

        if(activeCard && activeCard.suit) {
            return (
                <TouchableOpacity onPress={() => {
                    placeCard(posID);
                }}>
                    <View style={styles.empty} />
                </TouchableOpacity>
            );
        }

        return <View style={styles.empty} />;
    }

    if(cribPlayer) {
        return <View style={styles.full} />;
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
    },
    full: {
        width: 50,
        height: 75,
        backgroundColor: 'blue',
        borderRadius: 5,
        margin: 3,
    }
});

export default Card;