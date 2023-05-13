import express from 'express'
import * as authController from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/auth.js';


const router = express.Router();

router.get('/signup', authController.showSignUpForm);
router.get('/signin', authController.showSignInForm);
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/signout', isAuthenticated, authController.signOut);

export default router;