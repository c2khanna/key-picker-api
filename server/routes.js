const express = require('express');
const {addKeyboardService} = require('./services');
const router = express.Router()

// middleware that is specific to this router
router.post('/api/keyboard', addKeyboardService);

module.exports = router