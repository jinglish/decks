const request = require('supertest');
const Nedb = require('nedb');
const app = require('./app');
const Deck = require('./deck');
const database = new Nedb();
const finishTestCase = require('jasmine-supertest');

let deckId = 12345;
let mockPersistedDeck = {
    _id: deckId,
    cards: ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5', 'Card 6'],
    cardsDealt: []
};

describe ('Server', () => {
    beforeAll (() => {
        spyOn(database, 'insert').and.returnValue(null, mockPersistedDeck);
    });

    it ('should return a new deck', (done) => {
        request(app)
            .post('/deck')
            .expect(201)
            .expect((response) => {
                response.body = mockPersistedDeck;
            })
            .end(finishTestCase(done));
    });

    describe ('Requested deck exists', () => {
        beforeEach (() => {
            spyOn(database, 'findOne').and.returnValue(null, mockPersistedDeck);
        });

        describe ('deal', () => {
            it ('should return a single card from the deck', (done) => {
                //spyOn(database, 'update').
                request(app)
                    .get('/deck/' + mockPersistedDeck._id + '/deal')
                    .expect(200)
                    .expect((response) => {
                        assert(response.card, mockPersistedDeck.cards[0]);
                    })
                    .end(finishTestCase(done));
            });
        });

        describe ('cut', () => {
            it ('should return a cut deck', (done) => {
                request(app)
                    .get('/deck/' + mockPersistedDeck._id + '/cut')
                    .expect(200)
                    .end(finishTestCase(done));
            });
        });

        describe ('shuffle', () => {
            it ('should return a shuffled deck', (done) => {
                request(app)
                    .get('/deck/' + mockPersistedDeck._id + '/shuffle')
                    .expect(200)
                    .end(finishTestCase(done));
            });
        });
    });

    describe ('Requested deck doesn\'t exist', () => {
        beforeAll (() => {
            spyOn(database, 'findOne').and.returnValue(null, null);
        });

        it ('should 404 on deal if deck doesn\'t exist', (done) => {
            request(app)
                .get('/deck/' + deckId + '/deal')
                .expect(404)
                .end(finishTestCase(done));
        });
        
        it ('should 404 on shuffle if deck doesn\'t exist', (done) => {
            request(app)
                .get('/deck/' + deckId + '/shuffle')
                .expect(404)
                .end(finishTestCase(done));
        })

        it ('should 404 on cut if deck doesn\'t exist', (done) => {
            request(app)
                .get('/deck/' + deckId + '/cut')
                .expect(404)
                .end(finishTestCase(done));
        });
    });
});