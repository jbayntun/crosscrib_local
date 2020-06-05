const CardDeck = require('./CardDeck.js').CardDeck;

const VALUES = {
    "A": {count: 1, numeral: 1},
    "2": {count: 2, numeral: 2},
    "3": {count: 3, numeral: 3},
    "4": {count: 4, numeral: 4},
    "5": {count: 5, numeral: 5},
    "6": {count: 6, numeral: 6},
    "7": {count: 7, numeral: 7},
    "8": {count: 8, numeral: 8},
    "9": {count: 9, numeral: 9},
    "10": {count: 10, numeral: 10},
    "J": {count: 10, numeral: 11},
    "Q": {count: 10, numeral: 12},
    "K": {count: 10, numeral: 13},
    null: {count: NaN, numeral: NaN}
}

class Crib {
    constructor() {
        this.deck = new CardDeck();
    }

    play() {
        console.log('enter crib play');
        if(this.deck.cards.length === 52) {
            var card = this.deck.draw();
            card.iscut = true;
            return card;
        }

        if(this.deck.cards.length > 23) {
            return this.deck.draw();
        }

        return null;
    }

    static scoreHand(cards, isCrib){
        var score = 0;
        // check 15's
        score += this.scoreFifteens(cards);
        // check pairs
        score += this.scorePairs(cards);
        // check runs
        score += this.scoreRuns(cards);
        // check flush
        score += this.scoreFlushes(cards, isCrib);
        // check nob
        score += this.scoreNob(cards);
        // check heels
        score += this.scoreHeels(cards, isCrib);

        return score;
    }

    // expected input is an array of numbers, including NaN values
    // returns the sum for all non-duplicating combinations of values in the array.
    // Considers the case of no elements, returning 0, but doesn't impact score.
    // adapted from https://js-algorithms.tutorialhorizon.com/2015/10/23/combinations-of-an-array/
    static combination(arr){
        let i, j, temp
        let result = []
        let arrLen = arr.length
        let power = Math.pow
        let combinations = power(2, arrLen)

        // Time & Space Complexity O (n * 2^n)

        for (i = 0; i < combinations;  i++) {
            temp = 0

            for (j = 0; j < arrLen; j++) {
                  // & is bitwise AND
                  if ((i & power(2, j))) {
                    temp += arr[j]
                  }
            }

            result.push(temp)
        }
        return result
    }

    // expected input is a hand of cards
    // returns the total score for all fifteen combinations in the hand
    static scoreFifteens(cards){
        var mapped = cards.map(c => VALUES[c.value].count);
        var ps = this.combination(mapped);
        var score = 0;

        for(let i = 0; i < ps.length; i++)
        {
            if(ps[i] === 15){
                score +=2;
            }
        }

        return score;
    }

    // expected input is a hand of cards
    // returns the total score for all pairs the hand
    // could use a map and do a single pass, but it's a really short array.
    static scorePairs(cards){
        var total_pairs = 0;
        for(let i = 0; i < cards.length; i++) {
            for(let j = i + 1; j < cards.length; j++) {
                if(cards[i].value && cards[i].value === cards[j].value){
                    total_pairs++;
                }
            }
        }

        return 2 * total_pairs;
    }

    // expected input is a hand of cards
    // returns the total score for all pairs the hand
    // hands can have 4 or 5 cards of same suit, one point each.
    // crib must have all 5
    static scoreFlushes(cards, isCrib) {
        var map = new Map();
        for(var i = 0; i < cards.length; i++){
            if(cards[i].suit) {
                if(map.has(cards[i].suit)) {
                    map.set(cards[i].suit, map.get(cards[i].suit) + 1);
                } else {
                    map.set(cards[i].suit, 1);
                }
            }
        }

        for (let value of map.values()) {
            if(value === 5) {
                return 5;
            }

            if(value === 4 && !isCrib) {
                return 4;
            }
        }

        return 0;
    }

    // expected input is a hand of cards
    // returns the total run score component for all
    // single, double or triple runs
    static scoreRuns(cards) {
        // we don't use index 0 since A maps to 1
        var arr = new Array(14).fill(0);

        // increment value at array index which corresponds to the
        // card's numeric value (ie: Q = 12)
        for(var i = 0; i < cards.length; i++) {
            if(VALUES[cards[i].value].numeral){
                arr[VALUES[cards[i].value].numeral]++;
            }
        }

        var multiplier = 1;
        var connected = 0;

        for (let value of arr) {
            if(value === 0) {
                // check if connected is enough for a run, return.
                // with a 5 card hand, two non-double runs isn't possible
                if (connected > 2) {
                    return connected * multiplier;
                }

                // otherwise, reset counts
                connected = 0;
                multiplier = 1;
            } else {
                connected++;
                if(value > 1){
                    // consider double-double run (multiplier===2) and triple run
                    multiplier = (multiplier === 2) ?  4 : value;
                }
            }
        }

        // in case of king-high run, will exit loop without returning
        if (connected > 2) {
            return connected * multiplier;
        }

        return 0;
    }

    // expected input is a hand of cards
    // returns 1 if the hand has a jack who's suit matches the cut
    // hand must have a cut
    static scoreNob(cards) {
        const cut = cards.find(element => element.iscut);
        if(cut) {
            for(let i = 0; i < cards.length; i++) {
                if(!cards[i].iscut && cards[i].value === "J" && cards[i].suit === cut.suit) {
                    return 1;
                }
            }
        }

        return 0;
    }

    static scoreHeels(cards, isCrib) {
        if(isCrib && cards.some((card) => {
            return card.iscut && card.value === "J";
        })) {
            return 2;
        }

        return 0;
    }
};



module.exports = Crib;