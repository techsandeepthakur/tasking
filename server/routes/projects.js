import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new project
router.post('/', async (req, res) => {
  const { name, tasks, taskStatus, status } = req.body;

  const project = new Project({
    name,
    tasks,
    taskStatus,
    status,
  });

  try {
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update project status
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // If updating taskStatus, merge with existing taskStatus
    if (req.body.taskStatus) {
      req.body.taskStatus = {
        ...project.taskStatus.toObject(),
        ...req.body.taskStatus
      };
      
      // Calculate overall status based on active tasks and their completion status
      const activeTasks = [];
      const tasks = project.tasks.toObject();
      
      // Check which tasks are active (true)
      if (tasks.mddaMap === true) activeTasks.push('mddaMap');
      if (tasks.architectureDesign === true) activeTasks.push('architectureDesign');
      if (tasks.construction === true) activeTasks.push('construction');
      
      // If there are active tasks, determine overall status
      if (activeTasks.length > 0) {
        const updatedTaskStatus = req.body.taskStatus;
        
        // Check if all active tasks are completed
        const allCompleted = activeTasks.every(task => updatedTaskStatus[task] === 'completed');
        
        // Check if any active task is still pending (not started)
        const anyPending = activeTasks.some(task => updatedTaskStatus[task] === 'pending');
        
        // Set overall status
        if (allCompleted) {
          req.body.status = 'completed';
        } else if (!anyPending) {
          req.body.status = 'in-progress';
        } else {
          req.body.status = 'pending';
        }
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;