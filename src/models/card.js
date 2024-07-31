import { Model, DataTypes } from 'sequelize';
import { getConnexion } from './sequelizeClient.js';
import { List } from './list.js';
import { User } from './user.js';

class Card extends Model {}

Card.init(
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    color: {
      type: DataTypes.STRING,
    },
    list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: List,
        key: 'id',
      },
      onDelete: 'CASCADE',
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
    tableName: 'card',
  }
);

export { Card };
