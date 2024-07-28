const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const {
  createTaskboardService,
  getTaskboardsService,
  deleteTaskboardService,
  getTaskboardByIdService,
  createBoardService,
  createTaskService,
  updateTaskboardService,
} = require('../services/taskboard.service');

const createTaskboard = catchAsync(async (req, res) => {
  try {
    const { user } = req;
    // const { name } = req.body;
    console.log({ body: req.body, user, req });
    const taskboard = await createTaskboardService({ user_id: user._id, name: 'treh', items: [] });
    res.status(httpStatus.CREATED).send(taskboard);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
});

const getTaskboards = catchAsync(async (req, res) => {
  try {
    const { user } = req;
    const taskboard = await getTaskboardsService({ user_id: user._id });
    res.status(httpStatus.OK).send(taskboard);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
});

const getTaskboardById = catchAsync(async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const taskboard = await getTaskboardByIdService(id);
    res.status(httpStatus.OK).send(taskboard);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
});

const removeTaskboard = catchAsync(async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.body;
    await deleteTaskboardService(id);
    res.status(httpStatus.OK).send('taskboard deleted');
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
});

const createBoard = catchAsync(async (req, res) => {
  try {
    const { user } = req;
    const { boardId } = req.body;
    console.log({ body: req.body, user, req });
    const taskboard = await createBoardService(boardId);
    res.status(httpStatus.CREATED).send(taskboard);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
});
const createTask = catchAsync(async (req, res) => {
  try {
    const { user } = req;
    const { id, boardId } = req.body;
    console.log({ body: req.body, user, req });
    const taskboard = await createTaskService(id, boardId);
    res.status(httpStatus.CREATED).send(taskboard);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
});
const updateTaskboard = catchAsync(async (req, res) => {
  try {
    const { user } = req;
    // const { id, boardId } = req.body;
    console.log({ body: req.body, user, req });
    const taskboard = await updateTaskboardService(req.body);
    res.status(httpStatus.CREATED).send(taskboard);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
});

module.exports = {
  createTaskboard,
  getTaskboards,
  removeTaskboard,
  getTaskboardById,
  createBoard,
  createTask,
  updateTaskboard,
};
