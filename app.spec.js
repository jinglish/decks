const request = require('supertest');
const app = require('./index');
const finishTestCase = require('jasmine-supertest');

describe ('Server', () => {
    let deckId = 
    it ('should return a new deck', (done) => {
        request(app).post('/deck')
            .expect(201)
            .end(finishTestCase(done));
    });

    describe('Tests on an existing deck', () => {
        beforeEach(() => {
            
        });

        it ('should return a single card from the deck', (done) => {
            request(app).get('')
                .expect(200)
                .end(finishTestCase(done));
        });
    });
});