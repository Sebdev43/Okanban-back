import { List } from '../models/index.js';

const listController = {
    async index(req, res) {
        // * findAll sans préciser de limite, c'est bien quand on a une petite application
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

        // * On envoie du json au client
        res.json(lists);
    },

    async show(req, res) {
        // TODO La validation devrait être faite dans un middleware
        // * avec parseInt, on obtient un integer ou NaN
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

    store(req, res) {},
    update(req, res) {},
    destroy(req, res) {},
};

export { listController };
