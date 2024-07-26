import { List } from '../models/index.js';

/**
 * List controller.
 */
const listController = {
    /**
     * Fetches all lists.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async index(req, res) {
        const lists = await List.findAll({
            include: {
                association: 'cards',
                include: 'tags',
            },
            order: [
                ['position', 'ASC'],
                ['created_at', 'DESC'],
            ],
        });
        res.json(lists);
    },

    /**
     * Fetches a specific list by ID.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async show(req, res) {
        const listId = Number.parseInt(req.params.id, 10);
        if (!Number.isInteger(listId)) {
            return res.status(404).json({ message: 'Not found' });
        }
        const list = await List.findByPk(listId, {
            include: {
                association: 'cards',
                include: 'tags',
            },
        });
        res.json(list);
    },

    /**
     * Creates a new list.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async store(req, res) {
        const { title, position } = req.body;
        if (!title || typeof title !== 'string') {
            return res
                .status(400)
                .json({ error: 'Le paramètre title est invalide' });
        }
        if (isDefinedButNotInt(position)) {
            return res
                .status(400)
                .json({ error: 'Le paramètre position est invalide' });
        }
        const newList = await List.create({ title, position });
        res.json({ list: newList });
    },

    /**
     * Updates an existing list.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async update(req, res) {
        const { id } = req.params;
        const { title, position } = req.body;
        if (typeof title !== 'string') {
            return res
                .status(400)
                .json({ error: 'Le paramètre title est invalide' });
        }
        const listToUpdate = await List.findByPk(id);
        if (!listToUpdate) {
            return res.status(404).json({ error: "La liste n'existe pas" });
        }
        const updatedList = await listToUpdate.update({
            title: title || listToUpdate.title,
            position: position || listToUpdate.position,
        });
        return res.json({ list: updatedList });
    },

    /**
     * Deletes a list.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async destroy(req, res) {
        const id = Number.parseInt(req.params.id, 10);
        if (!Number.isInteger(id)) {
            return res.status(204).json({ error: "La ressource n'existe pas" });
        }
        const list = await List.findByPk(id);
        if (!list) {
            return res.status(204).json({ error: "La ressource n'existe pas" });
        }
        await list.destroy();
        return res.json({ message: 'La ressource a été effacée' });
    },
};

/**
 * Checks if a value is defined and not an integer.
 * 
 * @param {int} value - The value to check.
 * @returns {Boolean} True if defined but not an integer, false otherwise.
 */
function isDefinedButNotInt(value) {
    return value !== undefined && (!Number.isInteger(value) || value <= 0);
}

export { listController };
