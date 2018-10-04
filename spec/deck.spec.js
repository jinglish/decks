const Deck = require('../src/deck');
let deck;

describe ('Deck constructors', () => {
    let unshuffledDeck = [
        // Spades
        '\u2660 A', '\u2660 2', '\u2660 3', '\u2660 4', '\u2660 5', '\u2660 6',
        '\u2660 7', '\u2660 8', '\u2660 9', '\u2660 10', '\u2660 J', '\u2660 Q',
        '\u2660 K',
        // Hearts
        '\u2665 A', '\u2665 2', '\u2665 3', '\u2665 4', '\u2665 5', '\u2665 6',
        '\u2665 7', '\u2665 8', '\u2665 9', '\u2665 10', '\u2665 J', '\u2665 Q',
        '\u2665 K',
        // Clubs
        '\u2663 A', '\u2663 2', '\u2663 3', '\u2663 4', '\u2663 5', '\u2663 6',
        '\u2663 7', '\u2663 8', '\u2663 9', '\u2663 10', '\u2663 J', '\u2663 Q',
        '\u2663 K',
        // Diamonds
        '\u2666 A', '\u2666 2', '\u2666 3', '\u2666 4', '\u2666 5', '\u2666 6',
        '\u2666 7', '\u2666 8', '\u2666 9', '\u2666 10', '\u2666 J', '\u2666 Q',
        '\u2666 K'
    ];

    it ('should initialize as a new shuffled deck with no arguments', () => {
        deck = new Deck();
        expect(deck.cards.length).toBe(52);
        expect(deck.cards).not.toEqual(unshuffledDeck);
    });

    it ('should initialize a persisted deck with given characteristics', () => {
        let persistedDeck = {
            _id: 12345,
            cards: ['Card 1', 'Card 3'],
            cardsDealt: ['Card 2']
        };
        deck = new Deck(persistedDeck);

        expect(deck._id).toEqual(persistedDeck._id);
        expect(deck.cards).toEqual(persistedDeck.cards);
        expect(deck.cardsDealt).toEqual(persistedDeck.cardsDealt);
    });
});

describe ('Deck functionality', () => {
    let mockId = 12345;
    
    beforeEach (() => {
        deck = new Deck();
    });

    it ('should cut the full deck correctly', () => {
        let originalCards = deck.cards.slice(0);
        deck.cut();
        expect(deck.cards).not.toEqual(originalCards);
    });

    it ('should cut a partial deck correctly', () => {
        let originalDeck = deck.cards.slice(0);
        deck.dealCard();
        deck.dealCard();
        deck.dealCard();
        originalDeck.pop();
        originalDeck.pop();
        originalDeck.pop();
        deck.cut();
        expect(deck.cards).not.toEqual(originalDeck);
    });

    it ('should shuffle the deck', () => {
        let originalDeck = deck.cards.slice(0);
        deck.shuffle();
        expect(deck.cards).not.toEqual(originalDeck);
    });

    it ('should pop a single card from the deck', () => {
        let card = deck.dealCard();
        expect(card).toBeTruthy();
        expect(typeof(card)).toBe('string');
    });

    it ('should return a full deck with dealt cards indicated', () => {
        poppedCard1 = deck.dealCard();
        poppedCard2 = deck.dealCard();
        expect(deck.cards.includes(poppedCard1)).toBeFalsy();
        expect(deck.cardsDealt.includes(poppedCard1)).toBeTruthy();
        expect(deck.cards.includes(poppedCard2)).toBeFalsy();
        expect(deck.cardsDealt.includes(poppedCard2)).toBeTruthy();
    });
});
