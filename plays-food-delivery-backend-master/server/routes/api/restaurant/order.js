import { Router } from 'express';
import passport from 'passport';
import orderValidator from '../../../validators/order';
import orderController from '../../../controllers/order';

const router = Router();

router.get('/getOrderAllStage', orderController.getOrderAllStage);
router.get('/getChangedOrderAllStage', orderController.getChangedOrderAllStage);
router.post('/changeOrderStatus', orderController.changeOrderStatus);

export default router;