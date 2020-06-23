import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Card from '../components/Card'
import CardRow from '../components/CardRow'
import CribPart from '../components/CribPart'

const Crib = require('../utils/Crib.js');

const GRID_SIZE = 5;
const cribGame = new Crib();
var nextCard = null;
var boardCount = 0; // track cards placed on board (not in crib)

const updateDisplayCards = (cards, position, newCard) => {
    var newCards = [...cards];

    let c = newCards.find(card => card.id === position);
    c.value = newCard.value;
    c.suit = newCard.suit;
    c.count = newCard.count;

    return newCards;
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
    console.log("/nXXX enter updateScores");
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

    console.log(newscores);
    console.log("YYY end updateScores/n/n");


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
    const cribPlayer = ('rows');
    const [activePlayer, setActivePlayer] = useState((cribPlayer === 'rows') ? 'columns': 'rows'); // first card goes to player who does NOT own crib
    const [gameOver, setGameOver] = useState(false);
    const [totals, setTotals] = useState({rows: 0, columns: 0});

    // state "setX" callback is async, so I use a temporary variable to keep the
    // real current value to update dependent values, otherwise, the state at runtime
    // may not actually have been updated
    const playCardToBoard = (newPos) => {
        let newCards = updateDisplayCards(displayCards, newPos, activeCard);
        setDisplayCards(newCards);

        let newScores = updateScores(scores, newCards, newPos);
        setScores(newScores);

        setTotals({rows:calculateTotal('rows', newScores), columns:calculateTotal('columns', newScores)});

        setActiveCard({suit: null, value: null});
        setActivePlayer((activePlayer === 'columns') ? 'rows': 'columns');
        boardCount++;

        finishPlay(newScores);
    };

    const calculateTotal = (player, newScores, isOver) => {
        let total = newScores[player].reduce((accumulator, currentValue) => {
            return accumulator + currentValue;});

        if(isOver && player === cribPlayer) {
            total += Crib.scoreHand([displayCards[12], crib.r1, crib.r2, crib.c1, crib.c2]);
        }

        return total;
    }

    const finishPlay = (newScores) => {
        nextCard = cribGame.play();

        // if all cards have been played to board, put remaining cards in crib
        // this avoids the game being locked if the non-active player still needs to add to crib
        if(boardCount === 24) {
            if(!crib.r1.suit) {
                crib.r1 = nextCard;
                nextCard = cribGame.play();
            }
            if(!crib.r2.suit) {
                crib.r2 = nextCard;
                nextCard = cribGame.play();
            }
            if(!crib.c1.suit) {
                crib.c1 = nextCard;
                nextCard = cribGame.play();
            }
            if(!crib.c2.suit) {
                crib.c2 = nextCard;
                nextCard = cribGame.play();
            }
        }

        if(!nextCard) {
            setGameOver(true);
            setTotals({rows:calculateTotal('rows', newScores, true),
                columns:calculateTotal('columns', newScores, true)});
        }

    };

    // Slight possibility there could be an async issue here.  If setTotals (which is async)
    // hasn't completed when this is called, the resulting message could be incorrect.
    const getWinMessage = () => {
        if(totals.rows == totals.columns) {
            return "It's a tie game!";
        }

        var message = "The winner is ";
        message += (totals.rows > totals.columns) ? players['rows']: players['columns'];
        message += ".";

        return message;
    };

    return (
        <View style={styles.container}>
            <View style={styles.playArea}>

                <View style={styles.row}>
                    <CardRow
                        spots={displayCards.slice(0,5)}
                        activeCard={activeCard}
                        placeCard={playCardToBoard}
                    />
                    <Text style={styles.score}>{scores.rows[0]}</Text>
                </View>

                <View style={styles.row}>
                    <CardRow
                        spots={displayCards.slice(5,10)}
                        activeCard={activeCard}
                        placeCard={playCardToBoard}
                    />
                    <Text style={styles.score}>{scores.rows[1]}</Text>
                </View>

                <View style={styles.row}>
                    <CardRow
                        spots={displayCards.slice(10,15)}
                        activeCard={activeCard}
                        placeCard={playCardToBoard}
                    />
                    <Text style={styles.score}>{scores.rows[2]}</Text>
                </View>

                <View style={styles.row}>
                    <CardRow
                        spots={displayCards.slice(15,20)}
                        activeCard={activeCard}
                        placeCard={playCardToBoard}
                    />
                    <Text style={styles.score}>{scores.rows[3]}</Text>
                </View>

                <View style={styles.row}>
                    <CardRow
                        spots={displayCards.slice(20,25)}
                        activeCard={activeCard}
                        placeCard={playCardToBoard}
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

            <View style={styles.cribArea}>
                <CribPart
                    name={players.rows}
                    player='rows'
                    cards={[crib.r1, crib.r2]}
                    activeCard={activeCard}
                    activePlayer={activePlayer}
                    gameOver={gameOver}
                    total={totals.rows}
                    touchCallback={(position) => {
                        console.log('called' + position);
                        updateCrib(crib, position, activeCard, setCrib);
                        setActiveCard({suit:null, value:null});
                        finishPlay();
                    }}
                />
                <CribPart
                    name={players.columns}
                    player='columns'
                    cards={[crib.c1, crib.c2]}
                    activeCard={activeCard}
                    activePlayer={activePlayer}
                    gameOver={gameOver}
                    total={totals.columns}
                    touchCallback={(position) => {
                        console.log('called' + position);
                        updateCrib(crib, position, activeCard, setCrib);
                        setActiveCard({suit:null, value:null});
                        finishPlay();
                    }}
                />
            </View>
            <Text style={{alignSelf: 'center', height: '4%',}}>The crib belongs to {players[cribPlayer]}</Text>

            <View style={styles.active}>
                <View>
                    <Text style={styles.activeText}>{players[activePlayer]}&apos;s turn:</Text>
                    <Text style={styles.activeText}>{(activeCard.suit) ? 'place your card.' :'pick a card:'}</Text>

                </View>
                <View style={styles.deckContainer}>
                    <Card suit={activeCard.suit} value={activeCard.value} />
                    <TouchableOpacity onPress={() => {
                                if(!activeCard.suit && !gameOver){
                                    setActiveCard(nextCard);
                                }
                            }}>
                        <Card suit='fake' value={null} cribPlayer={true} gameOver={false}  />
                    </TouchableOpacity>
                </View>
            </View>

            {(!gameOver) ? null: (
                <View style={styles.finishModal}>
                    <Text style={styles.modalText}>Game Over!</Text>
                    <Text style={styles.modalText}>{getWinMessage()}</Text>
                </View>)
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d2d2d2',
    },
    playArea: {
        height: '62%',
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
        height: '18.5%',
    },
    score: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffea00',
        marginHorizontal: 10,
        marginTop: 20,
    },
    scoreRows: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffea00',
        marginRight: 47,
        marginTop: 5,
    },
    deckContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    active: {
        flexDirection: 'row',
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 10,
        width: 390,
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginVertical: 5,
        height: '13%',
    },
    activeText: {
        fontSize: 20,
        marginRight: 15,
    },
    cribArea: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '20%',

    },
    finishModal: {
        zIndex: 10,
        height: 100,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: '#808080',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 24,
        color: 'white',
        marginVertical: 5,
    }

});

LocalScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        getParam: PropTypes.func.isRequired,
    }).isRequired
};

export default LocalScreen;
