const mongoose = require('mongoose');

const TakenAnswerSchema = new mongoose.Schema(
  {
     taken: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       refPath: 'Taken',
     },
     question: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'Question',
      },
      answer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'Option',
      },
      startedAt: {
        type: Date,
        required: true,
      },
      endedAt: {
        type: Date,
        required: true,
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
