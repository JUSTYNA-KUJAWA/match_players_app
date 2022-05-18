const express = require('express');
const router = express.Router();
const StatisticController = require('../controllers/statistics.controller');

router.get('/statistics', StatisticController.getAll);

router.get('/statistics/:id', StatisticController.getById);

router.post('/statistics', StatisticController.postStatistic);

router.put('/statistics/:id', StatisticController.putStatistic);

router.delete('/statistics/:id', StatisticController.deleteStatistic);

module.exports = router;