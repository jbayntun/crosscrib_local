import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import Card from '../components/Card'

const CribPart = ({ name, player, cards, activeCard, activePlayer, total, touchCallback }) => {

    return <View style={styles.container}>
        <Text style={{ color: 'white' }}>{name}</Text>
        <View style={styles.cardContainer}>
            <Card
                suit={cards[0].suit}
                value={cards[0].value}
                posID={player.slice(0,1) + 1}
                activeCard={activeCard}
                placeCard={touchCallback}
                cribPlayer={player}
                activePlayer={activePlayer}
            />
            <Card
                suit={cards[1].suit}
                value={cards[1].value}
                posID={player.slice(0,1) + 2}
                activeCard={activeCard}
                placeCard={touchCallback}
                cribPlayer={player}
                activePlayer={activePlayer}
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
    }
});

export default CribPart;