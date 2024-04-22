import { List } from '../models/index.js';

const mainController = {
    async index(req, res) {
        const lists = await List.findAll({
            include: 'cards',
        });

        res.json(lists);
    },
};

export { mainController };
