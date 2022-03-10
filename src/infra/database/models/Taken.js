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
       refPath: 'User',
     },
     quiz: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'Quiz',
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


module.exports = mongoose.model('Taken', TakenSchema);
