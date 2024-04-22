import { Router } from 'express';
const router = Router();
import { listController } from '../controllers/listController.js';
import { cardController } from '../controllers/cardController.js';
import { tagController } from '../controllers/tagController.js';

router.get('/lists', listController.index);
router.post('/lists', listController.create);
router.get('/lists/:id', listController.show);
router.patch('/lists/:id', listController.update);
router.delete('/lists/:id', listController.delete);

router.get('/cards', cardController.getAll);
router.post('/cards', cardController.create);
router.get('/cards/:id', cardController.getById);
router.patch('/cards/:id', cardController.update);
router.delete('/cards/:id', cardController.delete);

router.get('/tags', tagController.getAll);
router.post('tags', tagController.create);
router.get('/tags/:id', tagController.getById);
router.patch('tags/:id', tagController.update);
router.delete('tags/:id', tagController.delete);

export { router };
