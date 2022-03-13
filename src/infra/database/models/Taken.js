const mongoose = require('mongoose');

const TakenSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Quiz',
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = mongoose.model('Taken', TakenSchema);
