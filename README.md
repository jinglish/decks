# Decks
A Node-based web service for all your playing card needs.

## Getting started
You will need to have Node.js installed; version 6 may work, but this application has only been tested with version 8 or later. Run `npm install` to download all dependencies. If you wish to run unit tests, you may do so by running `npm test`, although Jasmine will need to be installed globally; if it isn't on your machine, you can run `npm install -g jasmine`. Run `npm start` to start the service, which you can then access at `localhost:3000`.

## Interacting with the application
To create a deck, send a `POST` to `<root url>/deck`. The response will be a JSON object containing `cards`, an array of strings representing the current deck; `cardsDealt`, a similar array that is empty at deck initialization and keeps track of dealt cards; and `_id`, NeDB's identifier field. You can make subsequent calls to the API to retrieve this deck and perform operations on it using this identifier as long as the current application process is running.

To retrieve the deck, call `/deck/<id>` with a `GET`; shuffling and cutting the deck can be performed with `GET`s to `/deck/<id>/shuffle` and `/deck/<id>/cut`, respectively. To draw a card, send a `GET` to `/deck/<id>/deal`. The JSON response will contain one string property, `card`.
