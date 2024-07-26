import { Router } from 'express';
const router = Router();
import { mainController } from '../controllers/mainController.js';
import { listController } from '../controllers/listController.js';
import { cardController } from '../controllers/cardController.js';
import { tagController } from '../controllers/tagController.js';
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


//* Routes pour les cartes

router.get('/lists/:id/cards', cardController.indexFromList);
router.get('/cards/:id', cardController.show);
router.post('/cards', cardController.store);
router.patch('/cards/:id', cardController.update);
router.delete('/cards/:id', cardController.destroy);

//* Routes pour les tags

router.get('/tags', tagController.index);
router.post('tags', tagController.store);
router.patch('tags/:id', tagController.update);
router.delete('tags/:id', tagController.destroy);

//* Routes pour l'association des tags au cartes

router.post('/cards/:id/tag', cardController.showTagWithCard);
router.delete('/cards/:card_id/tag/:tag_id', cardController.destroyTagFromCard);


export { router };
