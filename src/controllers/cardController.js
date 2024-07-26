import { Card } from '../models/index.js';

const cardController = {

    async getAll(req, res) {
        try {
            const cards = await Card.findAll();
            res.status(200).json(cards);
        } catch (err) {
            res.status(500).json({ error: 'Erreur lors de la récupération des cartes' });
        }
    },
    async create(req, res) {
        try {
            const { content, listId, position, color } = req.body;
            const newCard = await Card.create({
                content,
                position,
                color,
                listId
            });
            res.status(201).json(newCard);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la création de la carte' });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params;
            const card = await Card.findByPk(id);
            if (card) {
                res.status(200).json(card);
            } else {
                res.status(404).json({ error: 'Carte non trouvée' });
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de la carte:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération de la carte' });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { content, position, color, listId } = req.body;
            const [updated] = await Card.update({ content, position, color, listId }, { where: { id } });
            if (updated) {
                const updatedCard = Card.findByPk(id);
                res.status(200).json(updatedCard);
            } else {
                res.status(404).json({ error: 'Carte non trouvée' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la carte ' });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Card.destroy({ where: { id } });
            if (deleted) {
                res.status(200).json({ message: 'Carte supprimée' });
            } else {
                res.status(404).json({ error: 'Carte non trouvée' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la suppression de la  carte' });
        }
    }
};

export { cardController };