import { Router } from 'express';
import productRoute from './product';
import addressRoute from './address';
import orderRoute from './order';
import customerRoute from './customer';

const router = Router();

router.use('/user', customerRoute);
router.use('/product', productRoute);
router.use('/address', addressRoute);
router.use('/order', orderRoute);

export default router;