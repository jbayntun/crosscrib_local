var VALUES = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
var SUITS = ["diamonds", "hearts", "clubs", "spades"];

class CardDeck {
    constructor() {
        this.reset();
        console.log('construct CardDeck')
    }

    draw() {
        var i =  Math.floor(Math.random() * this.cards.length);
        var val = this.cards[i];
        this.cards.splice(i, 1)

        console.log('draw: ' + val.value + ' ' + val.suit);
        console.log(this.cards.length);

        return val;
    }

    reset() {
        this.cards = [];
        SUITS.forEach(s => {
            VALUES.forEach(v => {
                this.cards.push({suit: s, value: v})});
        });
        console.log('reset ' + this.cards.length)
    }
};

module.exports = CardDeck;