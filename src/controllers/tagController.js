import { Tag, Card } from '../models/index.js';

/**
 * Tag controller.
 */
const tagController = {
    /**
     * Fetches all tags.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async index(req, res) {
        Tag.findAll().then(tags => {
            res.json(tags);
        }).catch(error => {
            console.error('Erreur lors de la récupération des tags:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des tags' });
        });
    },

    /**
     * Creates a new tag.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async store(req, res) {
        const { name, color } = req.body;
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: 'Nom du tag invalide' });
        }
        Tag.create({ name, color }).then(newTag => {
            res.status(201).json(newTag);
        }).catch(error => {
            console.error('Erreur lors de la création du tag:', error);
            res.status(500).json({ error: 'Erreur lors de la création du tag' });
        });
    },

    /**
     * Updates an existing tag.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async update(req, res) {
        const tagId = Number.parseInt(req.params.id, 10);
        if (!Number.isInteger(tagId)) {
            return res.status(404).json({ message: 'Tag non trouvé' });
        }
        Tag.findByPk(tagId).then(tagToUpdate => {
            if (!tagToUpdate) {
                return res.status(404).json({ message: 'Tag non trouvé' });
            }
            const { name, color } = req.body;
            return tagToUpdate.update({ name, color });
        }).then(updatedTag => {
            res.json(updatedTag);
        }).catch(error => {
            console.error('Erreur lors de la mise à jour du tag:', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour du tag' });
        });
    },

    /**
     * Deletes a tag.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async destroy(req, res) {
        const tagId = Number.parseInt(req.params.id, 10);
        if (!Number.isInteger(tagId)) {
            return res.status(404).json({ message: 'Tag non trouvé' });
        }
        Tag.findByPk(tagId).then(tagToDelete => {
            if (!tagToDelete) {
                return res.status(404).json({ message: 'Tag non trouvé' });
            }
            return tagToDelete.destroy();
        }).then(() => {
            res.json({ message: 'Le tag a été supprimé' });
        }).catch(error => {
            console.error('Erreur lors de la suppression du tag:', error);
            res.status(500).json({ error: 'Erreur lors de la suppression du tag' });
        });
    },
};

export { tagController };
