// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Assignment = require('./models/assignment'); // ensure this path is correct

const app = express();

// Middleware
app.use(express.json()); // built-in body parser
app.use(cors());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/assignmentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// --- CRUD Routes ---

// CREATE - Add a new assignment
app.post('/assignments', async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).send(assignment);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// READ - Get all assignments
app.get('/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.send(assignments);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// UPDATE - Update assignment by ID
app.put('/assignments/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!assignment) return res.status(404).send({ error: 'Assignment not found' });

    res.send(assignment);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// DELETE - Delete assignment by ID
app.delete('/assignments/:id', async (req, res) => {
  try {
    const deleted = await Assignment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send({ error: 'Assignment not found' });

    res.send({ message: 'Assignment deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
