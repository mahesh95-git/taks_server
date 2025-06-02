import trycatchWrapper from "../util/trycatch.js";
import { prisma } from "../util/postgresdp.js";
import response from "../util/response.js";

const createTask = trycatchWrapper(async (req, res, next) => {
  const { title, description, status, dueDate, projectId } = req.body;
  if (!title || !description || !status || !dueDate || !projectId) {
    return response(res, 400, "All fields are required", false, null);
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      id: true,
    },
  });
  if (!project) {
    return response(res, 404, "Project not found", false, null);
  }
  const task = await prisma.task.create({
    data: {
      title: title,
      description: description,
      status: status,
      dueDate: dueDate,
      projectId: projectId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      dueDate: true,
      projectId: true,
    },
  });

  return response(res, 201, "Task created successfully", task, true, task);
});

const getTasks = trycatchWrapper(async (req, res, next) => {
  const projectId = req.params;
  if (!projectId) {
    return response(res, 400, "Task ID is required", false, null);
  }
  const tasks = await prisma.task.findMany({
    where: {
      projectId: projectId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      dueDate: true,
      projectId: true,
    },
  });
  if (tasks.length === 0) {
    return response(res, 404, "No tasks found for this project", false, null);
  }
  return response(res, 200, "Tasks retrieved successfully", tasks, true, tasks);
});

const deleteTask = trycatchWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return response(res, 400, "Task ID is required", false, null);
  }
  const task = await prisma.task.delete({
    where: {
      id: id,
    },
  });
  if (!task) {
    return response(res, 404, "Task not found", false, null);
  }
  return response(res, 200, "Task deleted successfully", task, true, null);
});

const updateTaks = trycatchWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!id) {
    return response(res, 400, "Task ID is required", false, null);
  }
  const task = await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });
  if (!task) {
    return response(res, 404, "Task not found", false, null);
  }

  return response(res, 200, "Task updated successfully", task, true, task);
});
export { createTask, getTasks, deleteTask, updateTaks };
