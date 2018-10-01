'use strict';

let Express = require('express');
const Deck = require('./deck');
let Nedb = require('nedb');
const uuidv4 = require('uuid/v4');

let app = Express();
let database = new Nedb();
// TODO: URL
/*let databaseUrl = 'nedb://memory';

connect(databaseUrl).then((db) => {
    database = db;
});*/
const APPLICATION_PORT = 3000;

app.post('/deck', (request, response) => {
    let deckId = uuidv4();
    let deck = new Deck();
    response.status(201)
        .send({
            id: deckId,
            cards: deck.cards,
            cardsDealt: deck.cardsDealt
        });
    /*deck.save().then((d) => {
        let deckId = d._id;

        response.status(201)
        .send({
            id: deckId,
            cards: d.cards
        });
    });*/
});

app.get('/deck/:deckId', (request, response) => {
    Deck.findOne({_id: deckId}).then((d) => {
        response.send({
            id: d._id,
            cards: d.cards
        });
    });
});

app.get('/deck/:deckId/shuffle', (request, response) => {
    Deck.findOne({_id: deckId}).then((d) => {
        d.shuffle();

        response.send({
            id: d._id,
            cards: d.cards
        });
    });
});

app.get('/deck/:deckId/cut', (request, response) => {
    Deck.findOne({_id: deckId}).then((d) => {
        d.cut();

        response.send({
            id: d._id,
            cards: d.cards
        });
    });
});

app.get('/deck/:deckId/card', (request, response) => {
    Deck.findOne({_id: deckId}).then((d) => {
        c = d.dealCard();

        response.send({
            card: c
        });
    });
});

var server = app.listen(APPLICATION_PORT, () => {
    console.log("Decks service listening on port " + server.address().port + "!")
});

module.exports = server;
