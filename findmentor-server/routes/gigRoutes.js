const express = require('express');
const { createGig, getAllGigs, updateGigRequest, SendRequest } = require('../controllers/gigController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/gigs', createGig);
router.get('/gigs', getAllGigs);
router.put('/:id/request', updateGigRequest);
router.put('/gigs/:gigId/SendRequest',SendRequest);

module
// Continuing from the previous part
router.put('/:id/request', updateGigRequest);

module.exports = router;
