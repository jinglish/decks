class Deck {

    cards = [];
    cardsDealt = [];
    id;
    
    constructor (id) {
        this.cards = this.getFreshSortedDeck();
        this.shuffle();
        this.id = id;
        this.upsertDeckInPersistence();
    }

    getCards () {
        return this.cards;
    }
    
    shuffle () {
        for (i = this.cards.length - 1; i > 0; i--) {
            let randomToSwap = Math.floor(Math.random() * (i + 1));
            let tempCard = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = tempCard;
        }
        return this.cards;
    }
    
    cut () {
        let divider = Math.floor(this.cards.length);
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
        return [
            // Spades
            'SA', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK',
            // Hearts
            'HA', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK',
            // Clubs
            'CA', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK',
            // Diamonds
            'DA', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK'
        ]
    }
}
