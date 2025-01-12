const express = require('express');
const router = express.Router();
const enrollmentsController = require('../controllers/enrollmentsController');


router.get('/', enrollmentsController.index);

//POST
router.post('/store', enrollmentsController.store);




module.exports = router;