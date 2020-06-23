import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';

var SUITS = {
    diamonds: {color: 'red', icon: '♦'},
    hearts: {color: 'red', icon: '♥'},
    clubs: {color:'black', icon: '♣'},
    spades: {color:'black', icon: '♠'}
};

var HEIGHT = Dimensions.get('window').height/10.3;

const Card = ({ suit, value, posID, activeCard, placeCard, cribPlayer, activePlayer, gameOver }) => {
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

    if(cribPlayer && !gameOver) {
        return <View style={styles.full} />;
    }

    return <View style={styles.card}>
        <Text style={{ fontSize: 24, color: SUITS[suit].color}}>
            {value}
        </Text>
        <Text style={{ fontSize: 20, color: SUITS[suit].color}}>
            {SUITS[suit].icon}
        </Text>
    </View>;
};

const styles = StyleSheet.create({
    card: {
        height: HEIGHT,
        aspectRatio:0.68,
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 3,
        padding: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty: {
        height: HEIGHT,
        aspectRatio:0.68,
        backgroundColor: '#389203',
        borderRadius: 5,
        margin: 3,
        fontSize: 10,
    },
    full: {
        height: HEIGHT,
        aspectRatio:0.68,
        backgroundColor: 'blue',
        borderRadius: 5,
        margin: 3,
    }
});

export default Card;