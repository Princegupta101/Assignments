import SubTask from '../models/subTaskModel.js';
import Task from '../models/taskModel.js';

// Create subtask
export const createSubTask = async (req, res) => {
  try {
    const { task_id } = req.body;
    if (!task_id) {
      return res.status(400).json({ message: "Task ID is required" });
    }
    // Check if the task_id exists in the Task model
    const task = await Task.findById(task_id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const subTask = await SubTask.create(req.body);
    res.status(201).json({ message: "Subtask created successfully", subTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all subtasks
export const getAllSubTasks = async (req, res) => {
  try {
    const { task_id } = req.query;
    let query = {};
    if (task_id) {
      query = { task_id };
    }
    const subTasks = await SubTask.find(query);
    res.status(200).json(subTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update subtask
export const updateSubTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const subTask = await SubTask.findById(id);
    if (!subTask) {
      return res.status(404).json({ message: "Subtask not found" });
    }
    subTask.status = status;
    await subTask.save();
    res.status(200).json({ message: "Subtask updated successfully", subTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete subtask
export const deleteSubTask = async (req, res) => {
  try {
    const { id } = req.params;
    const subTask = await SubTask.findById(id);
    if (!subTask) {
      return res.status(404).json({ message: "Subtask not found" });
    }
    // Soft delete by setting deleted_at field
    subTask.deleted_at = new Date();
    await subTask.save();
    res.status(200).json({ message: "Subtask deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
