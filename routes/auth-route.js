const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get("/register", authController.registerPage);

router.get('/login', authController.loginPage);

router.get('/logout', authController.logout);

router.get("/activate/:id", authController.activate);


//POST
router.post('/login', authController.login);
router.post("/register", authController.register);


module.exports = router;