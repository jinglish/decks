const request = require('supertest');
const Nedb = require('nedb');
const app = require('../src/app');
const Deck = require('../src/deck');
const database = new Nedb();
const finishTestCase = require('jasmine-supertest');

const deckId = 12345;
const mockPersistedDeck = {
    _id: deckId,
    cards: ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5', 'Card 6'],
    cardsDealt: []
};
const mockDeckUnchangedResponse = new Promise((resolve, reject) => {
    resolve(mockPersistedDeck);
});
/*const mockDbFailureResponse = new Promise((resolve, reject) => {
    reject('database done gone and broke');
});*/

describe ('Server', () => {
    it ('should return a new deck', (done) => {
        spyOn(database, 'insert').and.returnValue(mockPersistedDeck);
        request(app)
            .post('/deck')
            .expect(201)
            .expect((response) => {
                response.body = mockPersistedDeck;
            })
            .end(finishTestCase(done));
    });

    describe ('Requested deck exists', () => {
        beforeAll (() => {
            //spyOn(database, 'findOne').and.returnValue(mockPersistedDeck);
        });

        describe ('deal', () => {
            xit ('should return a single card from the deck', (done) => {
                spyOn(database, 'update').and.returnValue({
                    _id: mockPersistedDeck._id,
                    cards: mockPersistedDeck.cards,
                    cardsDealt: mockPersistedDeck.cardsDealt
                });
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
            xit ('should return a cut deck', (done) => {
                request(app)
                    .get('/deck/' + mockPersistedDeck._id + '/cut')
                    .expect(200)
                    .end(finishTestCase(done));
            });
        });

        describe ('shuffle', () => {
            xit ('should return a shuffled deck', (done) => {
                request(app)
                    .get('/deck/' + mockPersistedDeck._id + '/shuffle')
                    .expect(200)
                    .end(finishTestCase(done));
            });
        });
    });

    describe ('Requested deck doesn\'t exist', () => {
        beforeAll (() => {
            //spyOn(database, 'findOne').and.returnValue(null, null);
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

    describe ('Persistence is borked', () => {
        xit ('should 500 if a database error is encountered while trying to create a deck', (done) => {
            //spyOn(database, 'insert').and.returnValue(new Error('welp'));
            spyOn(database, 'insert').and.callFake(() => {
                return {
                    error: () => {

                    }
                }
            });
            request(app)
            .post('/deck')
            .expect(500)
            .end(finishTestCase(done));
        });
    });
});