import { Model, DataTypes } from 'sequelize';
import { getConnexion } from './sequelizeClient.js';

/**
 * User model definition.
 * @extends Model
 */
class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: getConnexion(),
    tableName: 'user',
  }
);

export { User };
