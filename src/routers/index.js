import { Router } from 'express';
const router = Router();
import { mainController } from '../controllers/mainController.js';
import { listController } from '../controllers/listController.js';
import { isNumberMiddleware } from '../middlewares/validators.js';
// DONE
router.get('/', mainController.index);
// * - `index` : sert à obtenir une liste de ressources : GET : Model.findAll
// DONE
router.get('/lists', listController.index);
// * - `show` : on obtient le détail d'une ressource : GET Model.findByPk
// DONE
router.get('/lists/:id', isNumberMiddleware, listController.show);
// * - `store` : on persiste la ressource en BDD : POST ou PUT Model.create
// TODO
router.post('/lists', listController.store);
// * - `update` : on persiste la mise à jour : PUT ou PATCH Model.update
// TODO
router.patch('/lists/:id', isNumberMiddleware, listController.update);
// TODO
// * - `destroy` : on efface une donnée : DELETE Model.destroy
router.delete('/lists/:id', isNumberMiddleware, listController.destroy);

export { router };
