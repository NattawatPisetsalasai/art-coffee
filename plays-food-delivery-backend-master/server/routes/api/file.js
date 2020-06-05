import { Router } from 'express';

const router = Router();

router.post('/fetch', userController.fetch);

export default router;