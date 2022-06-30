const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//get all the notes form the get request  "/api/notes/createuser"  login is required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("interal sever error ");
  }
});
//add the new notes using the postmethod  "/api/notes/addnote" . login is required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "title is a valid  ").isLength({ min: 5 }),
    body("description", "description a valid ").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, Note_data } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        Note_data,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("interal sever error ");
    }
  }
);

// update the  exting note using the  "/api/notes/updatenode" . login is required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, Note_data } = req.body;
  try {
    //create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (Note_data) {
      Note_data.title = Note_data;
    }

    //find the note is updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed ");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("interal sever error ");
  }
});

// update the exting note using the  "/api/notes/deletenode" . login is required
router.delete("/deletenode/:id", fetchuser, async (req, res) => {
  const { title, description, Note_data } = req.body;
  try {
    //find the note is delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed ");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Sucuess: "note is benn delete sucessfully", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("interal sever error ");
  }
});
module.exports = router;
