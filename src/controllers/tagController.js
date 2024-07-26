import { Tag } from '../models/index.js';

const tagController = {
    async getAll(req, res) {
        try {
            const tags = await Tag.findAll();
            res.status(200).json(tags);
        } catch (error) {
            console.error('Erreur lors de la récupération des tags:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des tags' });
        }
    },

    async create(req, res) {
        try {
            const { name, color } = req.body;
            if (!name) {
                return res.status(400).json({ error: 'Le nom du tag est requis' });
            }
            const newTag = await Tag.create({ name, color });
            res.status(201).json(newTag);
        } catch (error) {
            console.error('Erreur lors de la création du tag:', error);
            res.status(400).json({ error: 'Erreur lors de la création du tag' });
        }
    },

   
    async getById(req, res) {
        try {
            const { id } = req.params;
            const tag = await Tag.findByPk(id);
            if (tag) {
                res.status(200).json(tag);
            } else {
                res.status(404).json({ error: 'Tag non trouvé' });
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du tag:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération du tag' });
        }
    },

   
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, color } = req.body;
            const [updated] = await Tag.update({ name, color }, { where: { id } });
            if (updated) {
                const updatedTag = await Tag.findByPk(id);
                res.status(200).json(updatedTag);
            } else {
                res.status(404).json({ error: 'Tag non trouvé' });
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du tag:', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour du tag' });
        }
    },

  
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Tag.destroy({ where: { id } });
            if (deleted) {
                res.status(200).json({ message: 'Tag supprimé' });
            } else {
                res.status(404).json({ error: 'Tag non trouvé' });
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du tag:', error);
            res.status(500).json({ error: 'Erreur lors de la suppression du tag' });
        }
    }
}

export { tagController };
