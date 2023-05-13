import express from 'express'
import * as otpController from '../controllers/otp.controller.js';
import { isAuthenticated } from '../middlewares/auth.js';


const router = express.Router();

router.post('/otp/generate', isAuthenticated, otpController.generate);
router.get('/otp/verify', isAuthenticated, otpController.showVerifyForm);
router.post('/otp/verify', isAuthenticated, otpController.verify);
router.get('/otp/validate', otpController.showValidateForm)
router.post('/otp/validate', otpController.validate);
router.post('/otp/disable', isAuthenticated, otpController.disable);



export default router