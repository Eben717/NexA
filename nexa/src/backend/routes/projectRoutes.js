// src/backend/routes/projectRoutes.js
import express from 'express';
import Project from '../models/projects.js';

const router = express.Router();

// GET route: return ALL projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find(); // 🔁 Fetch ALL
    if (projects.length > 0) {
      res.json({ projects }); // Send all documents
    } else {
      res.status(404).json({ message: 'No projects found' });
    }
  } catch (err) {
    console.error('❌ Error fetching projects:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
