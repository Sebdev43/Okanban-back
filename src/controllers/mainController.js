/**
 * Main controller.
 */
const mainController = {
    /**
     * Redirects to /lists.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async index(req, res) {
        res.status(301).redirect('/lists');
    },
};

export { mainController };
