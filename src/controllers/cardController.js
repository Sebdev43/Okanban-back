import { Card } from '../models/card.js';
import { List } from '../models/list.js';

/**
 * Card controller to handle card operations.
 */
const cardController = {
  /**
   * Get all cards for the authenticated user in a specific list.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async indexFromList(req, res) {
    const { id } = req.params;

    try {
      const list = await List.findOne({ where: { id, user_id: req.session.userId } });
      if (!list) {
        return res.status(404).json({ message: 'List not found' });
      }

      const cards = await Card.findAll({ where: { list_id: id, user_id: req.session.userId } });
      res.status(200).json(cards);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cards', error });
    }
  },

  /**
   * Get a specific card by ID for the authenticated user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async show(req, res) {
    const { id } = req.params;

    try {
      const card = await Card.findOne({ where: { id, user_id: req.session.userId } });
      if (!card) {
        return res.status(404).json({ message: 'Card not found' });
      }
      res.status(200).json(card);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching card', error });
    }
  },
  /**
   * Create a new card for the authenticated user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async store(req, res) {
    const { content, position, color, list_id } = req.body;

    if (!content || !list_id) {
      return res.status(400).json({ message: 'Content and list ID are required' });
    }

    try {
      const list = await List.findOne({ where: { id: list_id, user_id: req.session.userId } });
      if (!list) {
        return res.status(404).json({ message: 'List not found' });
      }

      const newCard = await Card.create({ content, position, color, list_id, user_id: req.session.userId });
      res.status(201).json(newCard);
    } catch (error) {
      res.status(500).json({ message: 'Error creating card', error });
    }
  },
  /**
   * Update a specific card by ID for the authenticated user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async update(req, res) {
    const { id } = req.params;
    const { content, position, color } = req.body;

    try {
      const card = await Card.findOne({ where: { id, user_id: req.session.userId } });
      if (!card) {
        return res.status(404).json({ message: 'Card not found' });
      }

      if (content) card.content = content;
      if (position) card.position = position;
      if (color) card.color = color;

      await card.save();
      res.status(200).json({ message: 'Card updated successfully', card });
    } catch (error) {
      res.status(500).json({ message: 'Error updating card', error });
    }
  },

  /**
   * Delete a specific card by ID for the authenticated user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async destroy(req, res) {
    const { id } = req.params;

    try {
      const card = await Card.findOne({ where: { id, user_id: req.session.userId } });
      if (!card) {
        return res.status(404).json({ message: 'Card not found' });
      }

      await card.destroy();
      res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting card', error });
    }
  },
  /**
   * Fetches a specific card by ID for the authenticated user, including its associated tags.
   * @param {Object} req - Express request object.
   * @param {Object} req.params - Route parameters.
   * @param {number} req.params.id - Card ID.
   * @param {Object} res - Express response object.
   */
  async showTagWithCard(req, res) {
    const { id } = req.params;
    try {
      const card = await Card.findOne({ where: { id, user_id: req.session.userId }, include: [Tag] });
      if (!card) {
        return res.status(404).json({ message: 'Card not found' });
      }
      res.status(200).json(card);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching card with tags', error });
    }
  },

    /**
   * Removes an association between a tag and a specific card by IDs for the authenticated user.
   * @param {Object} req - Express request object.
   * @param {Object} req.params - Route parameters.
   * @param {number} req.params.card_id - Card ID.
   * @param {number} req.params.tag_id - Tag ID.
   * @param {Object} res - Express response object.
   */
    async destroyTagFromCard(req, res) {
        const { card_id, tag_id } = req.params;
    
        try {
          const cardHasTag = await CardHasTag.findOne({ where: { card_id, tag_id } });
    
          if (!cardHasTag) {
            return res.status(404).json({ message: 'Association not found' });
          }
    
          await cardHasTag.destroy();
          res.status(200).json({ message: 'Association removed successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error removing association', error });
        }
      },
  

};

export { cardController };
