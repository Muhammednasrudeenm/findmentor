const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();
const { getUsers, approveUser, rejectUser } = require('../controllers/adminController');


router.post('/signup', signup);
router.post('/login', login);
router.get('/admin/users', getUsers); 
router.put('/admin/users/:userId/approve', approveUser);
router.delete('/admin/users/:userId', rejectUser);


module.exports = router;
