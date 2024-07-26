import { Model, DataTypes } from 'sequelize';
import { getConnexion } from './sequelizeClient.js';


/**
 * List model definition.
 * 
 * @extends Model
 */

class List extends Model {}

List.init(
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        sequelize: getConnexion(),
        tableName: 'list',
    }
);

export { List };
