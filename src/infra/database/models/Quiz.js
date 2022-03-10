const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'Category',
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    published: {
      type: String,
      default: 'active',
      enum: ['active', 'inactive'],
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);


QuizSchema.index({
  slug: 'text',
});

module.exports = mongoose.model('Quiz', QuizSchema);
