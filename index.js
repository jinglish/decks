var Express = require("express");

var app = Express();
const APPLICATION_PORT = 3000;

app.get("/deck", (request, response) => {
    
});

var server = app.listen(APPLICATION_PORT, () => {
    console.log("Decks service listening on port " + server.address().port + "!")
});

module.exports = server;
