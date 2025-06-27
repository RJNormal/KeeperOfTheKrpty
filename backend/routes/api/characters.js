const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Note, Character, CharacterImage, User, NoteImage } = require('../../db/models');
const { Sequelize } = require('sequelize');

const router = express.Router();

const validateCharacter = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),

  check('race')
    .exists({ checkFalsy: true })
    .withMessage('Race is required'),

  check('className')
    .exists({ checkFalsy: true })
    .withMessage('Class is required'),

  check('backstory')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Backstory must be less than 1000 characters'),

  handleValidationErrors,
];

module.exports = validateCharacter;

const validateNote = [
  check('note')
    .exists({ checkFalsy: true })
    .withMessage("note text is required"),

  handleValidationErrors
]

// Get All Characters
router.get('/', async (req, res, next) => {
  try {
    const characters = await Character.findAll({
      include: [
        {
          model: CharacterImage,
          attributes: ['id', 'url', 'preview']
        },
        {
          model: User,
          as: 'Owner',
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });
    res.status(200).json({ Characters: characters });
  } catch (error) {
    next(error);
  }
});

//get characters owned by currnet user
router.get('/current', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const characters = await Character.findAll({
      where: { ownerId: userId },
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT "url" 
              FROM "CharacterImages" 
              WHERE "CharacterImages"."characterId" = "Character"."id" 
              AND "CharacterImages"."preview" = true 
              LIMIT 1
            )`),
            "previewImage",
          ],
        ],
      },
      include: [
        {
          model: Note,
          attributes: [],
        },
      ],
      group: ["Character.id"]
    });

    return res.status(200).json({ Characters: characters });
  } catch (error) {
    next(error)
  }
});

//GET DETAILS OF Character FROM characterID
router.get('/:characterId', async (req, res, next) => {
  try {
    const { characterId } = req.params;

    const character = await Character.findByPk(characterId, {
      include: [
        {
          model: CharacterImage,
          attributes: ['id', 'url', 'preview']
        },
        {
          model: User,
          as: 'Owner',
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    if (!character) {
      return res.status(404).json({
        message: "Character couldn't be found"
      });
    }

    const noteStats = await Note.findOne({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'numNotes'],
      ],
      where: { characterId },
      raw: true
    });

    const previewImage = character.CharacterImages.length > 0 ? character.CharacterImages.find(image => image.preview)?.url : null;
    return res.status(200).json({
      id: character.id,
      ownerId: character.ownerId,
      name: character.name,
      race: character.race,
      className: character.className,
      backstory: character.backstory,
      createdAt: character.createdAt,
      updatedAt: character.updatedAt,
      numNotes: noteStats?.numNotes || 0,
      CharacterImages: character.CharacterImages || [],
      previewImage: previewImage || null,
    
      Owner: character.Owner 
    });
  } catch (error) {
    next(error);
  }
});


//CREATE A CHARACTER
router.post('/', requireAuth, validateCharacter, async (req, res, next) => {
  try {
    const { name, race, className, backstory } = req.body;
    const { user } = req;



    const newCharacter = await Character.create({
      ownerId: user.id,
      name,
      race,
      className,
      backstory
    });


    return res.status(201).json(newCharacter);
  } catch (error) {
    next(error);
  }
});

//Delete a Character
router.delete('/:characterId', requireAuth, async (req, res, next) => {
  try {
    const { characterId } = req.params;
    const { user } = req;


    const character = await Character.findByPk(characterId);

    if (!character) {
      return res.status(404).json({
        message: "Character couldn't be found"
      });
    }

    if (character.ownerId !== user.id) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    await character.destroy();

    return res.status(200).json({
      message: "Successfully deleted"
    });

  } catch (error) {
    next(error);
  }
});


// Edit A Character
router.put('/:characterId', requireAuth, validateCharacter, async (req, res, next) => {
  try {
    const { characterId } = req.params;
    const { user } = req;
    const { name, race, className, backstory } = req.body;

    const character = await Character.findByPk(characterId);

    if (!character) {
      return res.status(404).json({
        message: "Character couldn't be found"
      });
    }

    if (character.ownerId !== user.id) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    await character.update({
      name, race, className, backstory
    });

  
    const updatedCharacter = await Character.findByPk(characterId, {
      include: [
        {
          model: CharacterImage,
          attributes: ['id', 'url', 'preview']
        },
        {
          model: User,
          as: 'Owner',
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    const previewImage = updatedCharacter.CharacterImages.find(img => img.preview)?.url || null;

    return res.status(200).json({
      ...updatedCharacter.toJSON(),
      previewImage
    });

  } catch (error) {
    next(error);
  }
});

// Add Image to Character
router.post('/:characterId/images', requireAuth, async (req, res, next) => {
  try {
    const { characterId } = req.params;
    const { url, preview, userId } = req.body;
    const { user } = req;

    const character = await Character.findByPk(characterId);

    if (!character) {
      return res.status(404).json({
        message: "Character couldn't be found"
      });
    }

    if (character.ownerId !== user.id) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    const newImage = await CharacterImage.create({
      characterId,
      url,
      preview,
      userId
    });

    return res.status(201).json({
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview,
    });
  } catch (error) {
    next(error);
  }
});


//CREATE A Note FOR A Character BASED ON CharID
router.post('/:characterId/notes', requireAuth, validateNote, async (req, res, next) => {
  try {
    const { characterId } = req.params;
    const { note } = req.body;

    const character = await Character.findByPk(characterId)

    if (!character) {
      return res.status(404).json({
        message: "Character couldn't be found"
      });
    }


    const newNote = await Note.create({
      userId: req.user.id,
      characterId,
      note
    });

    const noteWithUser = await Note.findOne({
      where: { id: newNote.id },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName'],
        },
      ],
    });

    return res.status(201).json(noteWithUser);
  } catch (error) {
      next(error);
  }
});

//GET ALL NOTES BY A CHARACTERS ID
router.get('/:characterId/notes', async (req, res, next) => {
  try {
    const { characterId } = req.params;
    const character = await Character.findByPk(characterId)

    if (!character) {
      return res.status(404).json({
        message: "Character couldn't be found"
      });
    }
    const notes = await Note.findAll({
      where: { characterId },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: NoteImage,
          attributes: ['id', 'url'],
        }
      ]
    });
    return res.status(200).json({ Notes: notes });
  } catch (error) {
    next(error);
  }
});

// PUT /api/characters/:characterId/notes/:noteId
router.put('/:characterId/notes/:noteId', requireAuth, async (req, res, next) => {
  const { characterId, noteId } = req.params;
  const { note } = req.body;
  const userId = req.user.id;

  try {
    const existingNote = await Note.findByPk(noteId);
    if (!existingNote) {
      return res.status(404).json({ message: "Note couldn't be found" });
    }

    if (existingNote.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    existingNote.note = note;
    await existingNote.save();


    const updatedNote = await Note.findByPk(noteId, {
      include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    });

    return res.status(200).json(updatedNote);
  } catch (err) {
    next(err);
  }
});

router.delete('/:characterId/notes/:noteId', requireAuth, async (req, res, next) => {
  try {
    const { characterId, noteId } = req.params;
    const { user } = req;

    const targetNote = await Note.findByPk(noteId);

    if (!targetNote || targetNote.characterId != characterId) {
      return res.status(404).json({ message: "Note couldn't be found" });
    }

    if (targetNote.userId !== user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await targetNote.destroy();

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    next(error);
  }
});


module.exports = router;