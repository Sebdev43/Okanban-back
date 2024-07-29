import { Model, DataTypes } from 'sequelize';
import { getConnexion } from './sequelizeClient.js';
import { User } from './user.js';

/**
 * List model definition.
 * @extends Model
 */
class List extends Model {}

List.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize: getConnexion(),
    tableName: 'list',
  }
);

export { List };
