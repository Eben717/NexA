// src/backend/routes/projectDetailRoutes.js
import express from "express";
import ProjectDetail from "../models/projectdetail.js";

const router = express.Router();

// CREATE new project details
router.post("/", async (req, res) => {
  try {
    const newProject = new ProjectDetail(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ project detail by projectName
router.get("/:projectName", async (req, res) => {
  try {
    const project = await ProjectDetail.findOne({
      projectName: req.params.projectName,
    });
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE project detail
router.put("/:projectName", async (req, res) => {
  try {
    const updated = await ProjectDetail.findOneAndUpdate(
      { projectName: req.params.projectName },
      req.body,
      { new: true, upsert: true } // upsert = create if not exists
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE project detail
router.delete("/:projectName", async (req, res) => {
  try {
    await ProjectDetail.findOneAndDelete({
      projectName: req.params.projectName,
    });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
