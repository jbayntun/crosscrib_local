import React, { useEffect, useReducer } from 'react';
import { Text, StyleSheet, View, Button, FlatList } from 'react-native';

import Card from '../components/Card'
import CardRow from '../components/CardRow'
const CardDeck = require('../utils/CardDeck.js');

const GRID_SIZE = 5;
const deck = new CardDeck();
var R = 0;
var C = 0;

// payload format: {id: 'rX_cX', value: 'K', suit: 'spades' }
const updateDisplayCards = (cards, payload) => {
    if(C == 5){
        R++;
        C=0;
    }

    payload.id = 'r' + R + '_c' + C;
    let c = cards.find(card => card.id === payload.id);
    console.log(c);
    c.value = payload.value;
    c.suit = payload.suit;
    C++;

    return cards;
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'change_displayCards':
            return { ...state, displayCards: updateDisplayCards(state.displayCards, action.payload) };
        case 'change_crib':
            return state;
        case 'change_scores':
            return state;
        default:
            return state;
    }
};

const initializeState = () => {
    const displayCards = []
    for(let r = 0; r < GRID_SIZE; r++) {
        for(let c = 0; c < GRID_SIZE; c++) {
            let id = 'r' + r + '_c' + c;
            displayCards.push({id: id, suit:'empty', value: id});
        }
    }

    // TODO associate players with subtotal scores
    const players = [{player1: 0}, {player2: 0}];

    return {displayCards: displayCards, players: players};
};

const LocalScreen = () => {
    const [state, dispatch] = useReducer(reducer, initializeState());

    return (
        <View style={styles.container}>
            <Button
                title="Draw a card"
                onPress={() => {
                    dispatch({ type: 'change_displayCards', payload: deck.draw()})
                }}
            />
            <CardRow spots={state.displayCards.slice(0,5)}/>
            <CardRow spots={state.displayCards.slice(5,10)}/>
            <CardRow spots={state.displayCards.slice(10,15)}/>
            <CardRow spots={state.displayCards.slice(15,20)}/>
            <CardRow spots={state.displayCards.slice(20,25)}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default LocalScreen;
