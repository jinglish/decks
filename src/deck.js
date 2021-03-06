const uuidv4 = require('uuid/v4');

class Deck{
    constructor (deckEntity) {
        if (!arguments.length) {;
            this.cards = this.getFreshSortedDeck();
            this.cardsDealt = [];
            this.shuffle();
        } else {
            this._id = deckEntity._id;
            this.cards = deckEntity.cards;
            this.cardsDealt = deckEntity.cardsDealt;
        }
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

    dealCard () {
        let card =  this.cards.shift();
        this.cardsDealt.push(card);
        return card;
    }

    getFreshSortedDeck () {
        // In order: spade, heart, club, and diamond unicode characters
        const suites = ['\u2660 ', '\u2665 ', '\u2663 ', '\u2666 '];
        const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
        let toReturn = [];

        for (let i = 0; i < suites.length; i++) {
            for (let j = 0; j < cardValues.length; j++) {
                toReturn.push(suites[i] + cardValues[j]);
            }
        }

        return toReturn;
    }

    toJson () {
        return {
            id: this.id,
            cards: this.cards,
            cardsDealt: this.cardsDealt
        }
    }
}

module.exports = Deck;
