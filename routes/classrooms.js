const express = require('express');
const router = express.Router();
const passport= require('passport');

const createController = require('../controllers/create_controller');


router.get('/new',createController.newclassroom)
router.post('/create',passport.checkAuthentication, createController.create);

module.exports = router;