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

    show(req, res) {},

    store(req, res) {},
    update(req, res) {},
    destroy(req, res) {},
};

export { listController };
