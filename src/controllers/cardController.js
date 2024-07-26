import { Card, Tag } from '../models/index.js';

/**
 * Card controller.
 */
const cardController = {
    /**
     * Fetches all cards from a specific list.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async indexFromList(req, res) {
        const listId = Number.parseInt(req.params.id, 10);
        if (!Number.isInteger(listId)) {
            return res.status(404).json({ message: 'Liste non trouvée' });
        }
        Card.findAll({
            where: { listId },
            include: 'tags'
        }).then(cards => {
            res.json(cards);
        }).catch(error => {
            console.error('Erreur lors de la récupération des cartes:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des cartes' });
        });
    },

    /**
     * Fetches a specific card by ID.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async show(req, res) {
        const cardId = Number.parseInt(req.params.id, 10);
        if (!Number.isInteger(cardId)) {
            return res.status(404).json({ message: 'Carte non trouvée' });
        }
        Card.findByPk(cardId, {
            include: 'tags'
        }).then(card => {
            if (card) {
                res.json(card);
            } else {
                res.status(404).json({ message: 'Carte non trouvée' });
            }
        }).catch(error => {
            console.error('Erreur lors de la récupération de la carte:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération de la carte' });
        });
    },

    /**
     * Creates a new card.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async store(req, res) {
        const { content, listId, position, color } = req.body;
        if (!content || typeof content !== 'string' || !Number.isInteger(listId)) {
            return res.status(400).json({ error: 'Données invalides' });
        }
        Card.create({ content, listId, position, color }).then(newCard => {
            res.status(201).json(newCard);
        }).catch(error => {
            console.error('Erreur lors de la création de la carte:', error);
            res.status(500).json({ error: 'Erreur lors de la création de la carte' });
        });
    },

    /**
     * Updates an existing card.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async update(req, res) {
        const cardId = Number.parseInt(req.params.id, 10);
        if (!Number.isInteger(cardId)) {
            return res.status(404).json({ message: 'Carte non trouvée' });
        }
        Card.findByPk(cardId).then(cardToUpdate => {
            if (!cardToUpdate) {
                return res.status(404).json({ message: 'Carte non trouvée' });
            }
            const { content, position, color } = req.body;
            return cardToUpdate.update({ content, position, color });
        }).then(updatedCard => {
            res.json(updatedCard);
        }).catch(error => {
            console.error('Erreur lors de la mise à jour de la carte:', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la carte' });
        });
    },

    /**
     * Deletes a card.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async destroy(req, res) {
        const cardId = Number.parseInt(req.params.id, 10);
        if (!Number.isInteger(cardId)) {
            return res.status(404).json({ message: 'Carte non trouvée' });
        }
        Card.findByPk(cardId).then(cardToDelete => {
            if (!cardToDelete) {
                return res.status(404).json({ message: 'Carte non trouvée' });
            }
            return cardToDelete.destroy();
        }).then(() => {
            res.json({ message: 'La carte a été supprimée' });
        }).catch(error => {
            console.error('Erreur lors de la suppression de la carte:', error);
            res.status(500).json({ error: 'Erreur lors de la suppression de la carte' });
        });
    },

    /**
     * Associates a tag with a card.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async showTagWithCard(req, res) {
        const { id, tag_id } = req.params;
        try {
            const card = await Card.findByPk(id);
            if (!card) {
                return res.status(404).json({ message: 'Carte non trouvée' });
            }
            const tag = await Tag.findByPk(tag_id);
            if (!tag) {
                return res.status(404).json({ message: 'Tag non trouvé' });
            }
            await card.addTag(tag);
            res.status(200).json({ message: 'Tag associé à la carte avec succès' });
        } catch (error) {
            console.error('Erreur lors de l\'association du tag à la carte:', error);
            res.status(500).json({ error: 'Erreur serveur' });
        }
    },

    /**
     * Removes an association between a tag and a card.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async destroyTagFromCard(req, res) {
        const { card_id, tag_id } = req.params;
        try {
            const card = await Card.findByPk(card_id);
            if (!card) {
                return res.status(404).json({ message: 'Carte non trouvée' });
            }
            const tag = await Tag.findByPk(tag_id);
            if (!tag) {
                return res.status(404).json({ message: 'Tag non trouvé' });
            }
            await card.removeTag(tag);
            res.status(200).json({ message: 'Association entre la carte et le tag supprimée avec succès' });
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'association entre le tag et la carte:', error);
            res.status(500).json({ error: 'Erreur serveur' });
        }
    },
};

export { cardController };
