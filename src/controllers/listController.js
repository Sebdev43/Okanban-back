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

    async store(req, res) {
        // ! On doit valider les données qui viennent du client : on ne fait jamais confiance à ce qui vient du client, on n'utilisa pas req.body directement
        // ! Idéalement, on validerai req.body dans un middleware
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

    async update(req, res) {
        const { id } = req.params;
        const { title, position } = req.body;

        if (typeof title !== 'string') {
            return res
                .status(400)
                .json({ error: 'Le paramètre title est invalide' });
        }

        // ! On gèrera la validation de position avec un module

        // * Avant de mettre àjour, on doit récupérer une ressource : on s'assure que la liste existe
        const listToUpdate = await List.findByPk(id);

        // * Si la liste n'existe pas, on envoie un 404
        if (!listToUpdate) {
            return res.status(404).json({ error: "La liste n'existe pas" });
        }

        // * Sinon on la met à jour
        const updatedList = await listToUpdate.update({
            title: title || listToUpdate.title,
            position: position || listToUpdate.position,
        });

        return res.json({ list: updatedList });
    },

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

        return res.json({ message: 'La ressource a été effacé' });
    },
};

/**
 *
 * cette fonction va vérifier si value est undefined ou non, et si value est un integer positif
 *
 * @param {int} value
 * @returns Boolean
 */
function isDefinedButNotInt(value) {
    // value doit être défini, un integer et supérieur à 0
    return value !== undefined && (!Number.isInteger(value) || value <= 0);
}

export { listController };
