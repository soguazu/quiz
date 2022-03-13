const mongoose = require('mongoose');

const TakenAnswerSchema = new mongoose.Schema(
  {
    taken: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Taken',
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Question',
    },
    answer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Option',
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = mongoose.model('TakenAnswer', TakenAnswerSchema);
