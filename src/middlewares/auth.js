/**
 * Middleware to check if the user is authenticated.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
      return next();
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
  
  export { isAuthenticated };
  