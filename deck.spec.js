describe ('Deck', () => {
    const Deck = require('./deck');
    let deck;
    let mockId = 12345;
    let unshuffledDeck = [
        // Spades
        'SA', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK',
        // Hearts
        'HA', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK',
        // Clubs
        'CA', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK',
        // Diamonds
        'DA', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK'
    ];
    
    beforeEach (function () {
        deck = new Deck(mockId);
    });

    it ('should initialize as a shuffled deck', function () {
        expect(deck).not.toEqual(unshuffledDeck);
    });

    it ('should return the deck of cards', function () {
        expect(deck.getCards().length).toBeTruthy();
    });

    it ('should cut the full deck correctly', function () {
        let originalCards = deck.getCards().slice(0);
        deck.cut();
        expect(deck.getCards()).not.toEqual(originalCards);
    });

    it ('should cut a partial deck correctly', function () {
        let originalDeck = deck.getCards().slice(0);
        deck.popCard();
        deck.popCard();
        deck.popCard();
        originalDeck.pop();
        originalDeck.pop();
        originalDeck.pop();
        deck.cut();
        expect(deck.getCards()).not.toEqual(originalDeck);
    });

    it ('should shuffle the deck', function () {
        let originalDeck = deck.getCards().slice(0);
        deck.shuffle();
        expect(deck.getCards()).not.toEqual(originalDeck);
    });

    it ('should pop a single card from the deck', function () {
        let card = deck.popCard();
        expect(card).toBeTruthy();
        expect(typeof(card)).toBe('string');
    });

    it ('should return a full deck with dealt cards indicated', function () {
        poppedCard1 = deck.popCard();
        poppedCard2 = deck.popCard();
        expect
    });
});
