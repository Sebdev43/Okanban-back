import Joi from 'joi';

const listSchema = Joi.object({
    title: Joi.string().required().messages({
        'any.required': 'Title is required.',
    }),
    position: Joi.number().integer().optional(),
});

export { listSchema };
