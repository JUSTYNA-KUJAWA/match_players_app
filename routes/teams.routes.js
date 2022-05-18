const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/teams.controller');

router.get('/teams', TeamController.getAll);

router.get('/teams/:id', TeamController.getById);

router.post('/teams', TeamController.postTeam);

router.put('/teams/:id', TeamController.putTeam);

router.delete('/teams/:id', TeamController.deleteTeam);

module.exports = router;