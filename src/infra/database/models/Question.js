const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      lowercase: true,
    },
     quiz: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       refPath: 'Quiz',
     },
     level: {
        type: String,
        default: 'easy',
        enum: ['hard', 'medium', 'easy'],
    }, 
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);


module.exports = mongoose.model('Question', QuestionSchema);
