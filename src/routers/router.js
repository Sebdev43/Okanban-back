import { Router } from 'express';
const router = Router();
import { mainController } from '../controllers/mainController.js';
import { listController } from '../controllers/listController.js';
import { cardController } from '../controllers/cardController.js';
import { tagController } from '../controllers/tagController.js';
import { authController } from '../controllers/authController.js';
import { isAuthenticated } from '../middlewares/auth.js';
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
router.get('/', isAuthenticated, mainController.index);

/**
 * Route serving list of lists.
 * @name get/lists
 * @function
 * @memberof module:router~router
 * @inner
 */
router.get('/lists', isAuthenticated, listController.index);

/**
 * Route serving a specific list by ID.
 * @name get/lists/:id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.get('/lists/:id', isAuthenticated, isNumberMiddleware, listController.show);

/**
 * Route to create a new list.
 * @name post/lists
 * @function
 * @memberof module:router~router
 * @inner
 */
router.post('/lists', isAuthenticated, listController.store);

/**
 * Route to update a specific list by ID.
 * @name patch/lists/:id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.patch('/lists/:id', isAuthenticated, isNumberMiddleware, listController.update);

/**
 * Route to delete a specific list by ID.
 * @name delete/lists/:id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.delete('/lists/:id', isAuthenticated, isNumberMiddleware, listController.destroy);

/**
 * Route to get all cards from a specific list.
 * @name get/lists/:id/cards
 * @function
 * @memberof module:router~router
 * @inner
 */
router.get('/lists/:id/cards', isAuthenticated, cardController.indexFromList);

/**
 * Route serving a specific card by ID.
 * @name get/cards/:id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.get('/cards/:id', isAuthenticated, cardController.show);

/**
 * Route to create a new card.
 * @name post/cards
 * @function
 * @memberof module:router~router
 * @inner
 */
router.post('/cards', isAuthenticated, cardController.store);

/**
 * Route to update a specific card by ID.
 * @name patch/cards/:id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.patch('/cards/:id', isAuthenticated, cardController.update);

/**
 * Route to delete a specific card by ID.
 * @name delete/cards/:id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.delete('/cards/:id', isAuthenticated, cardController.destroy);

/**
 * Route serving list of tags.
 * @name get/tags
 * @function
 * @memberof module:router~router
 * @inner
 */
router.get('/tags', isAuthenticated, tagController.index);

/**
 * Route to create a new tag.
 * @name post/tags
 * @function
 * @memberof module:router~router
 * @inner
 */
router.post('/tags', isAuthenticated, tagController.store);

/**
 * Route to update a specific tag by ID.
 * @name patch/tags/:id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.patch('/tags/:id', isAuthenticated, tagController.update);

/**
 * Route to delete a specific tag by ID.
 * @name delete/tags/:id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.delete('/tags/:id', isAuthenticated, tagController.destroy);

/**
 * Route to associate a tag with a specific card by ID.
 * @name post/cards/:id/tag
 * @function
 * @memberof module:router~router
 * @inner
 */
router.post('/cards/:id/tag', isAuthenticated, cardController.showTagWithCard);

/**
 * Route to remove an association between a tag and a specific card by IDs.
 * @name delete/cards/:card_id/tag/:tag_id
 * @function
 * @memberof module:router~router
 * @inner
 */
router.delete('/cards/:card_id/tag/:tag_id', isAuthenticated, cardController.destroyTagFromCard);

/**
 * Route serving user registration.
 * @name post/register
 * @function
 * @memberof module:router~router
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.post('/register', authController.register);

/**
 * Route serving user login.
 * @name post/login
 * @function
 * @memberof module:router~router
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.post('/login', authController.login);

/**
 * Route updating user information.
 * @name patch/users/:id
 * @function
 * @memberof module:router~router
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.patch('/users/:id', isAuthenticated, isNumberMiddleware, authController.update);

/**
 * Route deleting a user.
 * @name delete/users/:id
 * @function
 * @memberof module:router~router
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.delete('/users/:id', isAuthenticated, isNumberMiddleware, authController.delete);

export { router };
