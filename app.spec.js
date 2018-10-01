const request = require('supertest');
const Nedb = require('nedb');
const app = require('./app');
const Deck = require('./deck');
const database = new Nedb();
const finishTestCase = require('jasmine-supertest');
mockDatabase = 

describe ('Server', () => {
    beforeEach(() => {
        spyOn(database, 'insert');
        spyOn(database, 'update');
    });
    
    let deckId = 
    it ('should return a new deck', (done) => {
        request(app).post('/deck')
            .expect(201)
            .end(finishTestCase(done));
    });

    describe('Tests on an existing deck', () => {
        beforeEach(() => {
            //spyOn(Deck, '')
        });

        it ('should return a single card from the deck', (done) => {
            request(app).get('/deck/')
                .expect(200)
                .end(finishTestCase(done));
        });
    });
});