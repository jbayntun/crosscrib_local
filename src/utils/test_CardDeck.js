const CardDeck = require('./CardDeck.js');

// test there are no duplicates when accessing all cards.
// Also tests behaviour after drawing all 52 cards

var ROUNDS = 10;

var deck = new CardDeck();

for(var i = 0; i < ROUNDS; i++) {
    var set = new Set();
    deck.reset();

    for(card = deck.draw(); card != null; card = deck.draw()) {
        //console.log(card);
        if(set.has(card)){
            console.log("FAIL - round " + i + " duplicate card:");
            console.log(card);
            console.log('set:');
            console.log(set);
            break;
        }

        set.add(card);
    }

    if (set.size != 52){
        console.log("FAIL - round " + i + " wrong amount of cards! " + set.size);
    }

    console.log("Completes round " + i);

}




console.log("Completed tests");
