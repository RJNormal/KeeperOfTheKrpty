const express = require('express');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { Note, Character, CharacterImage, User, NoteImage } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

const validateNote = [
  check('note')
  .exists({ checkFalsy: true })
  .withMessage("Note text is required"),

handleValidationErrors

]

//get all notes of current user.
router.get('/current', requireAuth, async (req, res, next) => {
  try{
  const notes = await Note.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Character,
        attributes: [
          'id', 'ownerId', 'address', 'city', 'state', 'country',
          'lat', 'lng', 'name', 'price'
        ]
      },
      {
        model: NoteImage,
        attributes: ['id', 'url']
      }
    ],
    attributes: ['id', 'userId', 'characterId', 'note', 'createdAt', 'updatedAt'],
  });
  res.status(200).json({ Notes: notes });
}catch (error) {
  next(error)
}
});

//add a image to a note from note Id 
router.post("/:noteId/images", requireAuth, async (req, res, next) => {
  try{
    const { noteId } = req.params;
    const { url } = req.body;
    const { user } = req;

  const notes = await Note.findByPk(noteId);

  if (!notes) {
    return res.status(404).json({
      message: "Note couldn't be found"
    });
  }

  if (notes.userId !== user.id) {
    return res.status(403).json({
      message: "Forbidden"
    });
  }

  const imageCount = await NoteImage.count({
    where: { noteId }
  });
  
  if (imageCount >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached"
    });
  }

  const newImage = await NoteImage.create({
    url,
    noteId
  });

  return res.status(201).json({
    
    id: newImage.id,
    url: newImage.url,

  });
}catch (error) {
 next(error);
}
});

//Delete a note
router.delete('/:noteId', requireAuth, async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { user } = req;

    const note = await Note.findByPk(noteId);

    if (!note) {
      return res.status(404).json({
        message: "Note couldn't be found"
      });
    }

    if (note.userId !== user.id) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    await note.destroy();

    return res.status(200).json({ message: "Successfully deleted" }); 
  } catch (error) {
    next(error); 
  }
});


// Edit A Note 
router.put('/:noteId', requireAuth, validateNote, async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { user } = req;
    const { note } = req.body;


    const notes = await Note.findByPk(noteId);

    if (!notes) {
      return res.status(404).json({
        message: "Note couldn't be found"
      });
    }

    if (notes.userId !== user.id) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    await notes.update({
      note
    });

    return res.status(200).json(notes);

  } catch (error) {
    next(error)
  }
});

module.exports = router;