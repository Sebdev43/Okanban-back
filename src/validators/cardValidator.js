import Joi from 'joi';

const cardSchema = Joi.object({
    content: Joi.string().required().messages({
        'any.required': 'Content is required.',
    }),
    position: Joi.number().integer().optional(),
    list_id: Joi.number().integer().required().messages({
        'any.required': 'List ID is required.',
    }),
    selectedTag: Joi.number().integer().optional(),
});

export { cardSchema };
