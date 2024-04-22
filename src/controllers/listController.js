import { Card, List } from '../models/index.js';


const listController = {
    async index(req, res) {
        try {
            const lists = await List.findAll({
                includes: 'cards'
            });
            res.status(200).json(lists);
        } catch (err) {
            res.status(500).json({ error: 'Erreur lors de la récupération des listes' });
        }
    },
    async create(req, res) {
        try {
            const { title, position } = req.body;
            if (!title) {
                return res.status(404).json({ error: 'Le titre est obligatoire' });
            }
            const newList = await List.create({ title, position });
            res.status(200).json(newList);
        } catch (err) {
            res.status(500).json({ error: 'Erreur lors de lacréation de la liste' });
        }
    },
    async show(req, res) {
        try {
            const { id } = req.params;
            const list = await List.findByPk(id, {
                include: [{ model:Card, as: 'cards'}]
            });
            if (list) {
                res.status(200).json(list);
            } else {
                res.status(404).json({ message: 'Liste non trouvée' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération de la liste', error});
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { title, position } = req.body;
            const updatedList = await List.update({ title, position }, {
                where: { id }
            });
            if (updatedList[0] === 0) {
                return res.status(404).json({ error: 'Liste non trouvée' });
            }
            res.status(200).json({ message: 'liste mise à jour'});
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la liste'})
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await List.destroy({
                where: { id }
            });
            if (deleted) {
                res.status(200).json({ message: 'Liste supprimée avec succès '});
            } else {
                res.status(404).json({ error: 'Liste non trouvée'});
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la suppresion de la liste'})
        }
    },
}

export {listController};