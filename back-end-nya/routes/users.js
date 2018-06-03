const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport'); 

const {validateBody, schemas} = require('../helpers/routeHelpers');
const UserController = require('../controllers/users');

router.route('/signup')
    .post(validateBody(schemas.authSchema), UserController.signUp);

router.route('/signin') 
    .post(validateBody(schemas.authSchema),passport.authenticate('local',{session: false}),UserController.signIn);

router.route('/secret')
    .get(passport.authenticate('jwt',{session: false}),UserController.secret);

router.route('/dataku')
    .get(UserController.dataku)

module.exports = router;