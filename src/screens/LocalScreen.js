import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Button, FlatList, TouchableOpacity } from 'react-native';

import Card from '../components/Card'
import CardRow from '../components/CardRow'
const Crib = require('../utils/Crib.js');

const GRID_SIZE = 5;
const cribGame = new Crib();
var nextCard = null;
var R = 0;
var C = 0;


const updateDisplayCards = (cards, position, newCard) => {
    var newCards = [...cards];

    let c = newCards.find(card => card.id === position);
    c.value = newCard.value;
    c.suit = newCard.suit;
    c.count = newCard.count;

    return cards;
};

const getCribDisplay = (position, action, crib, activeCard, setActiveCard, setCrib, navigation) => {
    if(position[0] === 'r') {
        if(action === 'columns') {
            return (crib[position].suit) ? <View style={styles.cribRFull}/> : <View style={styles.cribR}/> ;
        } else {
            if(crib[position].suit) {
                return <View style={styles.cribRFull}/> ;
            }
            return (!activeCard.suit) ? <View style={styles.cribR}/> : <TouchableOpacity style={styles.cribR} onPress={() => {
                updateCrib(crib, position, activeCard, setCrib);
                setActiveCard({suit:null, value:null});
                finishPlay(navigation);
            }}/>
        }
    } else {
        if(action === 'rows') {
            return (crib[position].suit) ? <View style={styles.cribCFull}/> : <View style={styles.cribC}/> ;
        } else {
            if(crib[position].suit) {
                return <View style={styles.cribCFull}/> ;
            }
            return (!activeCard.suit) ? <View style={styles.cribC}/> : <TouchableOpacity style={styles.cribC} onPress={() => {
                updateCrib(crib, position, activeCard, setCrib);
                setActiveCard({suit:null, value:null});
                finishPlay(navigation);
            }}/>
        }
    }
};

const updateCrib = (crib, position, card, setCrib) => {
    var newCrib = {r1: {}, r2: {}, c1:{}, c2:{}};

    Object.assign(newCrib.r1, crib.r1);
    Object.assign(newCrib.r2, crib.r2);
    Object.assign(newCrib.c1, crib.c1);
    Object.assign(newCrib.c2, crib.c2);

    newCrib[position] = card;
    setCrib(newCrib);
};

// should be an updated layout of the cards with the position that has changed.
const updateScores = (scores, cards, newPosition) => {
    var newscores = {};
    newscores.rows = [...scores.rows];
    newscores.columns = [...scores.columns];

    // calculate score based on new card
    let col = newPosition[4];
    let row = newPosition[1];

    let rhand = cards.filter(card => card.id.includes(newPosition.slice(0,2)));
    let chand = cards.filter(card => card.id.includes(newPosition.slice(3)));

    newscores.rows[row] = Crib.scoreHand(rhand);
    newscores.columns[col] = Crib.scoreHand(chand);

    return newscores;
};

const initializeDisplayCards = () => {
    const displayCards = []
    for(let r = 0; r < GRID_SIZE; r++) {
        for(let c = 0; c < GRID_SIZE; c++) {
            let id = 'r' + r + '_c' + c;
            let card = {suit:null, value:null};
            if(id === 'r2_c2') {
                card = cribGame.play();
                nextCard = cribGame.play();
            }

            card.id = id;
            displayCards.push(card);
        }
    }

    return displayCards;
};

const finishPlay = (navigation) => {
    nextCard = cribGame.play();
    if(!nextCard) {
        console.log('end round');
        navigation.navigate('EndRound');
    }

};

