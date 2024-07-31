import { Tag } from '../models/index.js';

/**
 * Tag controller.
 */
const tagController = {
    /**
     * Fetches all tags for the authenticated user.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async index(req, res) {
        try {
            if (!req.session.userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const tags = await Tag.findAll({ where: { user_id: req.session.userId } });
            res.json(tags);
        } catch (error) {
            console.error('Erreur lors de la récupération des tags:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des tags' });
        }
    },

    /**
     * Creates a new tag for the authenticated user.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async store(req, res) {
        const { name, color } = req.body;
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: 'Nom du tag invalide' });
        }
        try {
            const newTag = await Tag.create({ name, color, user_id: req.session.userId });
            res.status(201).json(newTag);
        } catch (error) {
            console.error('Erreur lors de la création du tag:', error);
            res.status(500).json({ error: 'Erreur lors de la création du tag' });
        }
    },

    /**
     * Updates an existing tag for the authenticated user.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async update(req, res) {
        const tagId = Number.parseInt(req.params.id, 10);
        if (!Number.isInteger(tagId)) {
            return res.status(404).json({ message: 'Tag non trouvé' });
        }
        try {
            const tagToUpdate = await Tag.findOne({ where: { id: tagId, user_id: req.session.userId } });
            if (!tagToUpdate) {
                return res.status(404).json({ message: 'Tag non trouvé' });
            }
            const { name, color } = req.body;
            if (name) tagToUpdate.name = name;
            if (color) tagToUpdate.color = color;

            await tagToUpdate.save();
            res.json(tagToUpdate);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du tag:', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour du tag' });
        }
    },

    /**
     * Deletes a tag for the authenticated user.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async destroy(req, res) {
        const tagId = Number.parseInt(req.params.id, 10);
        if (!Number.isInteger(tagId)) {
            return res.status(404).json({ message: 'Tag non trouvé' });
        }
        try {
            const tagToDelete = await Tag.findOne({ where: { id: tagId, user_id: req.session.userId } });
            if (!tagToDelete) {
                return res.status(404).json({ message: 'Tag non trouvé' });
            }
            await tagToDelete.destroy();
            res.json({ message: 'Le tag a été supprimé' });
        } catch (error) {
            console.error('Erreur lors de la suppression du tag:', error);
            res.status(500).json({ error: 'Erreur lors de la suppression du tag' });
        }
    },
};

export { tagController };
