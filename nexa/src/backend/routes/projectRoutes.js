// src/backend/routes/projectRoutes.js
import express from 'express';
import Project from '../models/projects.js';

const router = express.Router();

// GET all project documents
router.get('/all-projects', async (req, res) => {
  try {
    const allProjects = await Project.find({}, 'AllProjects');
    console.log('🧪 Distinct AllProjects:', allProjects);

    if (allProjects.length > 0) {
      const formatted = allProjects.map(p => ({ AllProjects: p }));
      res.json({ projects: formatted });
    } else {
      res.status(404).json({ message: 'No project names found' });
    }
  } catch (err) {
    console.error('❌ Error fetching AllProjects:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET audits completed
router.get('/completed', async (req, res) => {
  try {
    const documents = await Project.find({}, 'AuditsCompleted');
    const auditsCompleted = documents
      .filter(doc => doc.AuditsCompleted && doc.AuditsCompleted.trim() !== '')
      .map(doc => ({ AuditsCompleted: doc.AuditsCompleted }));

    if (auditsCompleted.length > 0) {
      res.json({ auditsCompleted });
    } else {
      res.status(404).json({ message: 'No completed projects found' });
    }
  } catch (err) {
    console.error('❌ Error fetching auditsCompleted:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET audits in progress
router.get('/in-progress', async (req, res) => {
  try {
    const documents = await Project.find({}, 'AuditsInProgress');
    const auditsInProgress = documents
      .filter(doc => doc.AuditsInProgress && doc.AuditsInProgress.trim() !== '')
      .map(doc => ({ AuditsInProgress: doc.AuditsInProgress }));

    if (auditsInProgress.length > 0) {
      res.json({ auditsInProgress });
    } else {
      res.status(404).json({ message: 'No in-progress audits found' });
    }
  } catch (err) {
    console.error('❌ Error fetching auditsInProgress:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET audits not completed
router.get('/not-completed', async (req, res) => {
  try {
    const documents = await Project.find({}, 'AuditsNotCompleted');
    const auditsNotCompleted = documents
      .filter(doc => doc.AuditsNotCompleted && doc.AuditsNotCompleted.trim() !== '')
      .map(doc => ({ AuditsNotCompleted: doc.AuditsNotCompleted }));

    if (auditsNotCompleted.length > 0) {
      res.json({ auditsNotCompleted });
    } else {
      res.status(404).json({ message: 'No unexecuted audits found' });
    }
  } catch (err) {
    console.error('❌ Error fetching auditsNotCompleted:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
