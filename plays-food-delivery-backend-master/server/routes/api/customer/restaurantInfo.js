import { Router } from 'express';
import passport from 'passport';
import productValidator from '../../../validators/product';
import productController from '../../../controllers/product';

const router = Router();

router.get('/getAvailableTime', productValidator.getRecommendProduct(), productController.getRecommendProduct);
router.get('/getContract', productValidator.getAllCategory(), productController.getAllCategory);

export default router;