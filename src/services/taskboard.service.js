const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Taskboard = require('../models/taskboard.model');

const createTaskboardService = async (payload) => {
  // if (!user) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  // }
  const taskboard = await Taskboard.create(payload);
  return taskboard;
};
const updateTaskboardService = async (payload) => {
  // if (!user) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  // }
  const taskboard = await Taskboard.findByIdAndUpdate(payload._id, { ...payload });
  return taskboard;
};

const getTaskboardsService = async (payload) => {
  const taskboard = await Taskboard.find(payload);
  return taskboard;
};
const getTaskboardByIdService = async (id) => {
  const taskboard = await Taskboard.findById(id);
  return taskboard;
};
const deleteTaskboardService = async (id) => {
  const taskboard = await Taskboard.findByIdAndDelete(id);
  return taskboard;
};

const createBoardService = async (id) => {
  const taskboard = await Taskboard.findById(id);
  taskboard.boards.push({ name: `board ${taskboard.boards.length + 1}` });
  const updatedTaskboard = await taskboard.save();
  return updatedTaskboard;
};
const createTaskService = async (id, boardId) => {
  const taskboard = await Taskboard.findById(id);
  const board = taskboard.boards.id(boardId);
  console.log({ board, ggg: taskboard.boards, boardId });
  board.items.push({ name: `task ${board.items.length + 1}` });
  // taskboard?.boards?.[boardId]?.items.push({ name: 'task' });
  const updatedTaskboard = await taskboard.save();
  return updatedTaskboard;
};

module.exports = {
  createTaskboardService,
  getTaskboardsService,
  deleteTaskboardService,
  getTaskboardByIdService,
  createBoardService,
  createTaskService,
  updateTaskboardService,
};
