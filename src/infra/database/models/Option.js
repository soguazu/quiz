const mongoose = require('mongoose');

/*
Token schema
*/

const OptionSchema = new mongoose.Schema(
  {
    correct: {
      type: Boolean,
      default: false,
      required: false,
    },
    answer: {
      type: String,
      required: true,
      lowercase: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Question',
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model('Option', OptionSchema);
