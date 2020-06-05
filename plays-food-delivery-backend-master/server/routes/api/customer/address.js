import { Router } from 'express';
import passport from 'passport';
import addressValidator from '../../../validators/address';
import addressController from '../../../controllers/address';

const router = Router();

router.get('/getDeliveryCostByAddress', addressController.getDeliveryCostByAddress);
router.get('/fetch', passport.authenticate('jwt', { session: false }), addressController.fetch);
router.post('/insert', passport.authenticate('jwt', { session: false }), addressController.insert);
router.delete('/delete', passport.authenticate('jwt', { session: false }), addressController.delete);
router.patch('/edit', passport.authenticate('jwt', { session: false }), addressController.edit);
router.patch('/setDefault', passport.authenticate('jwt', { session: false }), addressController.setDefault);

export default router;