const express = require("express");
const {filterUsers} = require('../controllers/filter.controller');
const router = express.Router();

router.route('/').get(filterUsers);

module.exports = router;