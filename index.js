'use strict';

let Express = require('express');
const Deck = require('./deck');
let Nedb = require('nedb');

let app = Express();
let database = new Nedb();
const APPLICATION_PORT = 3000;

app.post('/deck', (request, response) => {
    let deck = new Deck();
    database.insert(deck.toJson(), (error, persistedDeck) => {
        response.status(201)
        .send(persistedDeck);
    });
});

app.get('/deck/:deckId', (request, response) => {
    database.findOne({_id: request.params.deckId}, (error, deck) => {
        return response.send(deck);
    });
});

app.get('/deck/:deckId/shuffle', (request, response) => {
    database.findOne({_id: request.params.deckId}, (error, persistedDeck) => {
        let deck = new Deck(persistedDeck);
        deck.shuffle();
        database.update({_id: deck._id}, deck.toJson(), {upsert: true}, (err) => {
            return response.send(deck.toJson());
        });
    });
});

app.get('/deck/:deckId/cut', (request, response) => {
    database.findOne({_id: request.params.deckId}, (error, persistedDeck) => {
        let deck = new Deck(persistedDeck);
        deck.cut();
        database.update({_id: deck._id}, deck.toJson(), {upsert: true}, (err) => {
            return response.send(deck.toJson());
        });
    });
});

app.get('/deck/:deckId/deal', (request, response) => {
    database.findOne({_id: request.params.deckId}, (error, persistedDeck) => {
        let deck = new Deck(persistedDeck);
        let card = deck.dealCard();
        database.update({_id: deck._id}, deck.toJson(), {upsert: true}, (err) => {
            return response.send({
                card: card
            });
        });
    });
});

let server = app.listen(APPLICATION_PORT, () => {
    console.log("Decks service listening on port " + server.address().port + "!")
});

module.exports = server;
