import Joi from 'joi';

/**
 * Middleware for validating request data using Joi schema.
 * @param {Joi.Schema} schema - The Joi schema to validate against.
 * @returns {Function} The middleware function.
 */
const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).json({ message: errorMessage });
        }
        req.body = value;  
        next();
    };
};

export { validate };
