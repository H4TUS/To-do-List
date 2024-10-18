const router = require('express').Router();

const AuthChangePasswordController = require('../controllers/AuthChangePassowrdUserController');
const AuthRegisterUserController = require('../controllers/AuthRegisterUserController');

router.get('/', AuthRegisterUserController.init);
router.post('/auth/register/user', AuthRegisterUserController.registerUser);
router.post('/auth/login', AuthRegisterUserController.loginUser);
router.post('/auth/validate-token', AuthRegisterUserController.validateToken);

router.post('/auth/request-email', AuthChangePasswordController.requestEmail);
router.post(
  '/auth/change-password',
  AuthChangePasswordController.changePassword
);

module.exports = router;
