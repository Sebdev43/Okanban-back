import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

const saltRounds = 10;

/**
 * Auth controller to handle user registration, login, update, and delete.
 */
const authController = {
  /**
   * Registers a new user.
   * @param {Object} req - Express request object.
   * @param {Object} req.body - Request body.
   * @param {string} req.body.email - User's email.
   * @param {string} req.body.password - User's password.
   * @param {Object} res - Express response object.
   */
  async register(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({ email, password: hashedPassword });
      req.session.userId = newUser.id; 
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  },

  /**
   * Logs in a user.
   * @param {Object} req - Express request object.
   * @param {Object} req.body - Request body.
   * @param {string} req.body.email - User's email.
   * @param {string} req.body.password - User's password.
   * @param {Object} res - Express response object.
   */
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      req.session.userId = user.id; 
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  },

  /**
   * Updates a user's information.
   * @param {Object} req - Express request object.
   * @param {Object} req.body - Request body.
   * @param {string} [req.body.email] - New email.
   * @param {string} [req.body.password] - New password.
   * @param {Object} res - Express response object.
   */
  async update(req, res) {
    const { email, password } = req.body;
    const userId = req.session.userId; // Get user ID from session

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, saltRounds);

      await user.save();
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  },

  /**
   * Deletes a user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async delete(req, res) {
    const userId = req.session.userId; // Get user ID from session

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  },
  async checkAuth(req, res) {
    if (req.session.userId) {
      res.status(200).json({ authenticated: true });
    } else {
      res.status(401).json({ authenticated: false });
    }
  }
};

export { authController };
