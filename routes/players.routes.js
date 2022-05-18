
const express = require('express');
const router = express.Router();

const PlayerController = require('../controllers/players.controller');


router.get('/players', PlayerController.getAll);
router.get('/players/random', PlayerController.getRandom);
router.get('/players/:id', PlayerController.getById);
router.post('/players', PlayerController.postAll);
router.put('/players/:id', PlayerController.putById);
router.delete('/players/:id', PlayerController.deleteById);
router.get('/playersPage', PlayerController.getPlayersPerPage);
router.get('/players/playerName/:playerName', PlayerController.getPlayerName);
router.get('/players/age/:age_min/:age_max', PlayerController.getAge);

module.exports = router; 