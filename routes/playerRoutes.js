const express = require('express');
const router = express.Router();
const {
    getPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    updateStartTime,
    updateAfterBuilding,
    updateFarming,
    deletePlayer,
} = require('../controllers/playerController');

router.route('/').get(getPlayers).post(createPlayer);
router.route('/update-time').put(updateStartTime);
router.route('/update-farming').put(updateFarming);
router.route('/update-building').put(updateAfterBuilding);
router.route('/:id').get(getPlayerById).put(updatePlayer).delete(deletePlayer);

module.exports = router;
