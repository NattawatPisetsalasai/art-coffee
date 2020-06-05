import { Router } from 'express';
import passport from 'passport';
import productValidator from '../../../validators/product';
import productController from '../../../controllers/product';

const router = Router();

router.get('/getRecommendProduct', productValidator.getRecommendProduct(), productController.getRecommendProduct);
router.get('/getAllCategory', productValidator.getAllCategory(), productController.getAllCategory);
router.get('/getProductByCategory', productValidator.getProductByCategory(), productController.getProductByCategory);
router.get('/getProductDetail', productValidator.getProductDetail(), productController.getProductDetail);


export default router;