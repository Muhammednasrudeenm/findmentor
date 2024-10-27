const express = require('express');
const { getUsers, approveUser, rejectUser } = require('../controllers/adminController');
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');
const router = express.Router();

// Protected admin routes
router.get('/users', verifyToken, isAdmin, getUsers);
router.put('/users/:id/approve', verifyToken, isAdmin, approveUser);
router.delete('/users/:id/reject', verifyToken, isAdmin, rejectUser);

module.exports = router;
