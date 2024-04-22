import { Router } from 'express';
const router = Router();
import { mainController } from '../controllers/mainController.js';

router.get('/', mainController.index);

export { router };