const LocalScreen = ({ navigation }) => {
    const players = {};
    players.rows = navigation.getParam('player1');
    players.columns = navigation.getParam('player2');

    const [scores, setScores] = useState({rows: [0,0,0,0,0], columns: [0,0,0,0,0]});
    const [activeCard, setActiveCard] = useState({suit: null, value: null});
    const [crib, setCrib] = useState({
        r1: {suit: null, value: null},
        r2: {suit: null, value: null},
        c1: {suit: null, value: null},
        c2: {suit: null, value: null}
    });
    const [displayCards, setDisplayCards] = useState(initializeDisplayCards);
    const [activePlayer, setActivePlayer] = useState('columns');
    const [names, setNames] = useState({rows: 'ROWS', columns: 'COLUMNS'});

    return (
        <View style={styles.container}>
            <View style={styles.playArea}>

                <View style={styles.row}>
                    <CardRow
                        spots={displayCards.slice(0,5)}
                        activeCard={activeCard}
                        placeCard={(newPos) => {
                            setDisplayCards(updateDisplayCards(displayCards, newPos, activeCard));
                            setScores(updateScores(scores, displayCards, newPos));
                            setActiveCard({suit: null, value: null});
                            setActivePlayer((activePlayer === 'columns') ? 'rows': 'columns');
                            finishPlay(navigation);
                        }}
                    />
                    <Text style={styles.score}>{scores.rows[0]}</Text>
                </View>

                <View style={styles.row}>
                    <CardRow
                        spots={displayCards.slice(5,10)}
                        activeCard={activeCard}
                        placeCard={(newPos) => {
                            setDisplayCards(updateDisplayCards(displayCards, newPos, activeCard));
                            setScores(updateScores(scores, displayCards, newPos));
                            setActiveCard({suit: null, value: null});
                            setActivePlayer((activePlayer === 'columns') ? 'rows': 'columns');
                            finishPlay(navigation);
                        }}
                    />
                    <Text style={styles.score}>{scores.rows[1]}</Text>
                </View>

                <View style={styles.row}>
                    <CardRow
                        spots={displayCards.slice(10,15)}
                        activeCard={activeCard}
                        placeCard={(newPos) => {
                            setDisplayCards(updateDisplayCards(displayCards, newPos, activeCard));
                            setScores(updateScores(scores, displayCards, newPos));
                            setActiveCard({suit: null, value: null});
                            setActivePlayer((activePlayer === 'columns') ? 'rows': 'columns');
                            finishPlay(navigation);
                        }}
                    />
                    <Text style={styles.score}>{scores.rows[2]}</Text>
                </View>

                <View style={styles.row}>
                    <CardRow
                        spots={displayCards.slice(15,20)}
                        activeCard={activeCard}
                        placeCard={(newPos) => {
                            setDisplayCards(updateDisplayCards(displayCards, newPos, activeCard));
                            setScores(updateScores(scores, displayCards, newPos));
                            setActiveCard({suit: null, value: null});
                            setActivePlayer((activePlayer === 'columns') ? 'rows': 'columns');
                            finishPlay(navigation);
                        }}
                    />
                    <Text style={styles.score}>{scores.rows[3]}</Text>
                </View>

                <View style={styles.row}>
                    <CardRow
                        spots={displayCards.slice(20,25)}
                        activeCard={activeCard}
                        placeCard={(newPos) => {
                            setDisplayCards(updateDisplayCards(displayCards, newPos, activeCard));
                            setScores(updateScores(scores, displayCards, newPos));
                            setActiveCard({suit: null, value: null});
                            setActivePlayer((activePlayer === 'columns') ? 'rows': 'columns');
                            finishPlay(navigation);
                        }}
                    />
                    <Text style={styles.score}>{scores.rows[4]}</Text>
                </View>

                <FlatList
                    data={scores.columns}
                    horizontal={true}
                    keyExtractor={(item, index) => '' + index}
                    renderItem={({ item }) => {
                        return <Text style={styles.scoreRows}>{item}</Text>
                    }}
                    style={{marginLeft: 15}}
                />
            </View>

            <Text style={styles.totals}>Total {players.columns}: {scores.columns.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue;})}
            </Text>
            <Text style={styles.totals}>Total {players.rows}: {scores.rows.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;})}
            </Text>

            <View style={styles.active}>
                <Text style={styles.activeText}>{players[activePlayer]}'s turn, {(activeCard.suit) ? 'place your card.' :'pick a card:'}</Text>
                <View style={styles.deckContainer}>
                    <Card suit={activeCard.suit} value={activeCard.value} />
                    <TouchableOpacity onPress={() => {
                                if(!activeCard.suit){
                                    setActiveCard(nextCard);
                                }
                            }}>
                        <View style={styles.deck} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.cribRContainer}>
                { getCribDisplay('r1', activePlayer, crib, activeCard, setActiveCard, setCrib, navigation) }
                { getCribDisplay('r2', activePlayer, crib, activeCard, setActiveCard, setCrib, navigation) }
            </View>

            <View style={styles.cribCContainer}>
                { getCribDisplay('c1', activePlayer, crib, activeCard, setActiveCard, setCrib, navigation) }
                { getCribDisplay('c2', activePlayer, crib, activeCard, setActiveCard, setCrib, navigation) }
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d2d2d2',
    },
    row: {
        flexDirection: 'row',
    },
    score: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffea00',
        marginHorizontal: 10,
        marginTop: 20,
    },
    scoreRows: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffea00',
        marginRight: 45,
        marginTop: 10,
    },
    totals: {
        fontSize: 22,
    },
    deckContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    deck: {
        height: 75,
        width: 50,
        backgroundColor: 'blue',
        borderRadius: 5,
        marginVertical: 3,
        padding: 1,
        alignSelf: 'flex-end'
    },
    cribR: {
        width: 75,
        height: 50,
        backgroundColor: '#389203',
        borderRadius: 5,
        margin: 3,
    },
    cribRFull: {
        width: 75,
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 5,
        margin: 3,
    },
    cribRContainer: {
        position: 'absolute',
        right: 5,
        top: 100,
    },
    cribC: {
        width: 50,
        height: 75,
        backgroundColor: '#389203',
        borderRadius: 5,
        margin: 3,
    },
    cribCFull: {
        width: 50,
        height: 75,
        backgroundColor: 'blue',
        borderRadius: 5,
        margin: 3,
    },
    cribCContainer: {
        position: 'absolute',
        right: 10,
        bottom: 140,
        flexDirection: 'row',
    },
    active: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        left: 10,
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 10,
        width: 390,
        justifyContent: 'space-between',
    },
    activeText: {
        fontSize: 20,
        marginRight: 15,
    }

});

export default LocalScreen;
