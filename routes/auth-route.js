const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.get('/login', authController.index);

router.get('/logout', authController.logout);


//POST
router.post('/login', authController.login);


module.exports = router;