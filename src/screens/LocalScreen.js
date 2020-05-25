import React, { useEffect, useReducer } from 'react';
import { Text, StyleSheet, View, Button, FlatList } from 'react-native';

import Card from '../components/Card'
import CardRow from '../components/CardRow'
const CardDeck = require('../utils/CardDeck.js');
const Crib = require('../utils/Crib.js');

const GRID_SIZE = 5;
const deck = new CardDeck();
var R = 0;
var C = 0;

// payload format: {id: 'rX_cX', value: 'K', suit: 'spades' }
const updateDisplayCards = (cards, payload) => {
    let c = cards.find(card => card.id === payload.id);
    c.value = payload.card.value;
    c.suit = payload.card.suit;
    c.count = payload.card.count;

    return cards;
};

const updateScores = (state, payload) => {
    let rows = [...state.scores.rows];
    let cols = [...state.scores.columns];

    // calculate score based on new card
    let col = payload.id[4];
    let row = payload.id[1];

    let rhand = state.displayCards.filter(card => card.id.includes(payload.id.slice(0,2)));
    let chand = state.displayCards.filter(card => card.id.includes(payload.id.slice(3)));

    let rscore = Crib.scoreHand(rhand);
    let cscore = Crib.scoreHand(chand);

    console.log('row: ' + rscore);
    console.log('col: ' + cscore)
    // update values for display

    return {rows: rows, columns: cols};
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'change_displayCards':
            return {
                ...state,
                displayCards: updateDisplayCards(state.displayCards, action.payload),
                scores: updateScores(state, action.payload)
            };
        case 'change_crib':
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
            displayCards.push({id: id, suit:null, value: null});
        }
    }

    // TODO associate players with subtotal scores
    const scores = {rows: [0,0,0,0,0], columns: [0,0,0,0,0]};

    return {displayCards: displayCards, scores: scores};
};

const LocalScreen = () => {
    const [state, dispatch] = useReducer(reducer, initializeState());

    return (
        <View style={styles.container}>
            <Button
                title="Draw a card"
                onPress={() => {
                    if(C == 5){
                        R++;
                        C=0;
                    }

                    let id = 'r' + R + '_c' + C;
                    let card = deck.draw();
                    C++;

                    dispatch({ type: 'change_displayCards', payload: {id: id, card: card }});
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
