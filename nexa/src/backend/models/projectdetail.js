// src/backend/models/ProjectDetail.js
import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  name: String,
  url: String,
});

const projectDetailSchema = new mongoose.Schema({
  projectName: { type: String, required: true }, // link to completed project
  clientInfo: {
    name: String,
    contact: String,
    address: String,
    email: String,
    phone: String,
  },
  metaInfo: {
    duration: String,
    team: String,
  },
  engagementInfo: {
    scope: String,
    objectives: String,
    risks: String,
  },
  documents: [documentSchema], // uploaded docs
});

const ProjectDetail = mongoose.model("ProjectDetail", projectDetailSchema);

export default ProjectDetail;
