import { Model, DataTypes } from 'sequelize';
import { getConnexion } from './sequelizeClient.js';

/**
 * CardHasTag model definition.
 * 
 * @extends Model
 */

class CardHasTag extends Model {}

CardHasTag.init(
    {
        card_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {

        sequelize: getConnexion(),
        tableName: 'card_has_tag',
    }
);

export { CardHasTag };
