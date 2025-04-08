import { db } from "../lib/firebaseAdmin.js";

const collection = db.collection("projects");

// GET all
export const getProjects = async (req, res) => {
  try {
    const snapshot = await collection.get();
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error getting projects", error);
    res.status(500).json({ message: "Error in getting projects" });
  }
};

// CREATE
export const createProject = async (req, res) => {
  try {
    const { title, description, skillSet, no_of_members } = req.body;
    const data = {
      title,
      description,
      skillSet,
      no_of_members,
      isActive: true,
      createdDate: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    };
    const ref = await collection.add(data);
    const newProject = await ref.get();
    res.status(200).json({ id: ref.id, ...newProject.data() });
  } catch (error) {
    console.error("Error creating project", error);
    res.status(500).json({ message: "Error in creating project" });
  }
};

// GET by ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await collection.doc(id).get();
    if (!doc.exists) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error getting project", error);
    res.status(500).json({ message: "Error in getting project by id" });
  }
};

// UPDATE
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    await collection.doc(id).update(req.body);
    const updated = await collection.doc(id).get();
    res.status(200).json({ message: "Project updated successfully", project: { id, ...updated.data() } });
  } catch (error) {
    console.error("Error updating project", error);
    res.status(500).json({ message: "Error in updating project" });
  }
};

// DELETE
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await collection.doc(id).delete();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project", error);
    res.status(500).json({ message: "Error in deleting project" });
  }
};
