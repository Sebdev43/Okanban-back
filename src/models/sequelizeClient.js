import { Sequelize } from 'sequelize';
import "dotenv/config";
/**
 * Get a new Sequelize connection instance.
 * 
 * @returns {Sequelize} A Sequelize connection instance.
 */

function getConnexion() {
    return new Sequelize(process.env.PG_URL, {
        define: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
        },

        logging: false,
    });
}



export { getConnexion };
