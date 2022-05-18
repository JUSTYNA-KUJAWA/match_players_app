const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const mongoose = require('mongoose')

// import routers
const teamsRoutes = require('./routes/teams.routes');
const playersRoutes = require('./routes/players.routes');
const statisticsRoutes = require('./routes/statistics.routes');
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


// kod umozliwiający dostęp do serwera WebSocket poprzez komendę: req.io
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', teamsRoutes);
app.use('/api', playersRoutes);
app.use('/api', statisticsRoutes);

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

// connects our backend code with the database

const dbURI = 'mongodb+srv://JUSTI:test123@cluster0.epgpr.mongodb.net/PlayerDB?retryWrites=true&w=majority';
  //: 'mongodb://localhost:27017/PlayerDB';
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;


db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!' + socket.id)
  
});

module.exports = server;
