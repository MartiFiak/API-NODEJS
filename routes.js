const express = require('express');
const profileRoutes = require('./api/profiles');

const router = express.Router();

router.use('/api', profileRoutes);

module.exports = router;
