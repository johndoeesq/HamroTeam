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

// router.get(
// 	'/me',
// 	authController.protect,
// 	userController.getMe,
// 	userController.getEmployee,
// );

// router.put(
// 	'/updateMe',
// 	authController.protect,
// 	authController.restrictTo('user'),
// 	userController.uploadUserPhoto,
// 	userController.resizeUserPhoto,
// 	userController.updateMe,
// );
// router.delete('/deleteMe', authController.protect, userController.deleteMe);

// router
// 	.route('/')
// 	.get(
// 		authController.protect,
// 		authController.restrictTo('admin'),
// 		userController.getAllUsers,
// 	)
// 	.post(
// 		authController.protect,
// 		authController.restrictTo('admin'),
// 		userController.createUser,
// 	);

// router
// 	.route('/:id')
// 	.get(
// 		authController.protect,
// 		authController.restrictTo('admin'),
// 		userController.getUser,
// 	)
// 	.put(
// 		authController.protect,
// 		authController.restrictTo('admin'),
// 		userController.updateUser,
// 	)
// 	.delete(
// 		authController.protect,
// 		authController.restrictTo('admin'),
// 		userController.deleteUser,
// 	);

module.exports = router;
