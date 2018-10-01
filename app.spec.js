const request = require('supertest');
const Nedb = require('nedb');
const app = require('./app');
const Deck = require('./deck');
const database = new Nedb();
const finishTestCase = require('jasmine-supertest');
//mockDatabase = 

mockPersistedDeck = {
    _id: 12345,
    cards: ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5', 'Card 6'],
    cardsDealt: []
};

describe ('Server', () => {
    beforeEach(() => {
        spyOn(database, 'insert').and.returnValue(mockPersistedDeck);
        spyOn(database, 'update');
    });
    
    let deckId = 
    it ('should return a new deck', (done) => {
        request(app).post('/deck')
            .expect(201)
            .expect((response) => {
                response.body = mockPersistedDeck;
            })
            .end(finishTestCase(done));
    });

    describe ('Tests on an existing deck', () => {
        beforeEach(() => {
            //spyOn(Deck, '')
        });

        describe ('deal', () => {
            it ('should return a single card from the deck', (done) => {
                request(app).get('/deck/' + mockPersistedDeck._id + '/deal')
                    .expect(200)
                    .end(finishTestCase(done));
            });

            it ('should 404 if deck doesn\'t exist', (done) => {

            });
        });

        describe ('cut', () => {
            it ('should return a cut deck', (done) => {

            });

            it ('should 404 if deck doesn\'t exist', (done) => {
                
            })
        });

        describe ('shuffle', () => {
            it ('should return a shuffled deck', (done) => {

            });

            it ('should 404 if deck doesn\'t exist', (done) => {
                
            });
        });
    });
});