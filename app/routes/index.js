const express = require('express');
const tutorialRoutes = require('./tutorial.routes');

const router = express.Router();

// Use as rotas individuais
router.use('.', tutorialRoutes);

module.exports = router;