var VALUES = [
    {value: "A", count: 1, numeral: 1},
    {value: "2", count: 2, numeral: 2},
    {value: "3", count: 3, numeral: 3},
    {value: "4", count: 4, numeral: 4},
    {value: "5", count: 5, numeral: 5},
    {value: "6", count: 6, numeral: 6},
    {value: "7", count: 7, numeral: 7},
    {value: "8", count: 8, numeral: 8},
    {value: "9", count: 9, numeral: 9},
    {value: "10", count: 10, numeral: 11},
    {value: "J", count: 10, numeral: 11},
    {value: "Q", count: 10, numeral: 12},
    {value: "K", count: 10, numeral: 13}
];
var SUITS = ["diamonds", "hearts", "clubs", "spades"];

class CardDeck {
    constructor() {
        this.reset();
    }

    draw() {
        var i =  Math.floor(Math.random() * this.cards.length);
        var val = this.cards[i];
        this.cards.splice(i, 1);
        return val;
    }

    reset() {
        this.cards = [];
        SUITS.forEach(s => {
            VALUES.forEach(v => {
                var temp = Object.assign({}, v);
                temp.suit = s;
                this.cards.push(temp)});
        });
    }
};

module.exports = { CardDeck, SUITS, VALUES };