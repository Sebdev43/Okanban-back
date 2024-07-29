import { List } from '../models/list.js';

/**
 * List controller to handle list operations.
 */
const listController = {
  /**
   * Get all lists for the authenticated user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async index(req, res) {
    try {
      const lists = await List.findAll({ where: { user_id: req.session.userId } });
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching lists', error });
    }
  },

  /**
   * Get a specific list by ID for the authenticated user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async show(req, res) {
    const { id } = req.params;

    try {
      const list = await List.findOne({ where: { id, user_id: req.session.userId } });
      if (!list) {
        return res.status(404).json({ message: 'List not found' });
      }
      res.status(200).json(list);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching list', error });
    }
  },

  /**
   * Create a new list for the authenticated user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async store(req, res) {
    const { title, position } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    try {
      const newList = await List.create({ title, position, user_id: req.session.userId });
      res.status(201).json(newList);
    } catch (error) {
      res.status(500).json({ message: 'Error creating list', error });
    }
  },

  /**
   * Update a specific list by ID for the authenticated user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async update(req, res) {
    const { id } = req.params;
    const { title, position } = req.body;

    try {
      const list = await List.findOne({ where: { id, user_id: req.session.userId } });
      if (!list) {
        return res.status(404).json({ message: 'List not found' });
      }

      if (title) list.title = title;
      if (position) list.position = position;

      await list.save();
      res.status(200).json({ message: 'List updated successfully', list });
    } catch (error) {
      res.status(500).json({ message: 'Error updating list', error });
    }
  },

  /**
   * Delete a specific list by ID for the authenticated user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async destroy(req, res) {
    const { id } = req.params;

    try {
      const list = await List.findOne({ where: { id, user_id: req.session.userId } });
      if (!list) {
        return res.status(404).json({ message: 'List not found' });
      }

      await list.destroy();
      res.status(200).json({ message: 'List deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting list', error });
    }
  }
};

export { listController };
