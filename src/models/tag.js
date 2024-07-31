import { Model, DataTypes } from 'sequelize';
import { getConnexion } from './sequelizeClient.js';

class Tag extends Model {}

Tag.init(
    {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        color: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '#FFFFFF',
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize: getConnexion(),
        tableName: 'tag',
    }
);

export { Tag };
