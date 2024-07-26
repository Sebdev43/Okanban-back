/**
 * Middleware to check if the parameter is a valid integer.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} The response object with a status and message.
 */

const isNumberMiddleware = (req, res, next) => {
    if (req.params.id) {
        const listId = Number.parseInt(req.params.id, 10);
        if (!Number.isInteger(listId)) {
            return res
                .status(400)
                .json({ message: 'Bad request in middleware' });
        }

        return next();
    } else {
        return res
            .status(404)
            .json({ message: 'Not found Bad request in middleware' });
    }
};

export { isNumberMiddleware };
