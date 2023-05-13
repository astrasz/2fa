import express from 'express';
import authRoutes from './auth.routes.js';
import otpRoutes from './otp.routes.js'


const router = express.Router();

router.use(authRoutes);
router.use(otpRoutes);


export default router;