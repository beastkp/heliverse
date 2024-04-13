const express = require("express");
const { createTeam, getAllTeams, getTeam, updateTeam, deleteTeam } = require("../controllers/team.controller");

const router = express.Router();

router.route('/').post(createTeam).get(getAllTeams);
router.route('/:id').get(getTeam).put(updateTeam).delete(deleteTeam);

module.exports = router;
