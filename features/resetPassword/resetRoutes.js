import express from 'express';
import { sendOtp,verifyOtp,resetpassword } from './resetController.js';
import { auth } from '../../middlewares/jwtAuth.js';
const otpRoutes = express.Router();

otpRoutes.route('/send').get( auth,sendOtp);
otpRoutes.route('/verify').post( auth,verifyOtp);
otpRoutes.route('/reset-password').post( auth,resetpassword);
export default otpRoutes;
