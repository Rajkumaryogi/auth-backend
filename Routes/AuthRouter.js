const router = require('express').Router();
const {signupValidation} = require('../Middlewares/AuthValidation');
const {signup} = require('../Controllers/AuthController');
const {loginValidation} = require('../Middlewares/AuthValidation');
const {login} = require('../Controllers/AuthController');


router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

module.exports = router;