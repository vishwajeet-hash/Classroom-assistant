const express = require('express');
const router = express.Router();
const passport= require('passport');

const createController = require('../controllers/create_controller');
const classroomController = require('../controllers/classroom_controller');

router.get('/new',createController.newclassroom)
router.post('/create',passport.checkAuthentication, createController.create);
router.post('/join-classroom',passport.checkAuthentication, createController.joinClassroom);

router.get('/',passport.checkAuthentication,classroomController.openClassroom);
router.post('/make-announcement',classroomController.makeAnnouncement);

router.get('/delete-post',classroomController.deleteAnnouncement);
// router.get()

module.exports = router;