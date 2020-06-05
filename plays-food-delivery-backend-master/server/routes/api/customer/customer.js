import { Router } from 'express';
import passport from 'passport';
import customerValidator from '../../../validators/customer';
import customerController from '../../../controllers/customer';

const router = Router();

router.patch('/editProfile', passport.authenticate('jwt', { session: false }), customerValidator.editProfile(), customerController.editProfile);

export default router;