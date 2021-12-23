const express = require('express');
//const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);

router.post('/loginAdmin', authController.loginAdmin);

router.post('/forgotPassword', authController.forgotPassword);
router.put('/resetPassword/:token', authController.resetPassword);

router.put(
	'/updateMyPassword',
	authController.protect,
	authController.updatePassword,
);

module.exports = router;
