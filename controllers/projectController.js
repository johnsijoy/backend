import Project from "../models/project.js";

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      message: "Projects retrieved successfully",
      result: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Internal server error in fetching projects" });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({
      message: "Project retrieved successfully",
      result: project,
    });
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    res.status(500).json({ message: "Internal server error in fetching project" });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { title, description, imageUrl, technologies, liveLink, repoLink } = req.body;
    const newProject = new Project({
      title,
      description,
      imageUrl,
      technologies,
      liveLink,
      repoLink,
    });
    await newProject.save();
    res.status(201).json({
      message: "Project created successfully",
      result: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal server error in creating project" });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, technologies, liveLink, repoLink } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, imageUrl, technologies, liveLink, repoLink },
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({
      message: "Project updated successfully",
      result: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Internal server error in updating project" });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Internal server error in deleting project" });
  }
};
