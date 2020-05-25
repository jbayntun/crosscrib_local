const Crib = require('./Crib.js');
// TODO how should flushes be scored in cross crib?  given that only one hand has a cut

function validateExpected(expected, actual, title) {
    if (expected !== actual) {
        console.log("  FAIL - expected: " + expected + " actual " + actual + "\t" + title);
        return false;
    }

    console.log("  Pass - " + title);
    return true;
}

var hands = [
    {
        cards: [
            {suit: "clubs", value: "6", iscut: true},
            {suit: "diamonds", value: "J"},
            {suit: "hearts", value: "5"},
            {suit: "spades", value: "4"},
            {suit: "diamonds", value: "5"}
        ],
        fifteens: 8,
        runs: 6,
        pairs: 2,
        flush: 0,
        nobs: 0,
        title: "1"
    },
    {
        cards: [
            {suit: "clubs", value: "3", iscut: true},
            {suit: "diamonds", value: "3"},
            {suit: "hearts", value: "4"},
            {suit: "spades", value: "4"},
            {suit: "diamonds", value: "A"}
        ],
        fifteens: 2,
        runs: 0,
        pairs: 4,
        flush: 0,
        nobs: 0,
        title: "2"
    },
    {
        cards: [
            {suit: "clubs", value: "3"},
            {suit: "diamonds", value: "J"},
            {suit: "spades", value: "3"},
            {suit: "spades", value: "2"},
            {suit: "diamonds", value: "A", iscut: true}
        ],
        fifteens: 4,
        runs: 6,
        pairs: 2,
        flush: 0,
        nobs: 1,
        title: "3"
    },
    {
        cards: [
            {suit: "diamonds", value: "5"},
            {suit: "hearts", value: "J"},
            {suit: "spades", value: "5"},
            {suit: "hearts", value: "5", iscut: true},
            {suit: "clubs", value: "5"}
        ],
        fifteens: 16,
        runs: 0,
        pairs: 12,
        flush: 0,
        nobs: 1,
        title: "4"
    },
    {
        cards: [
            {suit: "clubs", value: "6", iscut: true},
            {suit: "diamonds", value: "J"},
            {suit: "diamonds", value: "7"},
            {suit: "diamonds", value: "4"},
            {suit: "diamonds", value: "5"}
        ],
        fifteens: 4,
        runs: 4,
        pairs: 0,
        flush: 4,
        nobs: 0,
        title: "5"
    },
    {
        cards: [
            {suit: "clubs", value: "6", iscut: true},
            {suit: "diamonds", value: "6"},
            {suit: "spades", value: "6"},
            {suit: null, value: null},
            {suit: null, value: null}
        ],
        fifteens: 0,
        runs: 0,
        pairs: 6,
        flush: 0,
        nobs: 0,
        title: "6"
    },
    {
        cards: [
            {suit: null, value: null},
            {suit: "diamonds", value: "6"},
            {suit: null, value: null},
            {suit: null, value: null},
            {suit: null, value: null}
        ],
        fifteens: 0,
        runs: 0,
        pairs: 0,
        flush: 0,
        nobs: 0,
        title: "7"
    },
    {
        cards: [
            {suit: null, value: null},
            {suit: null, value: null},
            {suit: null, value: null},
            {suit: null, value: null},
            {suit: null, value: null}
        ],
        fifteens: 0,
        runs: 0,
        pairs: 0,
        flush: 0,
        nobs: 0,
        title: "8"
    },
    {
        cards: [
            {suit: "clubs", value: "10", iscut: true},
            {suit: "diamonds", value: "J"},
            {suit: "clubs", value: "Q"},
            {suit: "diamonds", value: "Q"},
            {suit: "diamonds", value: "K"}
        ],
        fifteens: 0,
        runs: 8,
        pairs: 2,
        flush: 0,
        nobs: 0,
        title: "9"
    },
    {
        cards: [
            {suit: "clubs", value: "6", iscut: true},
            {suit: "diamonds", value: "4"},
            {suit: "hearts", value: "5"},
            {suit: "spades", value: "4"},
            {suit: "diamonds", value: "6"}
        ],
        fifteens: 8,
        runs: 12,
        pairs: 4,
        flush: 0,
        nobs: 0,
        title: "10"
    },
    {
        cards: [
            {suit: "clubs", value: "7", iscut: true},
            {suit: "diamonds", value: "7"},
            {suit: "hearts", value: "7"},
            {suit: "spades", value: "8"},
            {suit: "diamonds", value: "6"}
        ],
        fifteens: 6,
        runs: 9,
        pairs: 6,
        flush: 0,
        nobs: 0,
        title: "11"
    }
];


FAILS = 0;

for(let i = 0; i < hands.length; i++) {
    console.log("\nTesting hand " + hands[i].title)

    // test 15
    if(!validateExpected(
        hands[i].fifteens,
        Crib.scoreFifteens(hands[i].cards),
        hands[i].title + "_fifteens"
    )) {
        FAILS++;
    }

    // test pairs
    if(!validateExpected(
        hands[i].pairs,
        Crib.scorePairs(hands[i].cards),
        hands[i].title + "_pairs"
    )) {
        FAILS++;
    }

    // test flushes
    if(!validateExpected(
        hands[i].flush,
        Crib.scoreFlushes(hands[i].cards),
        hands[i].title + "_flushes"
    )) {
        FAILS++;
    }

    // test runs
    if(!validateExpected(
        hands[i].runs,
        Crib.scoreRuns(hands[i].cards),
        hands[i].title + "_runs"
    )) {
        FAILS++;
    }

}

console.log("\n*****************************************\n");
console.log("Total fails: " + FAILS + "\n");