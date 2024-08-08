import Joi from 'joi';

const tagSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Name is required.',
    }),
    color: Joi.string().optional(),
});

export { tagSchema };
