const userController = require('./../controllers/userController.js'); // user controller
const eventController = require('./../controllers/eventController.js'); // event controller
const router = require('express').Router(); // set router

const { check } = require('express-validator');

// user routers
router.post('/users',[check('email').not().isEmpty().isEmail().normalizeEmail().withMessage('must be a valid email address')],userController.createUser);
router.get('/users/:id', userController.getUser);
router.delete('/users/:id', userController.deleteUser);

// event routers
router.post(
    '/events/:id',
    [check('consent').not().isEmpty().withMessage('must be a valid type of [sms_notifications, email_notifications]'), check('enabled').isBoolean()],
    eventController.createEvents
);

module.exports = router;
