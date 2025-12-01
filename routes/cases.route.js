const express = require('express');
const router = express.Router();
const casesController = require('../controllers/cases.controller');
    
router.post('/', casesController.promoteLeadToCase);
router.patch('/:id', casesController.updateCaseStatus);

module.exports = router;
