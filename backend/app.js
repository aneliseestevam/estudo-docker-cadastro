const express = require('express'); // servidor web
const restful = require('node-restful'); // serve para implementar o web service de uma forma mais fácil
const server = express(); // start no server utilizando o construtor do express
const mongoose = restful.mongoose; // está disponível a partir do restful
const bodyParser = require('body-parser');
const cors = require('cors');

// conexao com mongodb
// Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://db/mydb');

// Middlewares
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use(cors());

// ODM
const Client = restful.model('Client', {
    name: { type: String, required: true }
});

// Rest API
Client.methods(['get', 'post', 'put', 'delete']);
Client.updateOptions({ new: true, runValidators: true });

// Routes
Client.register(server, '/clients');

// Start server
server.listen(3000);