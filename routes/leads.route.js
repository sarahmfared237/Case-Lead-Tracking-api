const express = require('express');
const router = express.Router();
const controller = require('../controllers/leads.controller');

router.get('/', controller.listLeads);
router.post('/', controller.createLead);

module.exports = router;
