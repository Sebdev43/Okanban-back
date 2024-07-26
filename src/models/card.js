import { Model, DataTypes } from 'sequelize';
import { getConnexion } from './sequelizeClient.js';

/**
 * Card model definition.
 * 
 * @extends Model
 */

class Card extends Model {}

Card.init(
    {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        color: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '#FFFFFF',
        },
        list_id: {
            type: DataTypes.INTEGER,
        },
    },
    {

        sequelize: getConnexion(),
        tableName: 'card',
    }
);

export { Card };
