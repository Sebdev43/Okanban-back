import { Router } from 'express';
const router = Router();
import { mainController } from '../controllers/mainController.js';
import { listController } from '../controllers/listController.js';

router.get('/', mainController.index);

// * - `index` : sert à obtenir une liste de ressources : GET : Model.findAll
router.get('/lists', listController.index);
// * - `show` : on obtient le détail d'une ressource : GET Model.findByPk
router.get('/lists/:id', listController.show);
// * - `store` : on persiste la ressource en BDD : POST ou PUT Model.create
router.post('/lists', listController.store);
// * - `update` : on persiste la mise à jour : PUT ou PATCH Model.update
router.patch('/lists/:id', listController.update);
// * - `destroy` : on efface une donnée : DELETE Model.destroy
router.delete('/lists/:id', listController.destroy);

export { router };
