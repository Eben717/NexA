// src/backend/routes/projectRoutes.js
import express from 'express';
import Project from '../models/projects.js';

const router = express.Router();

// GET ALL projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    if (projects.length > 0) {
      res.json({ projects });
    } else {
      res.status(404).json({ message: 'No projects found' });
    }
  } catch (err) {
    console.error('❌ Error fetching projects:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET ONLY AuditsCompleted
router.get('/completed', async (req, res) => {
  try {
    const auditsCompleted = await Project.find({}, { AuditsCompleted: 1, _id: 0 });
    if (auditsCompleted.length > 0) {
      res.json({ auditsCompleted });
    } else {
      res.status(404).json({ message: 'No completed audits found' });
    }
  } catch (err) {
    console.error('❌ Error fetching completed audits:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET ONLY AuditsInProgress
router.get('/in-progress', async (req, res) => {
  try {
    const auditsInProgress = await Project.find({}, { AuditsInProgress: 1, _id: 0 });
    if (auditsInProgress.length > 0) {
      res.json({ auditsInProgress });
    } else {
      res.status(404).json({ message: 'No in-progress audits found' });
    }
  } catch (err) {
    console.error('❌ Error fetching in-progress audits:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET ONLY AuditsNotCompleted
router.get('/not-completed', async (req, res) => {
  try {
    const auditsNotCompleted = await Project.find({}, { AuditsNotCompleted: 1, _id: 0 });
    if (auditsNotCompleted.length > 0) {
      res.json({ auditsNotCompleted });
    } else {
      res.status(404).json({ message: 'No unexecuted audits found' });
    }
  } catch (err) {
    console.error('❌ Error fetching unexecuted audits:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
