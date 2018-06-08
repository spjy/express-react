require('dotenv-extended').load();

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io').listen(server);

const routes = require('./routes');

app.use(helmet());

app.use(express.static(__dirname + '/node_modules'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    console.log(err);
  }
});

io.on('connection', (socket) => {
  socket.on('connected', function() {
    console.log('I am working!');
	});
});

server.listen(process.env.EXPRESS_PORT, () => {
	console.log(`Server listening on port ${process.env.EXPRESS_PORT}`);
});
