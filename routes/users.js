const express = require('express');
const passport = require('passport');
const { route } = require('.');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.post('/Sign-up',usersController.signUp);
router.get('/home',usersController.usersHome);

//use pass
router.post('/Create-Session',passport.authenticate(
    'local',
    {failureRedirect:'/home'},
), usersController.createSession);

router.get('/home',passport.checkAuthentication,usersController.usersHome);

router.get('/Sign-out', usersController.destroySession);

module.exports = router;

