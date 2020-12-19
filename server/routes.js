const express = require('express');
const {addKeyboardService, getAllKeyboardService} = require('./services');
const router = express.Router()

// middleware that is specific to this router
router.post('/api/keyboards', addKeyboardService);
router.get('/api/keyboards', getAllKeyboardService);

module.exports = router