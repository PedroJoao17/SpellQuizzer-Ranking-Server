const express = require('express');
const router = express.Router();
const rankingsController = require('../controllers/rankingsController');

router.get('/rankings', rankingsController.getAllRankings);
router.post('/rankings', rankingsController.addRanking);
router.delete('/rankings', rankingsController.deleteAllRankings);

module.exports = router;
