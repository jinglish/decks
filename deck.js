class Deck {
    constructor (id) {
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
        console.log(this.cards);
        let divider = Math.floor(this.cards.length) / 2;
        let backHalf = this.cards.slice(divider);
        let frontHalf = this.cards.slice(0, divider);
        console.log(backHalf);
        console.log(frontHalf);
        this.cards = backHalf.concat(frontHalf);
        console.log(this.cards);
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
        /*const SPADE = '\u2660 ';
        const HEART = '\u2665 ';
        const CLUB = '\u2663 ';
        const DIAMOND = '\u2666 ';*/

        // In order: spade, heart, club, and diamond unicode characters
        const suites = ['\u2660 ', '\u2665 ', '\u2663 ', '\u2666 '];
        const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

        let toReturn = [];

        for (let suite in suites) {
            for (let cardValue in cardValues) {
                toReturn.push(suite + cardValue);
            }
        }
        /*return [
            // Spades
            SPADE + 'A', SPADE + '2', SPADE + '3', SPADE + '4', SPADE + '5', SPADE + '6', SPADE + '7', SPADE + '8',
            SPADE + '9', SPADE + '10', SPADE + 'J', SPADE + 'Q', SPADE + 'K',
            // Hearts
            DIAMOND + 'A', DIAMOND + 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK',
            // Clubs
            'CA', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK',
            // Diamonds
            'DA', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK'
        ];*/
        return toReturn;
    }
}

module.exports = Deck;
