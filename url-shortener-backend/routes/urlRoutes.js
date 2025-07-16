const express = require('express');
const router = express.Router();
const controller = require('../controllers/urlController');
router.post('/shorturls', controller.createShortURL);
router.get('/shorturls/:code', controller.getStats);
router.get('/:code', controller.redirect);
module.exports = router;
