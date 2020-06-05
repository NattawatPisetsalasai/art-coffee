import { Router } from 'express';
import swaggerDoc from '../../swaggers';
import auth from './auth';
import customerRoute from './customer';
import restaurantRoute from './restaurant';

const router = Router();

router.use('/docs', swaggerDoc);
router.use('/auth', auth);

router.use('/customer', customerRoute);
router.use('/restaurant', restaurantRoute);

export default router;
