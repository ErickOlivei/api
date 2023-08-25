const models = require("../models/model");

async function getNotes(req, res) {
  try {
    const notes = await models.getAllNotes();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createNote(req, res) {
  try {
    const note = await models.createNote(req.body);
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateNote(req, res) {
  try {
    const updatedNote = await models.updateNote(req.params.id, req.body);
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteNote(req, res) {
  try {
    await models.deleteNote(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getNotes, createNote, updateNote, deleteNote }; 