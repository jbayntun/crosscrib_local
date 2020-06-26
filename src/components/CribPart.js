import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import Card from '../components/Card'

const CribPart = ({ name, player, cards, activeCard, activePlayer, gameOver, total, touchCallback }) => {

    return <View style={styles.container}>
        <Text style={{ color: 'white' }}>{name} - {player}</Text>
        <View style={styles.cardContainer}>
            <Card
                suit={cards[0].suit}
                value={cards[0].value}
                posID={player.slice(0,1) + 1}
                activeCard={activeCard}
                placeCard={touchCallback}
                cribPlayer={player}
                activePlayer={activePlayer}
                gameOver={gameOver}
            />
            <Card
                suit={cards[1].suit}
                value={cards[1].value}
                posID={player.slice(0,1) + 2}
                activeCard={activeCard}
                placeCard={touchCallback}
                cribPlayer={player}
                activePlayer={activePlayer}
                gameOver={gameOver}
            />
        </View>
        <Text style={{ color: 'white' }}>Total: {total}</Text>
    </View>;
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
    },
    container: {
        backgroundColor: '#808080',
        paddingHorizontal: 15,
        borderRadius: 5,
        marginVertical: 10,
        alignItems:'center',
    }
});

export default CribPart;