'use strict';

let Express = require('express');
const Deck = require('./deck');
const uuidv4 = require('uuid/v4');
const connect = require('camo').connect;

let app = Express();
let database;
// TODO: URL
let databaseUrl = 'nedb:///';

connect(databaseUrl).then((db) => {
    database = db;
});
const APPLICATION_PORT = 3000;

app.post('/deck', (request, response) => {
    let deckId = uuidv4();
    let deck = new Deck(deckId);
    response.status(201)
        .send({
            id: deckId,
            cards: deck.cards
    });
});

app.get('/deck/:deckId', (request, response) => {
    
});

app.get('/deck/:deckId/shuffle', (request, response) => {
    
});

app.get('/deck/:deckId/cut', (request, response) => {
    
});

app.get('/deck/:deckId/card', (request, response) => {

});

var server = app.listen(APPLICATION_PORT, () => {
    console.log("Decks service listening on port " + server.address().port + "!")
});

module.exports = server;
