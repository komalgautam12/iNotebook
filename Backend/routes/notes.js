const express = require("express");
const tokenCheck = require("../middleware/tokenCheck");
const { findOne } = require("../models/notes");
const app = express();
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Note = require("../models/notes");

// route 1: get request for getting notes
router.get("/getAllNotes", tokenCheck, async (req, res) => {
  try {
    const fetchnotes = await Note.find({ user: req.user.id });
    res.send(fetchnotes);
  } catch (error) {
    console.log(error);
  }
});

//route 2: post request for saving saving notes

router.post(
  "/saveNotes",
  [
    body("title", "title should be min 3 letter long").isLength({ min: 3 }),
    body("description", "decription should be min 4 letter").isLength({
      min: 4,
    }),
    body("tags", "tags should be min 4 letter").isLength({ min: 2 }),
  ],
  tokenCheck,
  async (req, res) => {
    try {
      //  if there is error ,returning the error with status of bas request

      const { title, description, tags } = req.body;
      const user = req.user.id;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({ title, description, tags, user });
      const savedData = await note.save();
      res.json(savedData);
    } catch (error) {
      res.json(error);
    }
  }
);
// route 3: updating the notes
router.put("/updateNotes/:id", tokenCheck, async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tags) {
      newNote.tags = tags;
    }
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(400).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      res.status(401).send("not allowed");
    }
    const updatedata = await Note.findByIdAndUpdate(req.params.id, newNote);
    res.json(updatedata);
  } catch (error) {
    res.send(error);
  }
});

// route 4: updating the notes
router.delete("/deleteNotes/:id", tokenCheck, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(400).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      res.status(401).send("not allowed");
    }
    const Deletedata = await Note.findByIdAndDelete(req.params.id);
    res.json(Deletedata);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
