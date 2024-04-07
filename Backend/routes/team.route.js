const express = require("express");
const { createTeam, getAllTeams, getTeam } = require("../controllers/team.controller");

const router = express.Router();

router.route('/').post(createTeam).get(getAllTeams);
router.route('/:id').get(getTeam);

module.exports = router;
