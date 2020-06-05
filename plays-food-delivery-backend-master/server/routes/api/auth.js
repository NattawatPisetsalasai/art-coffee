import { Router } from 'express';
import passport from 'passport';
import cors from 'cors';
import authController from '../../controllers/auth';
import authValidator from '../../validators/auth';
// import auth from './auth';

const router = Router();

// router.user('/auth', auth);
router.get('/login/google', passport.authenticate('google', {
  scope: ['email', 'profile', 'openid']
}));

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), authController.generateTokenFromGoogle);

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), authController.generateTokenFromFacebook);

router.options('/login/email', cors()); // enable pre-flight request
router.post('/login/email', authValidator.signIn(), authController.emailSignIn);
router.get('/login/getAccessByRefresh', passport.authenticate('jwt', { session: false }), authController.getAccessByRefreshToken);
export default router;