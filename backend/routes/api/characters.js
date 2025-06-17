const express = require('express');
const router = express.Router();
const { Character } = require('../models');

// POST:Create a new character
router.post('/', async (req, res) => {
  try {
    const { name, race, className, portrait, userId } = req.body;


    if (!name || !race || !className || !userId) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const count = await Character.count({ where: { userId } });
    if (count >= 3) {
      return res.status(400).json({ error: 'Maximum 3 characters per user.' });
    }

    const newChar = await Character.create({
      name,
      race,
      className,
      portrait, 
      userId,
    });

    res.status(201).json(newChar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create character.' });
  }
});

module.exports = router;