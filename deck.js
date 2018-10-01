let Document = require('camo').Document

class Deck extends Document {
    constructor () {
        super();

        this.cards = this.getFreshSortedDeck();
        this.cardsDealt = [];
        this.shuffle();
        this.id = id;
        this.upsertDeckInPersistence();
    }

    getCards () {
        return this.cards;
    }
    
    shuffle () {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let tempCard = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = tempCard;
        }

        return this.cards;
    }
    
    cut () {
        let divider = Math.floor(this.cards.length) / 2;
        let backHalf = this.cards.slice(divider);
        let frontHalf = this.cards.slice(0, divider);
        this.cards = backHalf.concat(frontHalf);
        return this.cards;
    }

    popCard () {
        let card =  this.cards.shift();
        this.cardsDealt.push(card + 'D');
        return card;
    }

    getDeckWithDealtIndicators () {
        return this.cardsDealt.concat(this.cards);
    }

    upsertDeckInPersistence () {
        
    }

    getFreshSortedDeck () {
        // In order: spade, heart, club, and diamond unicode characters
        const suites = ['\u2660 ', '\u2665 ', '\u2663 ', '\u2666 '];
        const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
        let toReturn = [];

        for (let suite in suites) {
            for (let cardValue in cardValues) {
                toReturn.push(suite + cardValue);
            }
        }

        return toReturn;
    }

    static collectionName () {
        return 'decks';
    }
}

module.exports = Deck;
