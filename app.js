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
        if (error) {
            return response.status(500).send(error.message);
        }

        return response.status(201)
        .send(persistedDeck);
    });
});

app.get('/deck/:deckId', (request, response) => {
    database.findOne({_id: request.params.deckId}, (error, deck) => {
        if (error) {
            return response.status(500).send(error.message);
        } else if (!deck) {
            return response.status(404).send('Deck not found');
        }

        return response.send(deck);
    });
});

app.get('/deck/:deckId/shuffle', (request, response) => {
    database.findOne({_id: request.params.deckId}, (error, persistedDeck) => {
        if (error) {
            return response.status(500).send(error.message);
        } else if (!persistedDeck) {
            return response.status(404).send('Deck not found');
        }

        let deck = new Deck(persistedDeck);
        deck.shuffle();
        database.update({_id: deck._id}, deck.toJson(), {upsert: true}, (err) => {
            if (err) {
                return response.status(500).send(err.message);
            }
            return response.send(deck.toJson());
        });
    });
});

app.get('/deck/:deckId/cut', (request, response) => {
    database.findOne({_id: request.params.deckId}, (error, persistedDeck) => {
        if (error) {
            return response.status(500).send(error.message);
        } else if (!persistedDeck) {
            return response.status(404).send('Deck not found');
        }

        let deck = new Deck(persistedDeck);
        deck.cut();
        database.update({_id: deck._id}, deck.toJson(), {upsert: true}, (err) => {
            if (err) {
                return response.status(500).send(err.message);
            }
            return response.send(deck.toJson());
        });
    });
});

app.get('/deck/:deckId/deal', (request, response) => {
    database.findOne({_id: request.params.deckId}, (error, persistedDeck) => {
        if (error) {
            return response.status(500).send(error.message);
        } else if (!persistedDeck) {
            return response.status(404).send('Deck not found');
        }

        let deck = new Deck(persistedDeck);
        let card = deck.dealCard();
        database.update({_id: deck._id}, deck.toJson(), {upsert: true}, (err) => {
            if (err) {
                return response.status(500).send(err.message);
            }
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
