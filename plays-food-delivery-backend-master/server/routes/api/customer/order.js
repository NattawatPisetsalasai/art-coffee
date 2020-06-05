import { Router } from 'express';
import passport from 'passport';
import multer from 'multer';
import orderValidator from '../../../validators/order';
import orderController from '../../../controllers/order';

const router = Router();
const upload = multer();

router.get('/getOrderHistory', orderValidator.getOrderHistory(), passport.authenticate('jwt', { session: false }), orderController.getOrderHistory);
router.get('/getActiveOrder', passport.authenticate('jwt', { session: false }), orderController.getActiveOrder);
router.get('/getChangedActiveOrder', passport.authenticate('jwt', { session: false }), orderController.getChangedActiveOrder);
router.post('/createOrder', passport.authenticate('jwt', { session: false }), orderController.createOrder);
router.post('/changeOrderStatus', passport.authenticate('jwt', { session: false }), orderController.changeOrderStatus);
router.post('/uploadOrderSlip', passport.authenticate('jwt', { session: false }), upload.fields([{ name: 'slip' }, { name: 'orderId' }]), orderController.uploadOrderSlip);

export default router;