const mongoose = require('mongoose');
const User = require('./user.model');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const boardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  items: {
    type: [cardSchema],
    default: [],
  },
});

const taskboardSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User.modelName,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    boards: {
      type: [boardSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Taskboard = mongoose.model('taskboard', taskboardSchema);

module.exports = Taskboard;
