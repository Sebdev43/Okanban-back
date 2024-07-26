import { Router } from 'express';
const router = Router();
import { mainController } from '../controllers/mainController.js';
import { listController } from '../controllers/listController.js';
import { cardController } from '../controllers/cardController.js';
import { tagController } from '../controllers/tagController.js';
import { isNumberMiddleware } from '../middlewares/validators.js';

/**
 * Express router to mount main, list, card, and tag related functions on.
 * @type {Router}
 */

/**
 * Route serving the main index.
 * @name get/
 * @function
 * @memberof module:router~router
 * @inner
 */
router.get('/', mainController.index);

/**
 * Route serving list of lists.
 * @name get/lists
 * @function
 * @memberof module:router~router
 * @inner
 */
router.get('/lists', listController.index);

/**
 * Route serving a specific list by ID.
 * @name get/lists/:id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.get('/lists/:id', isNumberMiddleware, listController.show);

/**
 * Route to create a new list.
 * @name post/lists
 * @function
 * @memberof module:router~router
 * @inner
 */
router.post('/lists', listController.store);

/**
 * Route to update a specific list by ID.
 * @name patch/lists/:id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.patch('/lists/:id', isNumberMiddleware, listController.update);

/**
 * Route to delete a specific list by ID.
 * @name delete/lists/:id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.delete('/lists/:id', isNumberMiddleware, listController.destroy);

/**
 * Route to get all cards from a specific list.
 * @name get/lists/:id/cards
 * @function
 * @memberof module:router~router
 * @inner
 */
router.get('/lists/:id/cards', cardController.indexFromList);

/**
 * Route serving a specific card by ID.
 * @name get/cards/:id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.get('/cards/:id', cardController.show);

/**
 * Route to create a new card.
 * @name post/cards
 * @function
 * @memberof module:router~router
 * @inner
 */
router.post('/cards', cardController.store);

/**
 * Route to update a specific card by ID.
 * @name patch/cards/:id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.patch('/cards/:id', cardController.update);

/**
 * Route to delete a specific card by ID.
 * @name delete/cards/:id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.delete('/cards/:id', cardController.destroy);

/**
 * Route serving list of tags.
 * @name get/tags
 * @function
 * @memberof module:router~router
 * @inner
 */
router.get('/tags', tagController.index);

/**
 * Route to create a new tag.
 * @name post/tags
 * @function
 * @memberof module:router~router
 * @inner
 */
router.post('/tags', tagController.store);

/**
 * Route to update a specific tag by ID.
 * @name patch/tags/:id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.patch('/tags/:id', tagController.update);

/**
 * Route to delete a specific tag by ID.
 * @name delete/tags/:id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.delete('/tags/:id', tagController.destroy);

/**
 * Route to associate a tag with a specific card by ID.
 * @name post/cards/:id/tag
 * @function
 * @memberof module:router~router
 * @inner
 */
router.post('/cards/:id/tag', cardController.showTagWithCard);

/**
 * Route to remove an association between a tag and a specific card by IDs.
 * @name delete/cards/:card_id/tag/:tag_id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.delete('/cards/:card_id/tag/:tag_id', cardController.destroyTagFromCard);

export { router };
